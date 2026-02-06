# ---- Build stage ----
FROM node:20-alpine AS build
WORKDIR /app
# Install deps with cache-friendly layering
COPY package*.json ./
RUN npm ci
# Build
COPY . .
# Prefer the repo's build script; it should emit dist/f1 or dist/f1/browser
RUN npm run build
# ---- Run stage (Nginx) ----
FROM nginx:1.27-alpine
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
# Copy all dist outputs; we'll link the right app folder
COPY --from=build /app/dist /usr/share/nginx/html/dist
# Link Angular output to a stable path /usr/share/nginx/html/app
# Angular may output dist/f1 or dist/f1/browser depending on version/builder
RUN set -eux; \
  appDir="/usr/share/nginx/html/dist/f1"; \
  if [ -d "$appDir/browser" ]; then \
    ln -s "$appDir/browser" /usr/share/nginx/html/app; \
  else \
    ln -s "$appDir" /usr/share/nginx/html/app; \
  fi
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]