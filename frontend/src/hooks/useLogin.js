import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext'; // Add this import

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setAuthUser } = useAuthContext(); // Add this line

  const login = async (email, password) => {
    if (!email ||!password) {
      toast.error('Please fill all the fields');
      return;
    }
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

      localStorage.setItem('chat-user', JSON.stringify(data));
      setAuthUser(data); // update the auth context

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
