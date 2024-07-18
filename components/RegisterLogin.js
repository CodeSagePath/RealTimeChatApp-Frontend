import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function RegisterLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      // Register or Login user
      await axios.post('http://127.0.0.1:1337/api/auth/local', {
        username,
        password,
        // email: `${username}@example.com`,
      });
    } catch (error) {
      console.log(error.response.data.error)
    };
    
    router.push('/chat');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter username"
      />
      <input
        type="text"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter password"
      />
      <button type="submit">Register/Login</button>
    </form>
  );
}
