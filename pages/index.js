import { useState } from 'react';
import AuthForm from '../components/AuthForm';

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-teal-500">
      <div className="bg-white p-10 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-extrabold text-center mb-8 text-gray-800">
          Real-Time Chat App
        </h1>
        <AuthForm setIsAuthenticated={setIsAuthenticated} />
      </div>
    </div>
  );
}
