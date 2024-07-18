// path: components/ChatRoom.js

import { useState, useEffect } from 'react';
import io from 'socket.io-client';

const ChatRoom = ({ room }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const socket = io('http://localhost:1337');

  useEffect(() => {
    socket.emit('join-room', room);

    socket.on('new-message', (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      socket.disconnect();
    };
  }, [room]);

  const sendMessage = () => {
    socket.emit('send-message', { content: message, room });
    setMessage('');
  };

  return (
    <div>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>{msg.content}</div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatRoom;
