const express = require('express');
const path = require('path');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

const server = http.createServer(app);
const io = new Server(server);


let items = [];
let nextId = 1;
let userCount = 0;

function broadcastUserCount() {
  io.emit('userCount', userCount);
}

io.on('connection', (socket) => {
  userCount++;
  console.log(`User connected (${socket.id}). Total users: ${userCount}`);
  broadcastUserCount();

  // Catch the new tab
  socket.emit('todoList', items);

  socket.on('addItem', (text) => {
    const trimmed = (text || '').toString().trim().slice(0, 100);
    if (!trimmed) return;

    const item = { id: nextId++, text: trimmed, done: false };
    items.push(item);
    console.log(`Item added: "${item.text}" (id ${item.id})`);
    io.emit('itemAdded', item);
  });

  socket.on('toggleItem', (id) => {
    const item = items.find((i) => i.id === id);
    if (!item) return;

    item.done = !item.done;
    console.log(`Item ${id} toggled to done=${item.done}`);
    io.emit('itemToggled', { id: item.id, done: item.done });
  });

  socket.on('deleteItem', (id) => {
    const existed = items.some((i) => i.id === id);
    if (!existed) return;

    items = items.filter((i) => i.id !== id);
    console.log(`Item ${id} deleted`);
    io.emit('itemDeleted', id);
  });

  socket.on('disconnect', () => {
    userCount--;
    console.log(`User disconnected (${socket.id}). Total users: ${userCount}`);
    broadcastUserCount();
  });
});

if (require.main === module) {
  server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

module.exports = server;
