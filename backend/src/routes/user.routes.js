import { Router } from "express";
import {
  registerUser,
  loginUser,
  refreshAccessToken,
  logoutUser,
  verifyEmail,
} from "../controllers/auth.controller.js";

const router = Router();
router.route("/register").post(registerUser);
router.route("/verify-email").get(verifyEmail);
router.route("/login").post(loginUser);
router.route("/refresh").post(refreshAccessToken);
router.route("/logout").post(logoutUser);

export default router;
