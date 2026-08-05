import User from "../models/User.model.js";
import jwt from "jsonwebtoken";

// Cookie options for refresh token
const cookieOptions = {
  httpOnly: true, // Prevents JavaScript access (XSS protection)
  secure: process.env.NODE_ENV === "production", // HTTPS only in production
  sameSite: "strict", // CSRF protection
  maxAge: 10 * 24 * 60 * 60 * 1000, // 10 days in milliseconds
};

export const registerUser = async (req, res) => {
  try {
    console.log("Register User called");
    const { username, email, password, role } = req.body;

    console.log(req.body);

    const emailToCheck = (email || "").toLowerCase().trim();
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailToCheck);
    if (!validEmail) {
      return res.status(400).json({ message: "Please enter a valid email" });
    }

    const emailExist = await User.findOne({ email });
    if (emailExist) {
      return res.status(400).json({ message: "User already exists" });
    }
    const usernameExist = await User.findOne({ username });
    if (usernameExist) {
      return res.status(400).json({ message: "Username already taken" });
    }
    const user = await User.create({ username, email, password, role });

    // Generate both tokens
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    // Save refresh token to database
    user.refreshToken = refreshToken;
    await user.save();

    // Set refresh token in HTTPOnly cookie
    res.cookie("refreshToken", refreshToken, cookieOptions);

    res.status(201).json({
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      token: accessToken,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const loginUser = async (req, res) => {
  try {
    console.log("Login User called");
    const { username, password } = req.body;
    console.log(req.body);

    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: "User does not exist" });
    console.log(user.username, user.password);

    const isMatch = await user.isPasswordCorrect(password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    // Generate both tokens
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    // Save new refresh token to database
    user.refreshToken = refreshToken;
    await user.save();

    // Set refresh token in HTTPOnly cookie
    res.cookie("refreshToken", refreshToken, cookieOptions);

    res.json({
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      token: accessToken,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const refreshAccessToken = async (req, res) => {
  try {
    const incomingRefreshToken = req.cookies.refreshToken;

    if (!incomingRefreshToken) {
      return res.status(401).json({ message: "Refresh token not found" });
    }

    // Verify refresh token
    const decoded = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET,
    );

    // Find user and check if refresh token matches database
    const user = await User.findById(decoded.id);
    if (!user || user.refreshToken !== incomingRefreshToken) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    // Generate new access token
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

    // Find user and clear refresh token from database
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    await User.findByIdAndUpdate(decoded.id, {
      refreshToken: null,
    });

    // Clear cookie
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.json({ message: "Logged out successfully" });
  } catch (error) {
    // Clear cookie anyway
    res.clearCookie("refreshToken");
    res.json({ message: "Logged out" });
  }
};
