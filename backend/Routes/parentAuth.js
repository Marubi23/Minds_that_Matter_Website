// parentAuth.js
import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { supabase } from "../supabaseClient.js";

const router = express.Router();

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

// Register Parent
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: "Email and password required" });

  try {
    // Check if parent exists
    const { data: existing } = await supabase
      .from("parents")
      .select("*")
      .eq("email", email)
      .single();

    if (existing) return res.status(400).json({ message: "Parent already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const { data, error } = await supabase
      .from("parents")
      .insert([{ name, email, password: hashedPassword }])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({
      message: "Parent registered successfully",
      parent: { id: data.id, name: data.name, email: data.email },
      token: generateToken(data.id),
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Login Parent
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: "Email and password required" });

  try {
    const { data: parent, error } = await supabase
      .from("parents")
      .select("*")
      .eq("email", email)
      .single();

    if (!parent || error) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, parent.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    res.status(200).json({
      message: "Login successful",
      parent: { id: parent.id, name: parent.name, email: parent.email },
      token: generateToken(parent.id),
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

export default router;
