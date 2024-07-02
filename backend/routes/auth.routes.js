import express from "express";
import { login, logout, signup, verifyEmail, resendVerificationCode } from "../controllers/auth.controller.js";
import { forgetPassword, verifyForgetPassword, changePassword } from "../controllers/forgetPassword.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/verify-email", verifyEmail);
router.post("/resend-verification", resendVerificationCode);

router.post("/forget-password", forgetPassword);
router.post("/verify-forget-password", verifyForgetPassword);
router.post("/change-password", changePassword);

router.post("/login", login);

router.post("/logout", logout);

export default router;
