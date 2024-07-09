import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";
import sendVerificationEmail from "../utils/sendVerificationEmail.js";

export const signup = async (req, res) => {
  try {
    console.log("Received signup request:", req.body);
    const { fullName, email, password, confirmPassword, gender } = req.body;

    // Email validation
    console.log("Validating email...");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    // Password validation
    console.log("Validating password...");
    if (password.length < 8) {
      return res.status(400).json({ error: "Password must be at least 8 characters long" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Password Mis-match!" });
    }

    // Check if user already exists
    console.log("Checking for existing user...");
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Random profilePic
    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${email}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${email}`;

    // Generate a verification code
    const verificationCode = Math.floor(100000 + Math.random() * 900000);
    const verificationCodeCreatedAt = new Date(); //for timer of 15min

    // Create a new user
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
      verificationCode,
      verificationCodeCreatedAt, //for timer of 15min
    });

    await newUser.save();

    // Generate JWT token
    generateTokenAndSetCookie(newUser._id, res);

    await sendVerificationEmail(email, verificationCode);

    res.status(201).json({
      message: "User created successfully. Please verify your email.",
      fullName: newUser.fullName,
      userId: newUser._id,
      email: newUser.email,
      profilePic: newUser.profilePic,
    });

  } catch (error) {
    console.error("Error in signup controller:", error);
    if (error.code === 11000) {
      return res.status(400).json({ error: "Email already exists" });
    }
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
};

// login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !user.isVerified) {
      return res.status(400).json({ error: "Email not verified or invalid credentials" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid Email or Password!" });
    }

    generateTokenAndSetCookie(user._id, res);

    res.status(200).json({
      userId: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out Successfully!" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// verify email
export const verifyEmail = async (req, res) => {
  try {
    const { userId, verificationCode } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.verificationCode !== verificationCode) {
      return res.status(400).json({ error: "Invalid verification code" });
    }

    // check if the verification code has expired (15 minutes)
    const currentTime = new Date();
    const timeDifference = (currentTime - user.verificationCodeCreatedAt) / 1000 / 60; // in minutes
    if (timeDifference > 15) {
      return res.status(400).json({ error: "Verification code has expired" });
    }

    user.isVerified = true;
    user.verificationCode = undefined;
    await user.save();

    res.status(200).json({ verified: true, message: "Email verified successfully" });
  } catch (error) {
    console.log("Error in verifyEmail controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// resend verification code
export const resendVerificationCode = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Generate a new verification code
    const verificationCode = Math.floor(100000 + Math.random() * 900000);
    const verificationCodeCreatedAt = new Date(); // for timer of 15min

    user.verificationCode = verificationCode;
    user.verificationCodeCreatedAt = verificationCodeCreatedAt;
    await user.save();

    // Send the verification email
    await sendVerificationEmail(email, verificationCode);

    res.status(200).json({ message: "Verification code resent" });
  } catch (error) {
    console.log("Error in resendVerificationCode controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
