const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

let tasks = [];

// Carrega as tarefas do localStorage
function loadTasks() {
  const stored = localStorage.getItem('tasks');
  tasks = stored ? JSON.parse(stored) : [];
}

// Salva as tarefas no localStorage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Renderiza a lista de tarefas
function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    if (task.done) {
      li.classList.add('done');
    }
    
    const span = document.createElement('span');
    span.textContent = task.text;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.done;
    checkbox.addEventListener('change', () => {
      tasks[index].done = checkbox.checked;
      saveTasks();
      renderTasks();
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'X';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
}

// Adiciona nova tarefa
taskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = taskInput.value.trim();
  if (!text) return;
  
  tasks.push({ text, done: false });
  saveTasks();
  renderTasks();
  taskInput.value = '';
  taskInput.focus();
});

// Inicializa
loadTasks();
renderTasks();

// Registra o service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js')
    .then(() => console.log('Service Worker registrado com sucesso.'))
    .catch(err => console.error('Falha ao registrar o Service Worker:', err));
}
