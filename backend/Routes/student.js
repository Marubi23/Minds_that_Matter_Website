// student.js
import express from "express";
import { supabase } from "../supabaseClient.js";

const router = express.Router();

// Student login with PIN + Avatar
router.post("/login", async (req, res) => {
  const { pin, avatar } = req.body;
  if (!pin || !avatar) return res.status(400).json({ message: "Both PIN and avatar are required" });

  try {
    const { data: student, error } = await supabase
      .from("records")
      .select("*")
      .eq("pin", pin)
      .single();

    if (!student || error) return res.status(404).json({ message: "Invalid PIN. No student found." });

    if (student.avatar !== avatar) return res.status(401).json({ message: "Avatar does not match for this PIN." });

    res.status(200).json({ message: "Login successful", student });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

export default router;
