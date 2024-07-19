import { useState, useEffect } from 'react';
import socket, { joinRoom, sendMessage } from '../lib/socket';

const Chat = ({ username, room }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [activeUsers, setActiveUsers] = useState([]);

  useEffect(() => {
    joinRoom(username, room);

    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off('message');
    };
  }, [username, room]);

  const handleSendMessage = () => {
    const messageData = {
      content: message,
      username,
      room,
    };
    sendMessage(messageData);
    setMessage('');
  };

  return (
    <div>
      <h1>Chat Room: {room}</h1>
      <div>
        <h2>Messages</h2>
        <ul>
          {messages.map((msg, index) => (
            <li key={index}>{`${msg.username}: ${msg.content}`}</li>
          ))}
        </ul>
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default Chat;
