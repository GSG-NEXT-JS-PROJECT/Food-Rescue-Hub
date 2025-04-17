import io from 'socket.io-client';

const socket = io('http://localhost:4000', {
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

socket.on('connect', () => {
  console.log('Socket.IO client connected');
});

socket.on('connect_error', (error) => {
  console.error('Socket.IO client connect error:', error);
});

export default socket;