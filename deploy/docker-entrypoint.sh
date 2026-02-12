#!/bin/sh
# Generates a self-signed SSL certificate if Let's Encrypt cert doesn't exist yet.
# This allows Nginx to start with HTTPS before running certbot.

SSL_DIR="/etc/letsencrypt/live/lando.consulting"

if [ ! -f "$SSL_DIR/fullchain.pem" ]; then
    echo "==> No SSL certificate found. Generating self-signed certificate..."
    mkdir -p "$SSL_DIR"
    openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
        -keyout "$SSL_DIR/privkey.pem" \
        -out "$SSL_DIR/fullchain.pem" \
        -subj "/CN=lando.consulting" 2>/dev/null
    echo "==> Self-signed certificate generated."
    echo "==> To get a real certificate, run:"
    echo "    docker compose run certbot certonly --webroot -w /var/www/certbot -d lando.consulting"
fi
