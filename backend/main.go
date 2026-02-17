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
	// Cleanup old entries every minute
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

	// Filter old requests
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

		// Build email body
		var body strings.Builder
		body.WriteString(fmt.Sprintf("Nueva consulta desde landofirm.com\n"))
		body.WriteString(fmt.Sprintf("====================================\n\n"))
		body.WriteString(fmt.Sprintf("Nombre: %s\n", form.Name))
		body.WriteString(fmt.Sprintf("Email: %s\n", form.Email))
		if form.Company != "" {
			body.WriteString(fmt.Sprintf("Empresa: %s\n", form.Company))
		}
		if form.Service != "" {
			body.WriteString(fmt.Sprintf("Servicio: %s\n", form.Service))
		}
		if form.Budget != "" {
			body.WriteString(fmt.Sprintf("Presupuesto: %s\n", form.Budget))
		}
		if form.Timeline != "" {
			body.WriteString(fmt.Sprintf("Plazo: %s\n", form.Timeline))
		}
		body.WriteString(fmt.Sprintf("\nMensaje:\n%s\n", form.Message))

		// Budget estimator data if present
		if form.BudgetEstimate != "" {
			body.WriteString(fmt.Sprintf("\n--- Datos del estimador ---\n"))
			body.WriteString(fmt.Sprintf("Rango estimado: %s\n", form.BudgetEstimate))
			body.WriteString(fmt.Sprintf("Tipo proyecto: %s\n", form.BudgetProject))
			body.WriteString(fmt.Sprintf("Complejidad: %s\n", form.BudgetComplexity))
			body.WriteString(fmt.Sprintf("Funcionalidades: %s\n", form.BudgetFeatures))
			body.WriteString(fmt.Sprintf("Plazo: %s\n", form.BudgetTimeline))
			body.WriteString(fmt.Sprintf("Duración: %s\n", form.BudgetDuration))
			if form.BudgetComments != "" {
				body.WriteString(fmt.Sprintf("Comentarios: %s\n", form.BudgetComments))
			}
		}

		body.WriteString(fmt.Sprintf("\n--- Metadatos ---\n"))
		body.WriteString(fmt.Sprintf("IP: %s\n", clientIP))
		body.WriteString(fmt.Sprintf("Fecha: %s\n", time.Now().Format("2006-01-02 15:04:05 MST")))

		// Compose MIME email
		subject := fmt.Sprintf("Nuevo contacto: %s (%s)", form.Name, form.Service)
		if form.Service == "" {
			subject = fmt.Sprintf("Nuevo contacto: %s", form.Name)
		}

		msg := fmt.Sprintf("From: %s\r\nTo: %s\r\nSubject: %s\r\nReply-To: %s\r\nMIME-Version: 1.0\r\nContent-Type: text/plain; charset=UTF-8\r\n\r\n%s",
			mailFrom, mailTo, subject, form.Email, body.String())

		// Send via SMTP
		auth := smtp.PlainAuth("", smtpUser, smtpPass, smtpHost)
		addr := smtpHost + ":" + smtpPort
		err := smtp.SendMail(addr, auth, mailFrom, []string{mailTo}, []byte(msg))
		if err != nil {
			log.Printf("SMTP error: %v (from=%s, to=%s)", err, clientIP, form.Email)
			w.WriteHeader(http.StatusInternalServerError)
			json.NewEncoder(w).Encode(map[string]string{"error": "failed to send email"})
			return
		}

		log.Printf("Email sent: from=%s name=%s service=%s", form.Email, form.Name, form.Service)
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
