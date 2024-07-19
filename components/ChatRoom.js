import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

const ChatRoom = ({ jwt }) => {
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const socket = io('http://localhost:1337', {
      query: { token: jwt },
    });

    socket.on('message', (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      socket.disconnect();
    };
  }, [jwt]);

  const joinRoom = async () => {
    const socket = io('http://localhost:1337', {
      query: { token: jwt },
    });

    socket.emit('joinRoom', { username, room });

    try {
      const response = await axios.get(`http://localhost:1337/api/messages/room/${room}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      setMessages(response.data.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleSendMessage = () => {
    const socket = io('http://localhost:1337', {
      query: { token: jwt },
    });

    socket.emit('sendMessage', { content: message, username, room });
    setMessage('');
  };

  return (
    <div className="chat-room">
      <input
        type="text"
        placeholder="Your Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="block w-full p-2 mb-4 border border-gray-300 rounded"
      />
      <input
        type="text"
        placeholder="Room Name"
        value={room}
        onChange={(e) => setRoom(e.target.value)}
        className="block w-full p-2 mb-4 border border-gray-300 rounded"
      />
      <button
        onClick={joinRoom}
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Join Room
      </button>

      <div className="messages mt-4">
        {messages.map((msg, index) => (
          <div key={index} className="message p-2 mb-2 border border-gray-300 rounded">
            <strong>{msg.username}: </strong>{msg.content}
          </div>
        ))}
      </div>

      <input
        type="text"
        placeholder="Type a message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="block w-full p-2 mb-4 border border-gray-300 rounded"
      />
      <button
        onClick={handleSendMessage}
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Send
      </button>
    </div>
  );
};

export default ChatRoom;
