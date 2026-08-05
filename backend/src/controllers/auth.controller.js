import User from "../models/User.model.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { sendVerificationEmail } from "../utils/email.service.js";

const MAX_USERS_LIMIT = parseInt(process.env.MAX_USERS_LIMIT || "2", 10);

// Cookie options for refresh token
const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: 10 * 24 * 60 * 60 * 1000, // 10 days
};

export const registerUser = async (req, res) => {
  try {
    console.log("Register User called");
    const { username, email, password, role } = req.body;

    // Enforce 2-Account System Limit (Counting verified users + active registrations)
    const activeUserCount = await User.countDocuments({
      $or: [
        { isVerified: true },
        { verificationTokenExpires: { $gt: new Date() } }
      ]
    });

    if (activeUserCount >= MAX_USERS_LIMIT) {
      return res.status(400).json({
        message: `System user limit reached. A maximum of ${MAX_USERS_LIMIT} accounts are allowed.`,
      });
    }

    const emailToCheck = (email || "").toLowerCase().trim();
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailToCheck);
    if (!validEmail) {
      return res.status(400).json({ message: "Please enter a valid email" });
    }

    if (!password || password.length < 8) {
      return res.status(400).json({ message: "Password must be at least 8 characters long" });
    }

    const emailExist = await User.findOne({ email: emailToCheck });
    if (emailExist) {
      if (emailExist.isVerified) {
        return res.status(400).json({ message: "User with this email already exists" });
      } else {
        // Clean up expired unverified attempt if present
        await User.deleteOne({ _id: emailExist._id });
      }
    }

    const usernameExist = await User.findOne({ username: username.toLowerCase() });
    if (usernameExist) {
      if (usernameExist.isVerified) {
        return res.status(400).json({ message: "Username already taken" });
      } else {
        await User.deleteOne({ _id: usernameExist._id });
      }
    }

    // Generate secure 64-char crypto token expiring in 1 hour
    const verificationToken = crypto.randomBytes(32).toString("hex");
    const verificationTokenExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    const user = await User.create({
      username,
      email: emailToCheck,
      password,
      role: role || "user",
      isVerified: false,
      verificationToken,
      verificationTokenExpires,
    });

    // Send Verification Email
    await sendVerificationEmail(user.email, user.username, verificationToken);

    res.status(201).json({
      message: "Registration submitted! We have sent a verification link to your email address. Please click the link within 1 hour to activate your account.",
      email: user.email,
    });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ message: "Server error during registration" });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;

    if (!token) {
      return res.status(400).json({ message: "Verification token is required" });
    }

    // Find user matching token
    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return res.status(400).json({
        message: "Invalid verification link or account has already been processed.",
      });
    }

    // Check if token has expired
    if (user.verificationTokenExpires < new Date()) {
      // Discard unverified account to free up username/email
      await User.deleteOne({ _id: user._id });
      return res.status(400).json({
        message: "Verification link has expired. Your signup request was discarded. Please sign up again.",
      });
    }

    // Double check account limit before finalizing
    const verifiedCount = await User.countDocuments({ isVerified: true });
    if (verifiedCount >= MAX_USERS_LIMIT) {
      await User.deleteOne({ _id: user._id });
      return res.status(400).json({
        message: `System limit reached (${MAX_USERS_LIMIT} verified users). Registration could not be completed.`,
      });
    }

    // Mark user as verified and clear token
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpires = undefined;
    await user.save();

    res.status(200).json({
      message: "Email verified successfully! Your account is now active. You can log in.",
    });
  } catch (error) {
    console.error("Verify Email Error:", error);
    res.status(500).json({ message: "Server error verifying email" });
  }
};

export const loginUser = async (req, res) => {
  try {
    console.log("Login User called");
    const { username, password } = req.body;

    const user = await User.findOne({ username: (username || "").toLowerCase() });
    if (!user) return res.status(404).json({ message: "User does not exist" });

    if (!user.isVerified) {
      return res.status(403).json({
        message: "Your email has not been verified yet. Please check your inbox for the verification link.",
      });
    }

    const isMatch = await user.isPasswordCorrect(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate both tokens
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save();

    res.cookie("refreshToken", refreshToken, cookieOptions);

    res.json({
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      token: accessToken,
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ message: "Server error during login" });
  }
};

export const refreshAccessToken = async (req, res) => {
  try {
    const incomingRefreshToken = req.cookies.refreshToken;

    if (!incomingRefreshToken) {
      return res.status(401).json({ message: "Refresh token not found" });
    }

    const decoded = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET,
    );

    const user = await User.findById(decoded.id);
    if (!user || user.refreshToken !== incomingRefreshToken || !user.isVerified) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    const accessToken = user.generateAccessToken();

    res.json({
      token: accessToken,
    });
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Invalid or expired refresh token" });
  }
};

export const logoutUser = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(200).json({ message: "Already logged out" });
    }

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    await User.findByIdAndUpdate(decoded.id, {
      refreshToken: null,
    });

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.json({ message: "Logged out successfully" });
  } catch (error) {
    res.clearCookie("refreshToken");
    res.json({ message: "Logged out" });
  }
};
