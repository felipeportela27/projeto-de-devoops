// ===============================
// URL da API (ACESSO PELO NAVEGADOR)
// ===============================
const API_URL = "http://localhost:4000";

// ===============================
// ELEMENTOS DO DOM
// ===============================
const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");

const lanes = {
  todo: document.getElementById("todo-lane"),
  doing: document.getElementById("doing-lane"),
  done: document.getElementById("done-lane")
};

const lixeira = document.getElementById("lixeira");

// ===============================
// FUNÇÃO – Criar elemento visual da tarefa
// ===============================
function createTaskElement(task) {
  const el = document.createElement("p");
  el.classList.add("task");
  el.setAttribute("draggable", "true");
  el.innerText = task.title;
  el.dataset.id = task.id;

  attachDragListeners(el); // listeners de arrastar (vem do arrastar.js)

  return el;
}

// ===============================
// FUNÇÃO – Adicionar tarefa ao quadro (UI)
// ===============================
function addTaskToBoard(task) {
  const lane = lanes[task.lane] || lanes.todo;
  const el = createTaskElement(task);
  lane.appendChild(el);
}

// ===============================
// API – Buscar tarefas do backend
// ===============================
async function loadTasks() {
  try {
    const res = await fetch(`${API_URL}/tasks`);
    const tasks = await res.json();

    // limpar tudo antes de carregar
    lanes.todo.innerHTML = '<h3 class="heading">Tudo</h3>';
    lanes.doing.innerHTML = '<h3 class="heading">Fazendo</h3>';
    lanes.done.innerHTML = '<h3 class="heading">Feito</h3>';

    tasks.forEach(addTaskToBoard);

  } catch (err) {
    console.error("Erro ao carregar tarefas:", err);
  }
}

// ===============================
// API – Criar nova tarefa
// ===============================
async function createTask(title) {
  const res = await fetch(`${API_URL}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, lane: "todo" })
  });

  return await res.json();
}

// ===============================
// API – Atualizar lane
// ===============================
async function updateTaskLane(id, lane) {
  await fetch(`${API_URL}/tasks/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ lane })
  });
}

// ===============================
// API – Excluir tarefa
// ===============================
async function deleteTask(id) {
  await fetch(`${API_URL}/tasks/${id}`, {
    method: "DELETE"
  });
}

// ===============================
// EVENTO – Criar tarefa
// ===============================
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = input.value.trim();
  if (!title) return;

  const newTask = await createTask(title);
  addTaskToBoard(newTask);

  input.value = "";
});

// ===============================
// EVENTO – Arrastar tarefas entre colunas
// ===============================
document.querySelectorAll(".swim-lane").forEach((laneElement) => {
  laneElement.addEventListener("dragover", (e) => e.preventDefault());

  laneElement.addEventListener("drop", async (e) => {
    e.preventDefault();

    const task = window.elementoArrastado;
    if (!task) return;

    const id = task.dataset.id;
    const newLane = laneElement.id.replace("-lane", "");

    await updateTaskLane(id, newLane);
    laneElement.appendChild(task);
  });
});

// ===============================
// LÓGICA DA LIXEIRA
// ===============================
lixeira.addEventListener("dragover", (e) => {
  e.preventDefault();
  lixeira.classList.add("hover");
});

lixeira.addEventListener("dragleave", () => {
  lixeira.classList.remove("hover");
});

lixeira.addEventListener("drop", async () => {
  const task = window.elementoArrastado;

  if (task) {
    const id = task.dataset.id;

    await deleteTask(id);
    task.remove();
  }

  lixeira.classList.remove("hover");
});

// ===============================
// INICIAR APP
// ===============================
loadTasks();
