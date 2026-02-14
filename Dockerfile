# ===========================
# Stage 1: Build Astro site
# ===========================
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

ARG ASTRO_SITE=https://landofirm.com
ARG ASTRO_BASE=/
ENV ASTRO_SITE=$ASTRO_SITE
ENV ASTRO_BASE=$ASTRO_BASE

RUN npm run build

# ===========================
# Stage 2: Serve with Nginx
# ===========================
FROM nginx:alpine

RUN apk add --no-cache openssl

# Copy built static site
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx config for Docker
COPY deploy/nginx-docker.conf /etc/nginx/conf.d/default.conf

# Copy SSL setup entrypoint (generates self-signed cert if needed)
COPY deploy/docker-entrypoint.sh /docker-entrypoint.d/40-ssl-setup.sh
RUN chmod +x /docker-entrypoint.d/40-ssl-setup.sh

EXPOSE 80 443
