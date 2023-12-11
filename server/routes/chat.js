// server/routes/chat.js
const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

const chatRoutes = (wss) => {
  router.post('/messages', async (req, res) => {
    const userMessage = req.body.message;
    const botReply = await chatController.processUserMessage(userMessage);
    res.json({ reply: botReply });
  });

  // Custom middleware to access WebSocket server
  router.use((req, res, next) => {
    req.wss = wss; // Attach WebSocket server to the request object
    next();
  });

  return router;
};

module.exports = chatRoutes;
