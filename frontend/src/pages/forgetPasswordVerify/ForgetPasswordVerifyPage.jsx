import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";
import "../../styles/AuthPages.css";

const ForgetPasswordVerifyPage = () => {
  const [verificationCode, setVerificationCode] = useState("");
  const [timer, setTimer] = useState(900);
  const [error, setError] = useState("");
  const [isExpired, setIsExpired] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!location.state?.email) {
      setError('You are not authorized to access this page');
      setTimeout(() => {
        navigate('/forget-password');
      }, 2000);
    }

    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 0) {
          clearInterval(interval);
          setIsExpired(true);
          toast.error("Verification code has expired.");
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [location, navigate]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleVerification = async () => {
    try {
      const response = await axios.post("/api/auth/forget-password-verify", {
        email: location.state?.email,
        verificationCode,
      });
  
      if (response.data.message) {
        toast.success(response.data.message);
        navigate("/change-password", { state: { email: location.state?.email, verified: true } });
      }
    } catch (error) {
      if (error.response?.data?.error === "Verification code has expired") {
        setIsExpired(true);
        toast.error("Verification code has expired. Please request a new one.");
      } else {
        toast.error(error.response?.data?.error || "An error occurred during verification");
      }
    }
  };
  

  if (error) {
    return (
      <div className="auth-page flex flex-col items-center justify-center min-h-screen min-w-96 mx-auto">
        <div className="verification-page">
          <div className="error-message">
            <p className="text-white text-2xl">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen min-w-96 mx-auto">
      <div
        className="w-100 max-w-md p-8 rounded-lg shadow-md bg-blue-300 bg-clip-padding
                      backdrop-filter backdrop-blur-lg bg-opacity-10"
      >
        <h2 className="text-2xl font-semibold text-center text-white">
          Forget Password Verification
        </h2>
        <p className="text-white my-6">
          Please enter the 6-digit verification code sent to your email.
        </p>
        <input
          type="text"
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
          placeholder="Enter verification code"
          maxLength={6}
          className="w-full input input-bordered h-10 bg-gray-300 text-black placeholder:text-gray-600"
        />
        <p className="text-center mt-2 text-white">
          {isExpired ? "Code expired" : `Time remaining: ${formatTime(timer)}`}
        </p>

        <div className="grid place-items-center">
          <button
            className={`w-1/3 btn px-4 border border-blue-500 btn-sm mt-6 h-10 ${
              verificationCode.length === 6 && !isExpired
                ? "hover:bg-gradient-to-bl bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
                : "bg-gray-500 text-gray-500 cursor-not-allowed"
            }`}
            onClick={handleVerification}
            disabled={verificationCode.length !== 6 || isExpired}
          >
            Verify
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgetPasswordVerifyPage;
