import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      localStorage.setItem('user', JSON.stringify(data));
      toast.success('Logged in successfully');
      navigate('/'); // Redirect to home page
    } catch (error) {
      toast.error(error.message);
      return { error: error.message };
    } finally {
      setLoading(false);
    }
  };

  return { login, loading };
};
