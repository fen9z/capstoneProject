require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
// const http = require('http');
const createWebSocketServer = require('./websocket');
const workoutsRoutes = require('./routes/workouts');
const userRoutes = require('./routes/user');
const bookingRoutes = require('./routes/booking');
const productRoutes = require('./routes/product');
const holdRoutes = require('./routes/hold');
const chatRoutes = require('./routes/chat');

// express app
const app = express();
// const server = http.createServer(app);
const wss = createWebSocketServer();

// middleware
app.use(express.json());
app.use(cors({ origin: true }));
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use('/api/workouts', workoutsRoutes);
app.use('/api/user', userRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/product', productRoutes);
app.use('/api/hold', holdRoutes);
app.use('/api/chat', chatRoutes(wss));

// connect to db
mongoose
  .connect(process.env.MONG_URI)
  .then(() => {
    // listen for request
    app.listen(process.env.PORT, () => {
      console.log('connected to db & listening on port', process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
