// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./Routes/auth');

const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/whatsapp_clone', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
  app.listen(5000, () => {
    console.log('Server is running on port 5000');
  });
});



//Socket.io for Real-time Communication:
// backend/server.js (additions)
const http = require('http');
const socketIo = require('socket.io');

const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('message', (msg) => {
    io.emit('message', msg);
  });
});

// Replace app.listen with server.listen
server.listen(5000, () => {
  console.log('Server is running on port 5000');
});

