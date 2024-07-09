import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import sendVerificationEmail from "../utils/sendVerificationEmail.js";

export const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Generate a new verification code
    const verificationCode = Math.floor(100000 + Math.random() * 900000);

    user.verificationCode = verificationCode;
    user.verificationCodeCreatedAt = new Date(); // Add this line
    await user.save();

    // Send the verification email
    await sendVerificationEmail(email, verificationCode);

    res.status(200).json({ message: "Verification code sent" });
  } catch (error) {
    console.log("Error in forgetPassword controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const verifyForgetPassword = async (req, res) => {
  try {
    const { email, verificationCode } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.verificationCode !== verificationCode) {
      return res.status(400).json({ error: "Invalid verification code" });
    }

    // Check if the verification code has expired (15 minutes)
    const currentTime = new Date();
    const timeDifference = (currentTime - user.verificationCodeCreatedAt) / 1000 / 60; // in minutes
    if (timeDifference > 15) {
      return res.status(400).json({ error: "Verification code has expired" });
    }

    user.verificationCode = undefined;
    user.verificationCodeCreatedAt = undefined;
    user.canResetPassword = true; // Add this line
    await user.save();

    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    console.log("Error in verifyForgetPassword controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!user.canResetPassword) {
      return res.status(400).json({ error: "Password reset not authorized" });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    user.canResetPassword = false; // Reset the flag
    await user.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.log("Error in changePassword controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
