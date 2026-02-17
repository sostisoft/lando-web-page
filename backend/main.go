package main

import (
	"crypto/tls"
	"encoding/json"
	"fmt"
	"log"
	"net"
	"net/http"
	"net/smtp"
	"os"
	"strings"
	"sync"
	"time"
)

// ContactForm represents the incoming form data
type ContactForm struct {
	Name             string `json:"name"`
	Email            string `json:"email"`
	Company          string `json:"company"`
	Service          string `json:"service"`
	Budget           string `json:"budget"`
	Timeline         string `json:"timeline"`
	Message          string `json:"message"`
	Lang             string `json:"lang"`
	PrivacyAccepted  string `json:"privacy_accepted"`
	BudgetEstimate   string `json:"budget_estimate"`
	BudgetProject    string `json:"budget_project"`
	BudgetComplexity string `json:"budget_complexity"`
	BudgetFeatures   string `json:"budget_features"`
	BudgetTimeline   string `json:"budget_timeline"`
	BudgetDuration   string `json:"budget_duration"`
	BudgetComments   string `json:"budget_comments"`
}

// loginAuth implements smtp.Auth for LOGIN mechanism (required by IONOS and many providers)
type loginAuth struct {
	username, password string
}

func LoginAuth(username, password string) smtp.Auth {
	return &loginAuth{username, password}
}

func (a *loginAuth) Start(server *smtp.ServerInfo) (string, []byte, error) {
	return "LOGIN", []byte(a.username), nil
}

func (a *loginAuth) Next(fromServer []byte, more bool) ([]byte, error) {
	if more {
		prompt := strings.TrimSpace(string(fromServer))
		switch strings.ToLower(prompt) {
		case "username:":
			return []byte(a.username), nil
		case "password:":
			return []byte(a.password), nil
		default:
			return nil, fmt.Errorf("unexpected server prompt: %s", prompt)
		}
	}
	return nil, nil
}

// RateLimiter tracks requests per IP
type RateLimiter struct {
	mu       sync.Mutex
	requests map[string][]time.Time
	limit    int
	window   time.Duration
}

func NewRateLimiter(limit int, window time.Duration) *RateLimiter {
	rl := &RateLimiter{
		requests: make(map[string][]time.Time),
		limit:    limit,
		window:   window,
	}
	go func() {
		for range time.Tick(time.Minute) {
			rl.cleanup()
		}
	}()
	return rl
}

func (rl *RateLimiter) Allow(ip string) bool {
	rl.mu.Lock()
	defer rl.mu.Unlock()

	now := time.Now()
	cutoff := now.Add(-rl.window)

	valid := make([]time.Time, 0)
	for _, t := range rl.requests[ip] {
		if t.After(cutoff) {
			valid = append(valid, t)
		}
	}

	if len(valid) >= rl.limit {
		rl.requests[ip] = valid
		return false
	}

	rl.requests[ip] = append(valid, now)
	return true
}

func (rl *RateLimiter) cleanup() {
	rl.mu.Lock()
	defer rl.mu.Unlock()

	cutoff := time.Now().Add(-rl.window)
	for ip, times := range rl.requests {
		valid := make([]time.Time, 0)
		for _, t := range times {
			if t.After(cutoff) {
				valid = append(valid, t)
			}
		}
		if len(valid) == 0 {
			delete(rl.requests, ip)
		} else {
			rl.requests[ip] = valid
		}
	}
}

func getEnv(key, fallback string) string {
	if v := os.Getenv(key); v != "" {
		return v
	}
	return fallback
}

func getClientIP(r *http.Request) string {
	if fwd := r.Header.Get("X-Forwarded-For"); fwd != "" {
		return strings.Split(fwd, ",")[0]
	}
	if real := r.Header.Get("X-Real-IP"); real != "" {
		return real
	}
	return strings.Split(r.RemoteAddr, ":")[0]
}

// sendEmailSMTP sends an email with manual STARTTLS and LOGIN auth support
func sendEmailSMTP(host, port, user, pass, from, to, subject, replyTo, body string) error {
	addr := host + ":" + port

	// Build message
	headers := fmt.Sprintf("From: %s\r\nTo: %s\r\nSubject: %s\r\n", from, to, subject)
	if replyTo != "" {
		headers += fmt.Sprintf("Reply-To: %s\r\n", replyTo)
	}
	headers += "MIME-Version: 1.0\r\nContent-Type: text/plain; charset=UTF-8\r\n"
	msg := []byte(headers + "\r\n" + body)

	// Connect
	conn, err := net.DialTimeout("tcp", addr, 15*time.Second)
	if err != nil {
		return fmt.Errorf("connect to %s: %w", addr, err)
	}

	c, err := smtp.NewClient(conn, host)
	if err != nil {
		conn.Close()
		return fmt.Errorf("smtp client: %w", err)
	}
	defer c.Close()

	// EHLO
	if err = c.Hello("localhost"); err != nil {
		return fmt.Errorf("EHLO: %w", err)
	}

	// STARTTLS (required for port 587)
	if ok, _ := c.Extension("STARTTLS"); ok {
		tlsConfig := &tls.Config{ServerName: host}
		if err = c.StartTLS(tlsConfig); err != nil {
			return fmt.Errorf("STARTTLS: %w", err)
		}
	}

	// Authenticate - use LOGIN (IONOS and most providers) with PLAIN as fallback
	hasAuth, authMechs := c.Extension("AUTH")
	if hasAuth {
		mechs := strings.ToUpper(authMechs)
		if strings.Contains(mechs, "LOGIN") {
			if err = c.Auth(LoginAuth(user, pass)); err != nil {
				return fmt.Errorf("LOGIN auth: %w", err)
			}
		} else if strings.Contains(mechs, "PLAIN") {
			if err = c.Auth(smtp.PlainAuth("", user, pass, host)); err != nil {
				return fmt.Errorf("PLAIN auth: %w", err)
			}
		} else {
			return fmt.Errorf("server does not support LOGIN or PLAIN auth (advertised: %s)", authMechs)
		}
	} else if !hasAuth {
		return fmt.Errorf("server does not advertise AUTH extension")
	}

	// Send
	if err = c.Mail(from); err != nil {
		return fmt.Errorf("MAIL FROM: %w", err)
	}
	if err = c.Rcpt(to); err != nil {
		return fmt.Errorf("RCPT TO: %w", err)
	}

	w, err := c.Data()
	if err != nil {
		return fmt.Errorf("DATA: %w", err)
	}
	if _, err = w.Write(msg); err != nil {
		return fmt.Errorf("write body: %w", err)
	}
	if err = w.Close(); err != nil {
		return fmt.Errorf("close data: %w", err)
	}

	return c.Quit()
}

// buildNotificationBody builds the internal notification email
func buildNotificationBody(form ContactForm, clientIP string) string {
	var b strings.Builder
	b.WriteString("Nueva consulta desde landofirm.com\n")
	b.WriteString("====================================\n\n")
	b.WriteString(fmt.Sprintf("Nombre: %s\n", form.Name))
	b.WriteString(fmt.Sprintf("Email: %s\n", form.Email))
	if form.Company != "" {
		b.WriteString(fmt.Sprintf("Empresa: %s\n", form.Company))
	}
	if form.Service != "" {
		b.WriteString(fmt.Sprintf("Servicio: %s\n", form.Service))
	}
	if form.Budget != "" {
		b.WriteString(fmt.Sprintf("Presupuesto: %s\n", form.Budget))
	}
	if form.Timeline != "" {
		b.WriteString(fmt.Sprintf("Plazo: %s\n", form.Timeline))
	}
	b.WriteString(fmt.Sprintf("\nMensaje:\n%s\n", form.Message))

	if form.BudgetEstimate != "" {
		b.WriteString("\n--- Datos del estimador ---\n")
		b.WriteString(fmt.Sprintf("Rango estimado: %s\n", form.BudgetEstimate))
		b.WriteString(fmt.Sprintf("Tipo proyecto: %s\n", form.BudgetProject))
		b.WriteString(fmt.Sprintf("Complejidad: %s\n", form.BudgetComplexity))
		b.WriteString(fmt.Sprintf("Funcionalidades: %s\n", form.BudgetFeatures))
		b.WriteString(fmt.Sprintf("Plazo: %s\n", form.BudgetTimeline))
		b.WriteString(fmt.Sprintf("Duración: %s\n", form.BudgetDuration))
		if form.BudgetComments != "" {
			b.WriteString(fmt.Sprintf("Comentarios: %s\n", form.BudgetComments))
		}
	}

	b.WriteString(fmt.Sprintf("\n--- Metadatos ---\n"))
	b.WriteString(fmt.Sprintf("Idioma: %s\n", form.Lang))
	b.WriteString(fmt.Sprintf("IP: %s\n", clientIP))
	b.WriteString(fmt.Sprintf("Fecha: %s\n", time.Now().Format("2006-01-02 15:04:05 MST")))
	return b.String()
}

// emailStrings holds localized strings for the confirmation email
type emailStrings struct {
	greeting       string
	thanks         string
	response       string
	summary        string
	serviceLabel   string
	messageLabel   string
	budgetSection  string
	budgetRange    string
	projectType    string
	complexity     string
	features       string
	timeline       string
	duration       string
	comments       string
	addInfo        string
	regards        string
	teamName       string
	autoDisclaimer string
}

func getEmailStrings(lang string) emailStrings {
	switch lang {
	case "en":
		return emailStrings{
			greeting:       "Hi",
			thanks:         "Thank you for contacting Lando. We have received your message and our team will review it shortly.",
			response:       "We will get back to you as soon as possible, typically within 24 hours.",
			summary:        "Here is a summary of what you sent us:",
			serviceLabel:   "Service",
			messageLabel:   "Message",
			budgetSection:  "Budget estimate details",
			budgetRange:    "Estimated range",
			projectType:    "Project type",
			complexity:     "Complexity",
			features:       "Features",
			timeline:       "Timeline",
			duration:       "Estimated duration",
			comments:       "Comments",
			addInfo:        "If you need to add any additional information, you can reply directly to this email.",
			regards:        "Best regards,",
			teamName:       "The Lando Team",
			autoDisclaimer: "This is an automatic confirmation. Please do not reply to this message if you do not need to add information.",
		}
	case "ca":
		return emailStrings{
			greeting:       "Hola",
			thanks:         "Gràcies per contactar amb Lando. Hem rebut el teu missatge i el nostre equip el revisarà en breu.",
			response:       "Et respondrem el més aviat possible, normalment en menys de 24 hores.",
			summary:        "Aquí tens un resum del que ens has enviat:",
			serviceLabel:   "Servei",
			messageLabel:   "Missatge",
			budgetSection:  "Detalls del pressupost estimat",
			budgetRange:    "Rang estimat",
			projectType:    "Tipus de projecte",
			complexity:     "Complexitat",
			features:       "Funcionalitats",
			timeline:       "Termini",
			duration:       "Durada estimada",
			comments:       "Comentaris",
			addInfo:        "Si necessites afegir informació addicional, pots respondre directament a aquest email.",
			regards:        "Una salutació,",
			teamName:       "L'equip de Lando",
			autoDisclaimer: "Aquesta és una confirmació automàtica. No responguis a aquest missatge si no necessites afegir informació.",
		}
	case "eu":
		return emailStrings{
			greeting:       "Kaixo",
			thanks:         "Eskerrik asko Landorekin harremanetan jartzeagatik. Zure mezua jaso dugu eta gure taldeak laster berrikusiko du.",
			response:       "Ahalik eta azkarren erantzungo dizugu, normalean 24 ordutan.",
			summary:        "Hona hemen bidali diguzunaren laburpena:",
			serviceLabel:   "Zerbitzua",
			messageLabel:   "Mezua",
			budgetSection:  "Aurrekontu estimatuaren xehetasunak",
			budgetRange:    "Estimatutako tartea",
			projectType:    "Proiektu mota",
			complexity:     "Konplexutasuna",
			features:       "Funtzionalitateak",
			timeline:       "Epea",
			duration:       "Estimatutako iraupena",
			comments:       "Iruzkinak",
			addInfo:        "Informazio gehigarria gehitu behar baduzu, zuzenean erantzun dezakezu email honi.",
			regards:        "Agur bero bat,",
			teamName:       "Lando taldea",
			autoDisclaimer: "Hau baieztapen automatikoa da. Ez erantzun mezu honi informazioa gehitu behar ez baduzu.",
		}
	default: // es
		return emailStrings{
			greeting:       "Hola",
			thanks:         "Gracias por contactar con Lando. Hemos recibido tu mensaje y nuestro equipo lo revisará en breve.",
			response:       "Te responderemos lo antes posible, normalmente en menos de 24 horas.",
			summary:        "Aquí tienes un resumen de lo que nos has enviado:",
			serviceLabel:   "Servicio",
			messageLabel:   "Mensaje",
			budgetSection:  "Detalles del presupuesto estimado",
			budgetRange:    "Rango estimado",
			projectType:    "Tipo de proyecto",
			complexity:     "Complejidad",
			features:       "Funcionalidades",
			timeline:       "Plazo",
			duration:       "Duración estimada",
			comments:       "Comentarios",
			addInfo:        "Si necesitas añadir información adicional, puedes responder directamente a este email.",
			regards:        "Un saludo,",
			teamName:       "El equipo de Lando",
			autoDisclaimer: "Esta es una confirmación automática. No respondas a este mensaje si no necesitas añadir información.",
		}
	}
}

// buildConfirmationBody builds the auto-reply email to the user
func buildConfirmationBody(form ContactForm) string {
	s := getEmailStrings(form.Lang)
	var b strings.Builder

	b.WriteString(fmt.Sprintf("%s %s,\n\n", s.greeting, form.Name))
	b.WriteString(s.thanks + "\n\n")
	b.WriteString(s.response + "\n\n")
	b.WriteString(s.summary + "\n\n")
	b.WriteString(fmt.Sprintf("- %s: %s\n", s.serviceLabel, valueOrDash(form.Service)))
	b.WriteString(fmt.Sprintf("- %s: %s\n", s.messageLabel, form.Message))

	// Include full budget details if the user came from the estimator
	if form.BudgetEstimate != "" {
		b.WriteString(fmt.Sprintf("\n--- %s ---\n\n", s.budgetSection))
		b.WriteString(fmt.Sprintf("  %s: %s\n", s.budgetRange, form.BudgetEstimate))
		if form.BudgetProject != "" {
			b.WriteString(fmt.Sprintf("  %s: %s\n", s.projectType, form.BudgetProject))
		}
		if form.BudgetComplexity != "" {
			b.WriteString(fmt.Sprintf("  %s: %s\n", s.complexity, form.BudgetComplexity))
		}
		if form.BudgetFeatures != "" {
			b.WriteString(fmt.Sprintf("  %s: %s\n", s.features, form.BudgetFeatures))
		}
		if form.BudgetTimeline != "" {
			b.WriteString(fmt.Sprintf("  %s: %s\n", s.timeline, form.BudgetTimeline))
		}
		if form.BudgetDuration != "" {
			b.WriteString(fmt.Sprintf("  %s: %s\n", s.duration, form.BudgetDuration))
		}
		if form.BudgetComments != "" {
			b.WriteString(fmt.Sprintf("  %s: %s\n", s.comments, form.BudgetComments))
		}
	}

	b.WriteString(fmt.Sprintf("\n%s\n\n", s.addInfo))
	b.WriteString(fmt.Sprintf("%s\n%s\nhttps://landofirm.com\n\n", s.regards, s.teamName))
	b.WriteString(fmt.Sprintf("---\n%s\n", s.autoDisclaimer))

	return b.String()
}

func valueOrDash(s string) string {
	if s == "" {
		return "-"
	}
	return s
}

func main() {
	port := getEnv("PORT", "8080")
	smtpHost := getEnv("SMTP_HOST", "")
	smtpPort := getEnv("SMTP_PORT", "587")
	smtpUser := getEnv("SMTP_USER", "")
	smtpPass := getEnv("SMTP_PASS", "")
	mailTo := getEnv("MAIL_TO", "info@landofirm.com")
	mailFrom := getEnv("MAIL_FROM", smtpUser)
	allowedOrigins := getEnv("ALLOWED_ORIGINS", "https://landofirm.com")

	if smtpHost == "" || smtpUser == "" || smtpPass == "" {
		log.Fatal("SMTP_HOST, SMTP_USER, and SMTP_PASS environment variables are required")
	}

	// 5 requests per IP per hour
	limiter := NewRateLimiter(5, time.Hour)

	originsMap := make(map[string]bool)
	for _, o := range strings.Split(allowedOrigins, ",") {
		originsMap[strings.TrimSpace(o)] = true
	}

	// Test SMTP connection on startup
	log.Printf("Testing SMTP connection to %s:%s as %s...", smtpHost, smtpPort, smtpUser)
	testConn, err := net.DialTimeout("tcp", smtpHost+":"+smtpPort, 15*time.Second)
	if err != nil {
		log.Printf("WARNING: Cannot reach SMTP server %s:%s: %v", smtpHost, smtpPort, err)
	} else {
		testConn.Close()
		log.Printf("SMTP server %s:%s is reachable", smtpHost, smtpPort)
	}

	http.HandleFunc("/api/contact", func(w http.ResponseWriter, r *http.Request) {
		// CORS
		origin := r.Header.Get("Origin")
		if originsMap[origin] {
			w.Header().Set("Access-Control-Allow-Origin", origin)
		}
		w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Accept")
		w.Header().Set("Content-Type", "application/json")

		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusOK)
			return
		}

		if r.Method != http.MethodPost {
			http.Error(w, `{"error":"method not allowed"}`, http.StatusMethodNotAllowed)
			return
		}

		// Rate limit
		clientIP := getClientIP(r)
		if !limiter.Allow(clientIP) {
			w.WriteHeader(http.StatusTooManyRequests)
			json.NewEncoder(w).Encode(map[string]string{"error": "too many requests, try again later"})
			return
		}

		// Parse body
		var form ContactForm
		if err := json.NewDecoder(r.Body).Decode(&form); err != nil {
			w.WriteHeader(http.StatusBadRequest)
			json.NewEncoder(w).Encode(map[string]string{"error": "invalid request body"})
			return
		}

		// Validate required fields
		form.Name = strings.TrimSpace(form.Name)
		form.Email = strings.TrimSpace(form.Email)
		form.Message = strings.TrimSpace(form.Message)
		form.Lang = strings.TrimSpace(form.Lang)
		if form.Lang == "" {
			form.Lang = "es"
		}

		if form.Name == "" || form.Email == "" || form.Message == "" {
			w.WriteHeader(http.StatusBadRequest)
			json.NewEncoder(w).Encode(map[string]string{"error": "name, email, and message are required"})
			return
		}

		if !strings.Contains(form.Email, "@") || !strings.Contains(form.Email, ".") {
			w.WriteHeader(http.StatusBadRequest)
			json.NewEncoder(w).Encode(map[string]string{"error": "invalid email address"})
			return
		}

		// 1. Send notification email to Lando
		notifSubject := fmt.Sprintf("Nuevo contacto: %s", form.Name)
		if form.Service != "" {
			notifSubject = fmt.Sprintf("Nuevo contacto: %s (%s)", form.Name, form.Service)
		}

		notifBody := buildNotificationBody(form, clientIP)
		err := sendEmailSMTP(smtpHost, smtpPort, smtpUser, smtpPass, mailFrom, mailTo, notifSubject, form.Email, notifBody)
		if err != nil {
			log.Printf("SMTP error (notification): %v (ip=%s, email=%s)", err, clientIP, form.Email)
			w.WriteHeader(http.StatusInternalServerError)
			json.NewEncoder(w).Encode(map[string]string{"error": "failed to send email"})
			return
		}
		log.Printf("Notification sent: from=%s name=%s service=%s", form.Email, form.Name, form.Service)

		// 2. Send confirmation email to the user
		var confirmSubject string
		switch form.Lang {
		case "en":
			confirmSubject = "Lando — We have received your message"
		case "ca":
			confirmSubject = "Lando — Hem rebut el teu missatge"
		case "eu":
			confirmSubject = "Lando — Zure mezua jaso dugu"
		default:
			confirmSubject = "Lando — Hemos recibido tu mensaje"
		}
		// If budget estimate was included, append it to subject
		if form.BudgetEstimate != "" {
			confirmSubject += " [" + form.BudgetEstimate + "]"
		}

		confirmBody := buildConfirmationBody(form)
		err = sendEmailSMTP(smtpHost, smtpPort, smtpUser, smtpPass, mailFrom, form.Email, confirmSubject, "", confirmBody)
		if err != nil {
			// Log but don't fail the request — the main notification was already sent
			log.Printf("SMTP error (confirmation to %s): %v", form.Email, err)
		} else {
			log.Printf("Confirmation sent to: %s", form.Email)
		}

		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(map[string]string{"ok": "message sent"})
	})

	// Health check
	http.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]string{"status": "ok"})
	})

	log.Printf("Lando Contact API listening on :%s", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}
