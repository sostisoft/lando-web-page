#!/bin/bash
# =============================================================================
# Setup script for Lando Consulting server (AlmaLinux 9 / RHEL-based with Plesk)
# Server: 217.154.190.107
# Run as root: bash setup-server.sh
# =============================================================================

set -euo pipefail

echo "========================================="
echo "  Lando Consulting - Server Setup"
echo "========================================="

# --- 0. Disable Plesk web services ---
echo ""
echo "[0/6] Disabling Plesk web services (if present)..."

PLESK_SERVICES="nginx httpd sw-engine sw-cp-server psa"
PLESK_UNITS="sw-engine.socket plesk-task-manager.service plesk-web-socket.service"

for svc in $PLESK_SERVICES; do
    if systemctl list-unit-files "${svc}.service" 2>/dev/null | grep -q "$svc"; then
        echo "  Stopping and disabling ${svc}..."
        systemctl stop "$svc" 2>/dev/null || true
        systemctl disable "$svc" 2>/dev/null || true
        systemctl mask "$svc" 2>/dev/null || true
    fi
done

for unit in $PLESK_UNITS; do
    if systemctl list-unit-files "$unit" 2>/dev/null | grep -q "${unit%%.*}"; then
        echo "  Stopping and disabling ${unit}..."
        systemctl stop "$unit" 2>/dev/null || true
        systemctl disable "$unit" 2>/dev/null || true
        systemctl mask "$unit" 2>/dev/null || true
    fi
done

echo "  Plesk services disabled (ports 80/443 freed for Docker)"

# --- 1. Install Docker ---
echo ""
echo "[1/6] Installing Docker..."
if command -v docker &> /dev/null; then
    echo "  Docker already installed: $(docker --version)"
else
    dnf install -y dnf-utils
    dnf config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
    dnf install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
    systemctl enable --now docker
    echo "  Docker installed: $(docker --version)"
fi

# --- 2. Create directory structure ---
echo ""
echo "[2/6] Creating directories..."
mkdir -p /var/www/lando-web/html
mkdir -p /opt/umami
echo "  /var/www/lando-web/html  -> static site"
echo "  /opt/umami               -> Umami analytics"

# --- 3. Set up Umami ---
echo ""
echo "[3/6] Setting up Umami analytics..."

# Generate secure passwords
POSTGRES_PW=$(openssl rand -hex 24)
APP_SECRET=$(openssl rand -hex 32)

cat > /opt/umami/.env << EOF
POSTGRES_PASSWORD=${POSTGRES_PW}
APP_SECRET=${APP_SECRET}
EOF

cat > /opt/umami/docker-compose.yml << 'COMPOSE'
version: '3.8'

services:
  umami:
    image: ghcr.io/umami-software/umami:postgresql-latest
    container_name: umami
    ports:
      - "3000:3000"
    environment:
      DATABASE_URL: postgresql://umami:${POSTGRES_PASSWORD}@db:5432/umami
      DATABASE_TYPE: postgresql
      APP_SECRET: ${APP_SECRET}
    depends_on:
      db:
        condition: service_healthy
    restart: always

  db:
    image: postgres:15-alpine
    container_name: umami-db
    environment:
      POSTGRES_DB: umami
      POSTGRES_USER: umami
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
    volumes:
      - umami-db-data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U umami"]
      interval: 5s
      timeout: 5s
      retries: 5
    restart: always

volumes:
  umami-db-data:
COMPOSE

cd /opt/umami
docker compose up -d
echo "  Umami starting on port 3000..."

# --- 4. Configure firewall ---
echo ""
echo "[4/6] Configuring firewall..."
if command -v firewall-cmd &> /dev/null; then
    firewall-cmd --permanent --add-service=http 2>/dev/null || true
    firewall-cmd --permanent --add-service=https 2>/dev/null || true
    firewall-cmd --permanent --add-port=3000/tcp 2>/dev/null || true
    firewall-cmd --reload 2>/dev/null || true
    echo "  Firewall configured (80, 443, 3000)"
else
    echo "  No firewall-cmd found, skipping"
fi

# --- 5. Set up SSH key for GitHub Actions ---
echo ""
echo "[5/6] Setting up SSH key for GitHub Actions deploy..."
DEPLOY_KEY_DIR="/root/.ssh"
DEPLOY_KEY="$DEPLOY_KEY_DIR/github_deploy"

if [ ! -f "$DEPLOY_KEY" ]; then
    mkdir -p "$DEPLOY_KEY_DIR"
    chmod 700 "$DEPLOY_KEY_DIR"
    ssh-keygen -t ed25519 -f "$DEPLOY_KEY" -N "" -C "github-actions-deploy"
    cat "$DEPLOY_KEY.pub" >> "$DEPLOY_KEY_DIR/authorized_keys"
    chmod 600 "$DEPLOY_KEY_DIR/authorized_keys"
    echo "  SSH deploy key generated."
    echo ""
    echo "  ============================================================"
    echo "  IMPORTANT: Copy this PRIVATE key to GitHub Secrets"
    echo "  Secret name: SSH_PRIVATE_KEY"
    echo "  ============================================================"
    echo ""
    cat "$DEPLOY_KEY"
    echo ""
    echo "  ============================================================"
else
    echo "  Deploy key already exists at $DEPLOY_KEY"
fi

# --- 6. Configure Nginx for static site ---
echo ""
echo "[6/6] Configuring Nginx for static site..."

# Note: Plesk services are already disabled in step 0.
# Configure nginx directly (Plesk no longer manages it).
if command -v nginx &> /dev/null; then
    cat > /etc/nginx/conf.d/lando-web.conf << 'NGINX'
server {
    listen 80;
    server_name _;

    root /var/www/lando-web/html;
    index index.html;

    # Static site
    location / {
        try_files $uri $uri/ $uri/index.html =404;
    }

    # Proxy Umami analytics
    location /analytics/ {
        proxy_pass http://127.0.0.1:3000/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Gzip (optimized)
    gzip on;
    gzip_vary on;
    gzip_comp_level 6;
    gzip_min_length 256;
    gzip_proxied any;
    gzip_types text/plain text/css text/xml text/javascript application/json application/javascript application/xml image/svg+xml font/woff2;

    # Cache hashed static assets
    location ~* /_astro/.+\.(js|css|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }

    # Cache other static assets
    location ~* \.(png|jpg|jpeg|gif|ico|svg|woff|woff2|webp|avif)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }
}
NGINX
    nginx -t && systemctl reload nginx
    echo "  Nginx configured and reloaded"
else
    echo "  Nginx not found. Install it or use Docker (deploy-server.yml)."
fi

echo ""
echo "========================================="
echo "  Setup Complete!"
echo "========================================="
echo ""
echo "  Static site:  /var/www/lando-web/html"
echo "  Umami:        http://217.154.190.107:3000"
echo "  Umami login:  admin / umami (CHANGE THIS!)"
echo ""
echo "  Next steps:"
echo "  1. Open http://217.154.190.107:3000 and log in"
echo "  2. Go to Settings > Websites > Add website"
echo "  3. Copy the Website ID"
echo "  4. Replace REPLACE_WITH_UMAMI_WEBSITE_ID in Layout.astro"
echo "  5. Add these GitHub Secrets:"
echo "     - SERVER_HOST: 217.154.190.107"
echo "     - SERVER_USER: root"
echo "     - SSH_PRIVATE_KEY: (the private key shown above)"
echo "========================================="
