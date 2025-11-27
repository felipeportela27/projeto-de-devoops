import express from "express";
import sqlite3 from "sqlite3";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// ===============================
// BANCO DE DADOS (SQLite simples)
// ===============================
const db = new sqlite3.Database("./tasks.db", (err) => {
  if (err) {
    console.error("Erro ao abrir o banco:", err);
  } else {
    console.log("Banco de dados conectado.");
  }
});

// Criar tabela se não existir
db.run(`
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    lane TEXT NOT NULL
  )
`);

// ===============================
// ROTAS DA API
// ===============================

// Rota raiz — status
app.get("/", (req, res) => {
  res.send("API do Gerenciador de Tarefas está funcionando!");
});

// Listar tarefas
app.get("/tasks", (req, res) => {
  db.all("SELECT * FROM tasks", [], (err, rows) => {
    if (err) return res.status(500).json({ error: "Erro ao listar tarefas" });
    res.json(rows);
  });
});

// Criar tarefa
app.post("/tasks", (req, res) => {
  const { title, lane } = req.body;

  if (!title || title.trim() === "") {
    return res.status(400).json({ error: "Título é obrigatório" });
  }

  db.run(
    "INSERT INTO tasks (title, lane) VALUES (?, ?)",
    [title.trim(), lane || "todo"],
    function (err) {
      if (err) return res.status(500).json({ error: "Erro ao criar tarefa" });

      res.json({
        id: this.lastID,
        title: title.trim(),
        lane: lane || "todo"
      });
    }
  );
});

// Atualizar lane (arrastar entre colunas)
app.put("/tasks/:id", (req, res) => {
  const { lane } = req.body;

  db.run(
    "UPDATE tasks SET lane = ? WHERE id = ?",
    [lane, req.params.id],
    function (err) {
      if (err) {
        return res.status(500).json({ error: "Erro ao atualizar tarefa" });
      }

      if (this.changes === 0) {
        return res.status(404).json({ error: "Tarefa não encontrada" });
      }

      res.json({ updated: true });
    }
  );
});

// Apagar tarefa
app.delete("/tasks/:id", (req, res) => {
  db.run("DELETE FROM tasks WHERE id = ?", [req.params.id], function (err) {

    if (err) {
      return res.status(500).json({ error: "Erro ao deletar tarefa" });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: "Tarefa não encontrada" });
    }

    res.json({ deleted: true });
  });
});

// ===============================
// INICIAR SERVIDOR
// ===============================
app.listen(4000, () => {
  console.log("Backend rodando na porta 4000");
});
