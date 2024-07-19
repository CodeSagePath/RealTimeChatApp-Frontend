import { io } from 'socket.io-client';

const SERVER_URL = 'http://localhost:1337';

const socket = io(SERVER_URL, {
  transports: ['websocket'],
  withCredentials: true,
});

export const joinRoom = (username, room) => {
  socket.emit('joinRoom', { username, room });
};

export const sendMessage = (message) => {
  socket.emit('sendMessage', message);
};

export const onMessage = (callback) => {
  socket.on('message', callback);
};

export const onActiveUsers = (callback) => {
  socket.on('activeUsers', callback);
};

export default socket;
