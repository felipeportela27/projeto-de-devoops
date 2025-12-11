FROM nginx:latest

# Remove cache antigo
RUN rm -rf /usr/share/nginx/html/*

# Copia o frontend
COPY . /usr/share/nginx/html/

# Desabilitar cache
RUN sed -i 's/etag off;/etag off;\n    add_header Cache-Control "no-cache, no-store, must-revalidate";/' /etc/nginx/nginx.conf

EXPOSE 80
