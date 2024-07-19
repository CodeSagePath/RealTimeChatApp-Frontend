import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const PrivateRoute = ({ children }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
      router.push('/login');
    } else {
      setLoading(false);
    }
  }, [router]);

  if (loading) return <p>Loading...</p>;

  return children;
};

export default PrivateRoute;
