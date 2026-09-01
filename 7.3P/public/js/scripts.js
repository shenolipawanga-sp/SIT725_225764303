const socket = io();

const itemInput = document.getElementById('itemInput');
const addBtn = document.getElementById('addBtn');
const userCountEl = document.getElementById('userCount');
const todoListEl = document.getElementById('todoList');


let items = [];

addBtn.addEventListener('click', addItem);
itemInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') addItem();
});

function addItem() {
  const text = itemInput.value.trim();
  if (!text) return;
  socket.emit('addItem', text);
  itemInput.value = '';
  itemInput.focus();
}


socket.on('todoList', (serverItems) => {
  items = serverItems;
  render();
});

socket.on('itemAdded', (item) => {
  items.push(item);
  render();
});

socket.on('itemToggled', ({ id, done }) => {
  const item = items.find((i) => i.id === id);
  if (item) item.done = done;
  render();
});

socket.on('itemDeleted', (id) => {
  items = items.filter((i) => i.id !== id);
  render();
});

socket.on('userCount', (count) => {
  userCountEl.innerText = `${count} user${count === 1 ? '' : 's'} online`;
});

function render() {
  todoListEl.innerHTML = '';

  if (items.length === 0) {
    todoListEl.innerHTML = '<li class="collection-item grey-text">No tasks yet</li>';
    return;
  }

  items.forEach((item) => {
    const li = document.createElement('li');
    li.className = 'collection-item todo-row';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'todo-checkbox';
    checkbox.checked = item.done;
    checkbox.id = `check-${item.id}`;
    checkbox.addEventListener('change', () => {
      socket.emit('toggleItem', item.id);
    });

    const label = document.createElement('label');
    label.htmlFor = `check-${item.id}`;
    label.className = 'todo-label';
    label.innerText = item.text;
    if (item.done) label.classList.add('done-text');

    const deleteIcon = document.createElement('a');
    deleteIcon.href = '#!';
    deleteIcon.className = 'secondary-content';
    deleteIcon.innerHTML = '<i class="material-icons delete-icon">delete</i>';
    deleteIcon.addEventListener('click', (e) => {
      e.preventDefault();
      socket.emit('deleteItem', item.id);
    });

    li.appendChild(checkbox);
    li.appendChild(label);
    li.appendChild(deleteIcon);
    todoListEl.appendChild(li);
  });
}
