import { useState } from 'react';
import axios from 'axios';

const Register = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:1337/api/auth/local/register', {
        username,
        email,
        password,
      });
      if (response.data.jwt) {
        localStorage.setItem('jwt', response.data.jwt);
        localStorage.setItem('username', username);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Error registering:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="block w-full p-2 mb-4 border border-gray-300 rounded"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="block w-full p-2 mb-4 border border-gray-300 rounded"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="block w-full p-2 mb-4 border border-gray-300 rounded"
      />
      <button
        onClick={handleRegister}
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Register
      </button>
    </div>
  );
};

export default Register;
