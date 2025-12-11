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


📋 RESUMO EXECUTIVO - PROJETO DEVOPS
Gerenciador de Tarefas com Infraestrutura Completa

🎯 1. APLICAÇÃO (2,0 pontos)
✅ Transferência de Arquivos JSON
Implementação: API RESTful com comunicação JSON completa
Rotas Implementadas:

GET /tasks → Retorna array JSON com todas as tarefas

json  [{"id": 1, "title": "Tarefa X", "lane": "todo"}]

POST /tasks → Recebe e retorna JSON

json  // Request
  {"title": "Nova Tarefa", "lane": "todo"}
  
  // Response
  {"id": 2, "title": "Nova Tarefa", "lane": "todo"}

PUT /tasks/:id → Atualiza via JSON

json  {"lane": "done"}

DELETE /tasks/:id → Confirma deleção via JSON

json  {"deleted": true}
✅ Backend

Tecnologia: Node.js 18 + Express
Porta: 4000
Funcionalidades:

CRUD completo (Create, Read, Update, Delete)
Validação de dados
CORS configurado
Health check endpoint
Logs detalhados



✅ Frontend

Tecnologia: HTML5, CSS3, JavaScript (Vanilla)
Servidor: Nginx (containerizado)
Porta: 8080
Funcionalidades:

Interface drag-and-drop
3 colunas: "Tudo", "Fazendo", "Feito"
Consumo da API via fetch()
Autenticação Firebase
Design responsivo



✅ ATENDE 100% aos requisitos (2,0 pontos)

🗄️ 2. BANCO DE DADOS (1,0 ponto)
✅ Implementação

Tecnologia: SQLite 3
Localização: backend/tasks.db
Persistência: Volume Docker

✅ Estrutura
sqlCREATE TABLE tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  lane TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
✅ Operações CRUD

CREATE: INSERT INTO tasks (title, lane) VALUES (?, ?)
READ: SELECT * FROM tasks ORDER BY created_at DESC
UPDATE: UPDATE tasks SET lane = ? WHERE id = ?
DELETE: DELETE FROM tasks WHERE id = ?

✅ Armazenamento e Alteração

✅ Tarefas são criadas e persistidas
✅ Tarefas podem ser movidas entre colunas
✅ Tarefas podem ser excluídas
✅ Dados sobrevivem a reinicializações

✅ ATENDE 100% aos requisitos (1,0 ponto)

🐳 3. DOCKER (1,0 ponto)
✅ Containers Implementados
ContainerImagemFunçãoPortabackendnode:18-alpine (custom)API REST4000frontendnginx:alpine (custom)Interface Web8080zabbix-dbmysql:8.0Banco Zabbix3306zabbix-serverzabbix-server-mysql:6.4Core Monitoramento10051zabbix-webzabbix-web-nginx-mysql:6.4Interface Zabbix8081zabbix-agentzabbix-agent2:alpineColeta Métricas10050grafanagrafana:latestDashboards3000
Total: 7 containers orquestrados
✅ Docker Compose

Versão: 3.9
Network: appnet (bridge)
Volumes: zabbix_db, grafana_data, tasks.db
Restart Policy: unless-stopped
Limites de Memória: Definidos para cada container
Healthchecks: Backend, Zabbix-DB

✅ Dockerfiles Customizados

backend/Dockerfile → Build Node.js otimizado
frontend/Dockerfile → Build Nginx com arquivos estáticos

✅ ATENDE 100% aos requisitos (1,0 ponto)

🔧 4. GIT (1,0 ponto)
✅ Estrutura de Branches
┌─────────────────────────────────────┐
│         main (Produção)             │
│  ↑ Deploy automático na AWS EC2     │
└──────────────┬──────────────────────┘
               │ merge
┌──────────────┴──────────────────────┐
│       staging (Homologação)         │
│  ↑ Testes antes de produção         │
└──────────────┬──────────────────────┘
               │ merge
┌──────────────┴──────────────────────┐
│          dev (Desenvolvimento)      │
│     Desenvolvimento ativo           │
└─────────────────────────────────────┘
✅ Repositório GitHub
URL: https://github.com/felipeportela27/projeto-de-devoops
✅ Branches Criadas

main → Código em produção (AWS EC2)
staging → Ambiente de homologação
dev → Desenvolvimento ativo

✅ Fluxo de Trabalho
bash# Desenvolvimento
git checkout dev
git add .
git commit -m "feat: nova funcionalidade"
git push origin dev

# Homologação
git checkout staging
git merge dev
git push origin staging  # ← Deploy automático

# Produção
git checkout main
git merge staging
git push origin main  # ← Deploy automático na AWS
✅ ATENDE 100% aos requisitos (1,0 ponto)

☁️ 5. DEPLOY AWS EC2 (1,0 ponto)
✅ Configuração da Instância
EspecificaçãoValorProvedorAmazon Web Services (AWS)ServiçoEC2 (Elastic Compute Cloud)Tipot3.micro (1 vCPU, 1 GB RAM)SistemaUbuntu 22.04 LTSRegiãous-east-2 (Ohio)IP Público13.58.26.62Chave SSHdevops-key.pem
✅ Software Instalado

Docker 24.x
Docker Compose 2.x
Git
Node.js (containerizado)
Nginx (containerizado)

✅ URLs de Acesso Público
ServiçoURLFrontendhttp://13.58.26.62:8080Backend APIhttp://13.58.26.62:4000Zabbixhttp://13.58.26.62:8081Grafanahttp://13.58.26.62:3000
✅ Security Groups Configurados

Porta 22 (SSH)
Porta 80 (HTTP)
Porta 443 (HTTPS)
Porta 3000 (Grafana)
Porta 4000 (Backend)
Porta 8080 (Frontend)
Porta 8081 (Zabbix)
Porta 10051 (Zabbix Server)

🧪 8. POSTMAN - TESTES E DOCUMENTAÇÃO (1,0 ponto)
✅ Collection Criada
Nome: API Gerenciador de Tarefas
Base URL: http://13.58.26.62:4000
✅ Endpoints Documentados
1. Health Check
GET /
Response: {"status": "online", "message": "API funcionando!", ...}
Teste: pm.test("Status 200", () => pm.response.to.have.status(200))
2. Listar Tarefas
GET /tasks
Response: [{"id": 1, "title": "...", "lane": "todo"}]
Testes:
  - Status code is 200
  - Response is an array
  - Each task has id, title, lane
3. Criar Tarefa
POST /tasks
Body: {"title": "Nova Tarefa", "lane": "todo"}
Response: {"id": 2, "title": "Nova Tarefa", "lane": "todo"}
Testes:
  - Status code is 201
  - Task created with ID
  - Title matches input
4. Atualizar Lane
PUT /tasks/:id
Body: {"lane": "done"}
Response: {"updated": true}
Testes:
  - Status code is 200
  - Updated property is true
5. Deletar Tarefa
DELETE /tasks/:id
Response: {"deleted": true}
Testes:
  - Status code is 200
  - Deleted property is true
✅ Testes Automatizados
Todos os endpoints possuem testes que verificam:

Status HTTP correto
Estrutura do JSON de resposta
Validação de dados
Tratamento de erros

