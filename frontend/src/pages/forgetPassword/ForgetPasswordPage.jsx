import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/AuthPages.css";
import { IoArrowBackSharp } from "react-icons/io5";
import { toast } from "react-hot-toast";

const ForgetPasswordPage = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleForgetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/auth/forget-password", { email });
      if (response.status === 200) {
        toast.success("Verification code sent to your email");
        navigate("/forget-password-verify", { state: { email } });
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "User doesn't exist");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen min-w-96 mx-auto mobile-container">
      <div className="w-100 max-w-md p-8 rounded-lg shadow-md bg-blue-300 bg-clip-padding 
                      backdrop-filter backdrop-blur-lg bg-opacity-10 mobile-form">
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
            required
          />
          <div className="grid place-items-center">
            <button
              className="btn hover:bg-gradient-to-bl bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 border border-blue-500 btn-sm mt-8 h-10"
              type="submit"
            >
              Send Verification Code
            </button>
            <Link
              to="/login"
              className="flex text-sm text-white hover:underline flex-col items-center justify-center hover:text-blue-500 mt-3"
            >
              <div className="flex justify-center">
                <IoArrowBackSharp className="mt-1 mr-1" />
                <span>Login</span>
              </div>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgetPasswordPage;
