import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';

const useSignUp = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const signup = async ({
    fullName,
    email,
    password,
    confirmPassword,
    gender,
  }) => {
    const success = handleInputErrors({
      fullName,
      email,
      password,
      confirmPassword,
      gender,
    });
    if (!success) return;

    setLoading(true);

    try {
      console.log('Sending POST request to:', 'http://localhost:3000/api/auth/signup');
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fullName,
          email,
          password,
          confirmPassword,
          gender
        }),
        credentials: 'include'
      });
    
      const responseData = await res.json();

      if (!res.ok) {
        throw new Error(responseData.error || "An error occurred during signup");
      }

      console.log('Response received:', responseData);
      
      // Redirect to verification page
      navigate('/signup/verify-email', { 
        state: { 
          userId: responseData.userId, 
          email: responseData.email,
          fullName: responseData.fullName,
          profilePic: responseData.profilePic
        } 
      });

      toast.success("Signup successful. Please check your email for verification.");
    } catch (error) {
      console.error('Error during signup:', error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { signup, loading };
};

export default useSignUp;

function handleInputErrors({
  fullName,
  email,
  password,
  confirmPassword,
  gender,
}) {
  if (!fullName || !email || !password || !confirmPassword || !gender) {
    toast.error("Please fill all the fields");
    return false;
  }

  if (email.indexOf("@") === -1 || email.indexOf(".") === -1) {
    toast.error("Please enter a valid email address");
    return false;
  }

  if (password !== confirmPassword) {
    toast.error("Passwords do not match");
    return false;
  }

  if (password.length < 8) {
    toast.error("Password must be at least 8 characters");
    return false;
  }

  return true;
}
