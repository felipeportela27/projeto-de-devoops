FROM node:18

WORKDIR /app

# Copiar apenas package.json antes
COPY package*.json ./

# Instalar dependências, forçando rebuild do sqlite3
RUN npm install --build-from-source sqlite3

# Copiar o restante do backend
COPY . .

EXPOSE 4000

CMD ["npm", "start"]
