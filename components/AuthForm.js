import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const AuthForm = ({ setIsAuthenticated }) => {
  const [isRegistering, setIsRegistering] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [identifier, setIdentifier] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleAuth = async () => {
    try {
      const url = isRegistering
        ? 'http://localhost:1337/api/auth/local/register'
        : 'http://localhost:1337/api/auth/local';
      const data = isRegistering
        ? { username, email, password }
        : { identifier, password };
      const response = await axios.post(url, data);
      const { jwt } = response.data;
      localStorage.setItem('jwt', jwt);
      setIsAuthenticated(true);
      router.push('/chat');
    } catch (error) {
      setMessage('Authentication failed.');
    }
  };

  return (
    <div className="auth-form">
      <h2>{isRegistering ? 'Register' : 'Login'}</h2>
      {isRegistering ? (
        <>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </>
      ) : (
        <input
          type="text"
          placeholder="Username or Email"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
        />
      )}
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleAuth}>
        {isRegistering ? 'Register' : 'Login'}
      </button>
      <button onClick={() => setIsRegistering(!isRegistering)}>
        {isRegistering ? 'Already have an account? Login' : 'Need an account? Register'}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AuthForm;
