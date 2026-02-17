#!/bin/bash
# =============================================================================
# Let's Encrypt SSL setup with Certbot
# Usage: bash setup-certbot.sh your-domain.com
# Run as root on the server
# =============================================================================

set -euo pipefail

DOMAIN="${1:-}"

if [ -z "$DOMAIN" ]; then
    echo "Usage: bash setup-certbot.sh your-domain.com"
    echo "Example: bash setup-certbot.sh landofirm.com"
    exit 1
fi

echo "========================================="
echo "  SSL Setup - Let's Encrypt"
echo "  Domain: $DOMAIN"
echo "========================================="

# 1. Install Certbot
echo ""
echo "[1/4] Installing Certbot..."
if command -v certbot &> /dev/null; then
    echo "  Certbot already installed: $(certbot --version 2>&1)"
else
    dnf install -y epel-release
    dnf install -y certbot python3-certbot-nginx
    echo "  Certbot installed"
fi

# 2. Create webroot directory
echo ""
echo "[2/4] Creating certbot webroot..."
mkdir -p /var/www/certbot

# 3. Update nginx config with real domain
echo ""
echo "[3/4] Updating nginx config..."
sed -i "s/YOUR_DOMAIN/$DOMAIN/g" /etc/nginx/conf.d/lando-web.conf
sed -i "s/server_name _;/server_name $DOMAIN www.$DOMAIN;/g" /etc/nginx/conf.d/lando-web.conf

# Temporarily allow HTTP for certbot challenge
cat > /etc/nginx/conf.d/certbot-temp.conf << 'NGINX'
server {
    listen 80;
    server_name _;

    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }

    location / {
        return 301 https://$host$request_uri;
    }
}
NGINX

nginx -t && systemctl reload nginx

# 4. Obtain certificate
echo ""
echo "[4/4] Obtaining SSL certificate..."
certbot certonly \
    --webroot \
    --webroot-path=/var/www/certbot \
    -d "$DOMAIN" \
    -d "www.$DOMAIN" \
    --non-interactive \
    --agree-tos \
    --email "admin@$DOMAIN" \
    --no-eff-email

# Remove temp config
rm -f /etc/nginx/conf.d/certbot-temp.conf

# Reload nginx with full SSL config
nginx -t && systemctl reload nginx

# Set up auto-renewal
echo ""
echo "Setting up auto-renewal..."
systemctl enable --now certbot-renew.timer 2>/dev/null || \
    (echo "0 0,12 * * * root certbot renew --quiet --post-hook 'systemctl reload nginx'" > /etc/cron.d/certbot-renew)

echo ""
echo "========================================="
echo "  SSL Setup Complete!"
echo "========================================="
echo ""
echo "  Certificate: /etc/letsencrypt/live/$DOMAIN/"
echo "  Auto-renewal: enabled"
echo "  Site: https://$DOMAIN"
echo ""
echo "  Next steps:"
echo "  1. Point your domain DNS A record to this server IP"
echo "  2. Update ASTRO_SITE in deploy-server.yml to https://$DOMAIN"
echo "========================================="
