import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import '../../styles/AuthPages.css'; // Import the shared styles

const VerificationPage = () => {
  const [verificationCode, setVerificationCode] = useState('');
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(900); // 15 minutes in seconds
  const [canResend, setCanResend] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if the user is coming from the signup page
    if (!location.state?.email) {
      setError('You are not authorized to access this page');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    }

    // Set a timer for resend button
    const resendTimer = setTimeout(() => {
      setCanResend(true);
    }, 60000); // 60 seconds

    return () => clearTimeout(resendTimer);
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
      const response = await axios.post('/api/auth/verify-email', {
        email: location.state.email,
        verificationCode,
      });

      if (response.status === 200) {
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  const handleResendCode = async () => {
    try {
      await axios.post('/api/auth/resend-verification', {
        email: location.state.email,
      });
      setError('Verification code resent. Please check your email.');
      setCanResend(false);
      setTimeout(() => {
        setCanResend(true);
      }, 60000);
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  return (
    <div className="auth-page">
      <div className="verification-page">
        {error ? (
          <div className="error-message">
            <p>{error}</p>
          </div>
        ) : (
          <>
            <h2>Email Verification</h2>
            <p>Please enter the 6-digit verification code sent to your email.</p>
            <input
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              placeholder="Enter verification code"
              maxLength={6}
            />
            <p>Time remaining: {formatTime(timer)}</p>
            <button onClick={handleResendCode} disabled={!canResend}>
              Resend Code
            </button>
            <button onClick={handleVerification} disabled={verificationCode.length !== 6 || timer === 0}>
              Verify
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default VerificationPage;
