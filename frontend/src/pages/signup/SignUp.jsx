import React, { useState } from "react";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import Gender from "./Gender";
import "./signup.css";

const SignUp = ({
  fullName,
  setFullName,
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  gender,
  setGender,
  error,
  handleSignup,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen min-w-96 mx-auto">
      <div
        className="w-96 max-w-md p-8 rounded-lg shadow-md bg-blue-300 bg-clip-padding 
                      backdrop-filter backdrop-blur-lg bg-opacity-5"
      >
        <h1 className="text-2xl font-semibold text-center text-gray-300">
          SignUp
          <span className="font-bold bg-gradient-to-r from-cyan-500 to-blue-500 text-transparent bg-clip-text">
            {" "}
            ChatApp
          </span>
        </h1>

        <form onSubmit={handleSignup}>
          <div>
            <label className="label p-2 mt-5">
              <span className="text-base label-text text-white">Full Name</span>
            </label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full input input-bordered h-10 bg-gray-300 text-black placeholder:text-gray-600"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <div>
            <label className="label p-2">
              <span className="text-base label-text mt-3 text-white">
                Email
              </span>
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full input input-bordered h-10 bg-gray-300 text-black placeholder:text-gray-600"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
                className="w-full input input-bordered h-10 bg-gray-300 text-black placeholder:text-gray-600 pr-10"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-black hover:text-gray-700 focus:outline-none"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div>
            <label className="label">
              <span className="text-base label-text mt-3 text-white">
                Confirm Password
              </span>
            </label>
            <div className="relative">
              <input
                type="password"
                placeholder="Confirm password"
                className="w-full input input-bordered h-10 bg-gray-300 text-black placeholder:text-gray-600 pr-10"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          <Gender gender={gender} setGender={setGender} />

          <a
            href="/Login"
            className="flex text-sm hover:underline flex-col items-center justify-center hover:text-blue-500 mt-3 text-white"
          >
            Already have an account? {"Login"}
          </a>

          {error && <p className="error">{error}</p>}

          <div>
            <button
              type="submit"
              className="w-full btn hover:bg-gradient-to-bl bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-2 px-4 border border-blue-500 btn-sm mt-6 mb-2 h-10"
            >
              SignUp
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
