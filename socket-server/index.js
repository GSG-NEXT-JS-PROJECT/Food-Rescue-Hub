/* eslint-disable @typescript-eslint/no-require-imports */
const { Server } = require('socket.io');
const http = require('http');

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/emit-notification') {
    let body = '';
    req.on('data', (chunk) => (body += chunk));
    req.on('end', () => {
      try {
        const { userId, notification } = JSON.parse(body);
        console.log(`Received HTTP request to emit notification to ${userId}:`, notification);
        io.to(userId).emit('notification', notification);
        console.log(`Emitted notification to room ${userId}`);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Notification emitted' }));
      } catch (error) {
        console.error('Error parsing notification request:', error);
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid request' }));
      }
    });
  } else if (req.method === 'POST' && req.url === '/emit-donation-update') {
    let body = '';
    req.on('data', (chunk) => (body += chunk));
    req.on('end', () => {
      try {
        const { donation } = JSON.parse(body);
        console.log('Received HTTP request to emit donation update:', donation);
        io.to('donations').emit('donation-update', donation);
        console.log('Emitted donation update to donations room');
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Donation update emitted' }));
      } catch (error) {
        console.error('Error parsing donation update request:', error);
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid request' }));
      }
    });
  } else {
    res.writeHead(404);
    res.end();
  }
});

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.on('join', (userId) => {
    socket.join(userId);
    console.log(`User ${userId} joined room`);
  });

  socket.on('join-donations', () => {
    socket.join('donations');
    console.log('Client joined donations room:', socket.id);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

server.listen(4000, () => {
  console.log('Socket.IO server running on http://localhost:4000');
});