📄 Documento – Links do Projeto (Frontend, Backend, Postman e Repositório Git)
✅ 1. Link do EC2 (Frontend Rodando)
http://3.20.237.40:8080/index.html

Esse link abre sua aplicação frontend hospedada na instância EC2.

✅ 2. Link da Collection do Postman
https://felipe-6945643.postman.co/workspace/felipe's-Workspace~82730f6f-d575-4c67-850a-e728710daece/request/45747675-29e671ef-cf36-49c9-bd78-b5c5eb8eaf51?action=share&creator=45747675

Collection com as rotas:

GET /tasks

POST /tasks

DELETE /tasks/:id


Projeto DevOps
Gerenciador de Tarefas com pipeline completo, monitoramento, automação, containers e deploy em AWS EC2.

🎯 1. Aplicação (2,0 pontos)
✅ Comunicação JSON
API RESTful completa com suporte a JSON.

Rotas principais:

GET /tasks

[{"id": 1, "title": "Tarefa X", "lane": "todo"}]
POST /tasks

// Request
{"title": "Nova Tarefa", "lane": "todo"}

// Response
{"id": 2, "title": "Nova Tarefa", "lane": "todo"}
PUT /tasks/:id

{"lane": "done"}
DELETE /tasks/:id

{"deleted": true}
🖥 Backend
Node.js 18 + Express

Porta: 4000

Funcionalidades:

CRUD completo

Validação

Logs

Health-check

CORS habilitado

🎨 Frontend
HTML5, CSS3 e JavaScript puro

Servido via Nginx

Porta: 8080

Funcionalidades:

Interface drag‑and‑drop

Colunas: Todo, Doing, Done

Firebase Login

Design responsivo

🗄 2. Banco de Dados (1,0 ponto)
🔹 Tecnologia
SQLite3

Arquivo: backend/tasks.db

Persistência via volume Docker

🔹 Tabela
CREATE TABLE tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  lane TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
🔹 CRUD
SELECT, INSERT, UPDATE, DELETE

Dados persistem entre reinicializações

🐳 3. Docker (1,0 ponto)
📦 Containers
Serviço	Imagem	Função	Porta
backend	node:18-alpine (custom)	API REST	4000
frontend	nginx:alpine (custom)	Interface Web	8080
zabbix-db	mysql:8.0	Banco Zabbix	3306
zabbix-server	zabbix-server-mysql:alpine-6.4	Core monitoramento	10051
zabbix-web	zabbix-web-nginx-mysql:alpine-6.4	Interface Zabbix	8081
zabbix-agent	zabbix-agent2:alpine	Métricas	10050
grafana	grafana/grafana:latest	Dashboards	3000
🧱 Docker Compose
Versão 3.9

2 volumes persistentes (Zabbix e Grafana)

Rede appnet

Healthchecks configurados

Restart: unless-stopped

🔧 4. Git (1,0 ponto)
📌 Estratégia de Branches
main      → Produção (deploy automático)
staging   → Homologação
dev       → Desenvolvimento
📌 Fluxo
# Desenvolvimento
git checkout dev
git commit -am "feat: nova funcionalidade"
git push origin dev

# Homologação
git checkout staging
git merge dev
git push origin staging        # deploy automático

# Produção
git checkout main
git merge staging
git push origin main           # deploy automático EC2
📂 Repositório
🔗 https://github.com/felipeportela27/projeto-de-devoops

☁️ 5. Deploy AWS EC2 (1,0 ponto)
🖥 Configuração da Instância
Item	Valor
Provedor	AWS EC2
Tipo	t3.micro
RAM	1 GB
CPU	1 vCPU
SO	Ubuntu 22.04
Região	us‑east‑2
IP Público	13.58.26.62
🧰 Instalações
Docker

Docker Compose

Git

Containers automatizados

🌐 URLs Públicas
Serviço	URL
Frontend	http://13.58.26.62:8080
Backend API	http://13.58.26.62:4000
Zabbix	http://13.58.26.62:8081
Grafana	http://13.58.26.62:3000
🧪 6. Postman (1,0 ponto)
📚 Collection
Nome: API Gerenciador de Tarefas
Base URL: http://13.58.26.62:4000

📌 Testes Implementados
Todos endpoints com:

Verificação de status code

Estrutura do JSON

Validação de chaves

Erros tratados

Endpoints testados:

GET /

GET /tasks

POST /tasks

PUT /tasks/:id

DELETE /tasks/:id

✅ Resumo Final
Este projeto implementa um ambiente completo DevOps com:
✔ Backend + Frontend prontos
✔ Banco SQLite persistente
✔ Orquestração Docker completa
✔	Usar GIT como ferramenta de gerenciamento de código fonte, com um mínimo de 3 branches
✔ Infraestrutura na AWS EC2
✔ Testes Postman integrados
