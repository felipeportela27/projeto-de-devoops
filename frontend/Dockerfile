FROM nginx:alpine

# Limpa os arquivos default do nginx
RUN rm -rf /usr/share/nginx/html/*

# Copia todos os arquivos do frontend para o diretório do nginx
COPY . /usr/share/nginx/html/

# Expõe a porta correta
EXPOSE 80
