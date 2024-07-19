import { useState, useEffect } from 'react';
import axios from 'axios';
import ChatRoom from '../components/ChatRoom';
import PrivateRoute from '../components/PrivateRoute';

const ChatPage = () => {
  const [room, setRoom] = useState('');
  const [joined, setJoined] = useState(false);
  const [username, setUsername] = useState('');
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const joinChat = () => {
    // if (username && room) {
      setJoined(true);
    // }
  };

  return (
    <PrivateRoute>
      <div>
        {!joined ? (
          <div>
            <h1>Join a Chat Room</h1>
            <div className="mb-4">
              {/* <h2>Available Rooms:</h2> */}
              <ul>
                {rooms.map((room, index) => (
                  <li key={index}>
                    <button
                      onClick={() => setRoom(room.name)}
                      className="text-blue-500 underline"
                    >
                      {room.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
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
