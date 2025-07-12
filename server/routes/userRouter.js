import express from "express";
import {
  register,
  verifyOTP,
  login,
  logout,
  getUser,
  forgotPassword,
  resetPassword,
  updateProfile,
  sendOtpForUpdate,
  verifyOtpForUpdate,
  updatePassword,
  getUserDashboard,
  getUserUploadedItems,
  getUserSwaps,
} from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { upload } from "../config/multerConfig.js";

const router = express.Router();

// Auth routes
router.post("/register", register);
router.post("/otp-verification", verifyOTP);
router.post("/login", login);
router.get("/logout", isAuthenticated, logout);
router.get("/me", isAuthenticated, getUser);

// Password & profile
router.post("/password/forgot", forgotPassword);
router.put("/password/reset/:token", resetPassword);
router.put("/me/update", isAuthenticated, upload.single("avatar"), updateProfile);
router.post("/send-otp-for-update", isAuthenticated, sendOtpForUpdate);
router.post("/verify-otp-for-update", isAuthenticated, verifyOtpForUpdate);
router.put("/password/update", isAuthenticated, updatePassword);

// ✅ Dashboard-related routes
router.get("/dashboard", isAuthenticated, getUserDashboard);
router.get("/uploaded-items", isAuthenticated, getUserUploadedItems);
router.get("/swaps", isAuthenticated, getUserSwaps);

export default router;
