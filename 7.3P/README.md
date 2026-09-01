# SIT725 Task 7.3P - Socket Programming

## Functions

- todoList - sent to a client right after connecting, with the current full list
- addItem - sent from a client to add a task
- itemAdded - broadcast from the server to all clients with the new task
- toggleItem - sent from a client to mark a task done/not done
- itemToggled - broadcast to all clients with the updated status
- deleteItem - sent from a client to remove a task
- itemDeleted - broadcast to all clients with the removed task's id
- userCount - broadcast whenever a user connects or disconnects

## Dependencies

- express
- socket.io
