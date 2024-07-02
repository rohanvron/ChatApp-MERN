import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/AuthPages.css";

const ForgetPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleForgetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/auth/forget-password", { email });
      if (response.status === 200) {
        navigate("/forget-password-verify", { state: { email } });
      }
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen min-w-96 mx-auto">
      <div
        className="w-100 max-w-md p-8 rounded-lg shadow-md bg-blue-300 bg-clip-padding 
                      backdrop-filter backdrop-blur-lg bg-opacity-10"
      >
        <h2 className="text-2xl font-semibold text-center text-white">
          Forget Password
        </h2>
        <p className="text-white my-6">
          Enter your email address to receive a verification code.
        </p>
        <form onSubmit={handleForgetPassword}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full input input-bordered h-10 bg-gray-300 text-black placeholder:text-gray-600"
          />
          {error && <p className="error-text">{error}</p>}
          <div className="grid place-items-center">
            <button
              className="btn hover:bg-gradient-to-bl bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 border border-blue-500 btn-sm mt-8 h-10"
              type="submit"
            >
              Send Verification Code
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgetPasswordPage;
