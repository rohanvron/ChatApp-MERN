import React, { useState } from "react";
import { FaEyeSlash, FaEye } from 'react-icons/fa';
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const ChangePasswordPage = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      const response = await axios.post("/api/auth/change-password", {
        email: location.state.email,
        newPassword,
      });
      if (response.status === 200) {
        setError("");
        setSuccess("Password changed successfully");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen min-w-96 mx-auto">
      <div
        className="w-96 max-w-md p-8 rounded-lg shadow-md bg-blue-300 bg-clip-padding
                      backdrop-filter backdrop-blur-lg bg-opacity-10"
      >
        <h2 className="text-2xl font-semibold text-center text-white">
          Change Password
        </h2>
        <form onSubmit={handleChangePassword}>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              className="w-full input input-bordered h-10 bg-gray-300 text-black placeholder:text-gray-600 mt-8 pr-10"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 pt-8 flex items-center text-black hover:text-gray-700 focus:outline-none"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm new password"
            className="w-full input input-bordered h-10 bg-gray-300 text-black placeholder:text-gray-600 mt-4"
          />
          {error && <p className="error-text text-re">{error}</p>}
          {success && <p className="success-text">{success}</p>}
          <div className="grid place-items-center">
            <button
              className="btn hover:bg-gradient-to-bl bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 border border-blue-500 btn-sm mt-8 h-10"
              type="submit"
            >
              Change Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordPage;
