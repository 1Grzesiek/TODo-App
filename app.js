const STORAGE_KEY = 'todo_tasks';
const form = document.getElementById('task-form');
const input = document.getElementById('task-input');
const listEl = document.getElementById('task-list');
const counterEl = document.getElementById('counter');
const deleteCompletedBtn = document.getElementById('delete-completed-btn');


let tasks = [];

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function load() {
  const data = localStorage.getItem(STORAGE_KEY);
  tasks = data ? JSON.parse(data) : [];
}

function render() {
  listEl.innerHTML = '';
  tasks.forEach(task => {
    const li = document.createElement('li');
    li.className = 'task-item' + (task.done ? ' done' : '');

    const leftDiv = document.createElement('div');
    leftDiv.style.display = 'flex';
    leftDiv.style.alignItems = 'center';
    leftDiv.style.gap = '10px';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.done;
    checkbox.addEventListener('change', () => toggleTask(task.id));

    const span = document.createElement('span');
    span.className = 'text';
    span.textContent = task.text;

    leftDiv.appendChild(checkbox);
    leftDiv.appendChild(span);

    const btn = document.createElement('button');
    btn.textContent = 'Usuń';
    btn.className = 'delete-btn';
    btn.addEventListener('click', () => deleteTask(task.id));

    li.appendChild(leftDiv);
    li.appendChild(btn);
    listEl.appendChild(li);
  });

  const total = tasks.length;
  const done = tasks.filter(t => t.done).length;
  counterEl.textContent = `${total} zadań • ${done} ukończone`;
}

function addTask(text) {
  tasks.push({ id: Date.now(), text: text.trim(), done: false });
  save();
  render();
}

function toggleTask(id) {
  const task = tasks.find(t => t.id === id);
  if (task) task.done = !task.done;
  save();
  render();
}

function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  save();
  render();
}

function deleteCompletedTasks(){
    tasks = tasks.filter(task => !task.done);
    save();
    render();
}

form.addEventListener('submit', e => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  addTask(text);
  input.value = '';
});

deleteCompletedBtn.addEventListener('click', deleteCompletedTasks);

load();
render();
