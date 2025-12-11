// ===============================
// URL da API (AGORA FUNCIONA NO DOCKER)
// ===============================
const API_URL = "http://backend:4000";

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
// CRIA ELEMENTO VISUAL
// ===============================
function createTaskElement(task) {
  const el = document.createElement("p");
  el.classList.add("task");
  el.setAttribute("draggable", "true");
  el.innerText = task.title;
  el.dataset.id = task.id;

  attachDragListeners(el);
  return el;
}

function addTaskToBoard(task) {
  const lane = lanes[task.lane] || lanes.todo;
  lane.appendChild(createTaskElement(task));
}

// ===============================
// API – BUSCAR TAREFAS
// ===============================
async function loadTasks() {
  try {
    const res = await fetch(`${API_URL}/tasks`);
    const tasks = await res.json();

    lanes.todo.innerHTML = '<h3 class="heading">Tudo</h3>';
    lanes.doing.innerHTML = '<h3 class="heading">Fazendo</h3>';
    lanes.done.innerHTML = '<h3 class="heading">Feito</h3>';

    tasks.forEach(addTaskToBoard);

  } catch (err) {
    console.error("Erro ao carregar tarefas:", err);
  }
}

// ===============================
// API – CRIAR TAREFA
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
// API – ATUALIZAR LANE
// ===============================
async function updateTaskLane(id, lane) {
  await fetch(`${API_URL}/tasks/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ lane })
  });
}

// ===============================
// API – EXCLUIR TAREFA
// ===============================
async function deleteTask(id) {
  await fetch(`${API_URL}/tasks/${id}`, { method: "DELETE" });
}

// ===============================
// EVENTO – CRIAR TAREFA
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
// ARRASTAR ENTRE COLUNAS
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
