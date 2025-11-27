// ===============================
// ARRASTAR TAREFAS ENTRE COLUNAS
// ===============================

// Função usada pelo todo.js
function attachDragListeners(task) {
  task.setAttribute("draggable", "true");

  task.addEventListener("dragstart", () => {
    task.classList.add("is-dragging");
    window.elementoArrastado = task; // usado pelo todo.js e lixeira
  });

  task.addEventListener("dragend", () => {
    task.classList.remove("is-dragging");
    window.elementoArrastado = null;
  });
}

window.attachDragListeners = attachDragListeners;


// ===============================
// LÓGICA DE POSICIONAMENTO (ARRASTAR ACIMA/ABAIXO)
// ===============================
function insertAboveTask(zone, mouseY) {
  const tasks = zone.querySelectorAll(".task:not(.is-dragging)");

  let closest = null;
  let offsetClosest = Number.NEGATIVE_INFINITY;

  tasks.forEach(task => {
    const { top } = task.getBoundingClientRect();
    const offset = mouseY - top;

    if (offset < 0 && offset > offsetClosest) {
      offsetClosest = offset;
      closest = task;
    }
  });

  return closest;
}

document.querySelectorAll(".swim-lane").forEach(zone => {
  zone.addEventListener("dragover", e => {
    e.preventDefault();

    const dragging = document.querySelector(".is-dragging");
    if (!dragging) return;

    const bottomTask = insertAboveTask(zone, e.clientY);

    if (!bottomTask) {
      zone.appendChild(dragging);
    } else {
      zone.insertBefore(dragging, bottomTask);
    }
  });
});
