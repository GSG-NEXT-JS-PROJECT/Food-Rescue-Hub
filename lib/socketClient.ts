import { io } from 'socket.io-client';

const socket = io('http://localhost:4000'); // Connect to Socket.IO server
export default socket;