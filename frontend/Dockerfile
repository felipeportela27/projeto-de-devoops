# Imagem do nginx
FROM nginx:alpine

# Remove os arquivos padrão
RUN rm -rf /usr/share/nginx/html/*

# Copia TODOS os arquivos do frontend (incluindo index.html, login.html etc)
COPY . /usr/share/nginx/html/

# Porta do nginx
EXPOSE 80
