import io from 'socket.io-client';

const SOCKET_IO_URL = process.env.NEXT_PUBLIC_SOCKET_IO_URL;

if (!SOCKET_IO_URL) {
  throw new Error("NEXT_PUBLIC_SOCKET_IO_URL is not defined in environment variables");
}

const socket = io(SOCKET_IO_URL, {
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