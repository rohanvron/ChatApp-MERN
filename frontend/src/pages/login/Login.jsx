import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import "./login.css";

const Login = () => {
  const [username, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // Reset the error state
    setError("");

    // Validate the form fields
    if (!username || !password) {
      setError("Please fill in all the fields.");
      return;
    }

    // login logic
    // ...
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen min-w-96 mx-auto">
      <div
        className="w-96 max-w-md p-8 rounded-lg shadow-md bg-blue-300 bg-clip-padding 
                      backdrop-filter backdrop-blur-lg bg-opacity-5"
      >
        <h1 className="text-2xl font-semibold text-center text-white">
          Login
          <span className="font-bold bg-gradient-to-r from-cyan-500 to-blue-500 text-transparent bg-clip-text">
            {" "}
            ChatApp
          </span>
        </h1>

        <form>
          <div>
            <label className="label p-2 mt-5">
              <span className="text-base label-text text-white">Email</span>
            </label>

            <input
              type="text"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full input input-bordered h-10 bg-gray-300 text-black placeholder:text-gray-600"
            />
          </div>
          <div>
            <label className="label">
              <span className="text-base label-text mt-3 text-white">
                Password
              </span>
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full input input-bordered h-10 bg-gray-300 text-black placeholder:text-gray-600"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 px-3 flex items-center text-black hover:text-gray-700 focus:outline-none"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <p className=" text-sm italic hover:underline flex-col items-center justify-center  hover:text-blue-500 mt-3">
            Forgot your password? <Link to="/forget-password">Click here</Link>
          </p>

          <div>
            <button
              className="w-full btn hover:bg-gradient-to-bl bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-2 
                                px-4 border border-blue-500 btn-sm mt-6 mb-2 h-10"
            >
              Login
            </button>
          </div>

          {error && <p className="text-red-500 mb-4">{error}</p>}

          <a
            href="/SignUp"
            className="flex text-sm text-white hover:underline flex-col items-center justify-center  hover:text-blue-500 mt-3"
          >
            Don't have an account? {"Sign Up"}
          </a>
        </form>
      </div>
    </div>
  );
};

export default Login;
