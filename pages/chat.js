import { useState, useEffect } from 'react';
import ChatRoom from '../components/ChatRoom';
import PrivateRoute from '../components/PrivateRoute';

const ChatPage = () => {
  const [room, setRoom] = useState('');
  const [joined, setJoined] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const joinChat = () => {
    if (username && room) {
      setJoined(true);
    }
  };

  return (
    <PrivateRoute>
      <div>
        {!joined ? (
          <div>
            <h1>Join a Chat Room</h1>
            <input
              type="text"
              placeholder="Room"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
            />
            <button onClick={joinChat}>Join</button>
          </div>
        ) : (
          <ChatRoom jwt={localStorage.getItem('jwt')} />
        )}
      </div>
    </PrivateRoute>
  );
};

export default ChatPage;
