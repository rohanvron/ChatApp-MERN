import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import '../../styles/AuthPages.css';

const ForgetPasswordVerifyPage = () => {
  const [verificationCode, setVerificationCode] = useState('');
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(900); // 15 minutes in seconds
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if the user is coming from the forget password page
    if (!location.state?.email) {
      setError('You are not authorized to access this page');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    }
  }, [location, navigate]);

  useEffect(() => {
    if (timer === 0) {
      setError('Verification code expired');
    }
  }, [timer]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleVerification = async () => {
    try {
      const response = await axios.post('/api/auth/verify-forget-password', {
        email: location.state.email,
        verificationCode,
      });

      if (response.status === 200) {
        navigate('/change-password', { state: { email: location.state.email } });
      }
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  return (
    <div className="auth-page">
      <div className="forget-password-verify-page">
        <h2>Verify Email</h2>
        <p>Please enter the 6-digit verification code sent to your email.</p>
        <input
          type="text"
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
          placeholder="Enter verification code"
          maxLength={6}
        />
        <p>Time remaining: {formatTime(timer)}</p>
        {error && <p className="error-text">{error}</p>}
        <button onClick={handleVerification} disabled={verificationCode.length !== 6 || timer === 0}>
          Verify
        </button>
      </div>
    </div>
  );
};

export default ForgetPasswordVerifyPage;
