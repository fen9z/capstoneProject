// server/websocket.js
const WebSocket = require('ws');

const createWebSocketServer = () => {
  const wss = new WebSocket.Server({ port: 3001 });
  const clients = new Map();

  // Track whether the connection success message has been sent
  let connectionSuccessSent = false;

  wss.on('connection', (socket) => {
    console.log('WebSocket client connected');

    // Generate a unique ID for the client (you may use a library like uuid)
    const clientId = generateUniqueId();

    // Associate the client ID with the WebSocket connection
    clients.set(clientId, socket);

    // Send the number of connected clients to all clients
    if (!connectionSuccessSent) {
      socket.send(`Welcome, you are connected as user: ${clientId}`);
      connectionSuccessSent = true;
    }

    // Additional logic, if needed, when a client connects...

    socket.on('message', (message) => {
      console.log(
        `Received message from WebSocket client ${clientId}: ${message}`
      );
      // Handle the WebSocket message as needed
      broadcastMessage(message, clientId);
    });

    socket.on('close', () => {
      console.log(`WebSocket client ${clientId} disconnected`);

      clients.delete(clientId);

      // Broadcast the updated list of connected clients
      broadcastMessage(getConnectedUsers(), clientId);
    });
  });

  function broadcastMessage(message, senderId) {
    // 向所有连接的客户端发送相同的消息，但不发送给消息的发送者
    clients.forEach((client, clientId) => {
      if (client.readyState === WebSocket.OPEN && clientId !== senderId) {
        client.send(message.toString());
      }
    });
  }

  // Function to generate a unique ID (you can replace this with a better solution)
  function generateUniqueId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  function getConnectedUsers() {
    return Array.from(clients.keys()).map((id) => `user:${id}`);
  }

  return wss;
};

module.exports = createWebSocketServer;
