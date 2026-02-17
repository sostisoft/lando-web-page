package main

import (
	"encoding/json"
	"fmt"
	"log"
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

// sendEmail sends an email via SMTP
func sendEmail(auth smtp.Auth, addr, from, to, subject, replyTo, body string) error {
	headers := fmt.Sprintf("From: %s\r\nTo: %s\r\nSubject: %s\r\n", from, to, subject)
	if replyTo != "" {
		headers += fmt.Sprintf("Reply-To: %s\r\n", replyTo)
	}
	headers += "MIME-Version: 1.0\r\nContent-Type: text/plain; charset=UTF-8\r\n"
	msg := headers + "\r\n" + body
	return smtp.SendMail(addr, auth, from, []string{to}, []byte(msg))
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

// buildConfirmationBody builds the auto-reply email to the user
func buildConfirmationBody(form ContactForm) string {
	if form.Lang == "en" {
		return fmt.Sprintf(`Hi %s,

Thank you for contacting Lando. We have received your message and our team will review it shortly.

We will get back to you as soon as possible, typically within 24 hours.

Here is a summary of what you sent us:

- Service: %s
- Message: %s

If you need to add any additional information, you can reply directly to this email.

Best regards,
The Lando Team
https://landofirm.com

---
This is an automatic confirmation. Please do not reply to this message if you do not need to add information.
`, form.Name, valueOrDash(form.Service), form.Message)
	}

	return fmt.Sprintf(`Hola %s,

Gracias por contactar con Lando. Hemos recibido tu mensaje y nuestro equipo lo revisará en breve.

Te responderemos lo antes posible, normalmente en menos de 24 horas.

Aquí tienes un resumen de lo que nos has enviado:

- Servicio: %s
- Mensaje: %s

Si necesitas añadir información adicional, puedes responder directamente a este email.

Un saludo,
El equipo de Lando
https://landofirm.com

---
Esta es una confirmación automática. No respondas a este mensaje si no necesitas añadir información.
`, form.Name, valueOrDash(form.Service), form.Message)
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

	auth := smtp.PlainAuth("", smtpUser, smtpPass, smtpHost)
	smtpAddr := smtpHost + ":" + smtpPort

	// 5 requests per IP per hour
	limiter := NewRateLimiter(5, time.Hour)

	originsMap := make(map[string]bool)
	for _, o := range strings.Split(allowedOrigins, ",") {
		originsMap[strings.TrimSpace(o)] = true
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
		err := sendEmail(auth, smtpAddr, mailFrom, mailTo, notifSubject, form.Email, notifBody)
		if err != nil {
			log.Printf("SMTP error (notification): %v (ip=%s, email=%s)", err, clientIP, form.Email)
			w.WriteHeader(http.StatusInternalServerError)
			json.NewEncoder(w).Encode(map[string]string{"error": "failed to send email"})
			return
		}
		log.Printf("Notification sent: from=%s name=%s service=%s", form.Email, form.Name, form.Service)

		// 2. Send confirmation email to the user
		var confirmSubject string
		if form.Lang == "en" {
			confirmSubject = "Lando — We have received your message"
		} else {
			confirmSubject = "Lando — Hemos recibido tu mensaje"
		}

		confirmBody := buildConfirmationBody(form)
		err = sendEmail(auth, smtpAddr, mailFrom, form.Email, confirmSubject, "", confirmBody)
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
