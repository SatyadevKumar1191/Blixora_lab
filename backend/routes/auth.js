import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { body } from "express-validator";
import validate from "../middleware/validate.js";
import User from "../models/User.js";
import { auth, adminOnly } from "../middleware/auth.js";

const router = express.Router();

// Existing register/login...

// ========================= ADMIN: GET ALL USERS =========================
router.get("/users", auth, adminOnly, async (req, res) => {
  try {
    const users = await User.find().select("-passwordHash"); // hide password
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

export default router;





