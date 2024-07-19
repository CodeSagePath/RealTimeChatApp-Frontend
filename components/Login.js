import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const Login = ({ setIsAuthenticated }) => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:1337/api/auth/local', {
        identifier,
        password,
      });
      const { jwt, user } = response.data;
      localStorage.setItem('jwt', jwt);
      localStorage.setItem('username', user.username);
      setIsAuthenticated(true);
      router.push('/chat');
    } catch (error) {
      setMessage('Login failed.');
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Login</h2>
      <input
        type="text"
        placeholder="Username or Email"
        value={identifier}
        onChange={(e) => setIdentifier(e.target.value)}
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
        onClick={handleLogin}
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Login
      </button>
      {message && <p className="mt-4 text-center text-red-500">{message}</p>}
    </div>
  );
};

export default Login;
