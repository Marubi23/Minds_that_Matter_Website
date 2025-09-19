// notifications.js
import express from "express";
import { supabase } from "../supabaseClient.js";

const router = express.Router();

// Get notifications for psychiatrist
router.get("/", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("notifications")
      .select("*")
      .eq("role", "psychiatrist")
      .order("createdAt", { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Mark notification as read
router.patch("/:id/read", async (req, res) => {
  const { id } = req.params;
  try {
    const { error } = await supabase
      .from("notifications")
      .update({ read: true })
      .eq("id", id);

    if (error) throw error;
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

export default router;

