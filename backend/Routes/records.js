// backend/Routes/records.js
const express = require("express");

const router = express.Router();
const { createClient } = require("@supabase/supabase-js");

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// ✅ Create new student record
router.post("/", async (req, res) => {
  try {
    const { fullName, age, gender, school, avatar, pin, parentId } = req.body;

    const { data, error } = await supabase
      .from("records") // Supabase table name
      .insert([
        {
          fullName,
          age,
          gender,
          school,
          avatar,
          pin,
          parentId: parentId || null,
          hasPaid: false, // default lock when student is created
          subscriptionExpiry: null,
          createdAt: new Date().toISOString(),
        },
      ]);

    if (error) throw error;

    res.status(201).json(data[0]);
  } catch (err) {
    console.error("❌ Error saving record:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ✅ Fetch all student records (optionally filter by parentId)
router.get("/", async (req, res) => {
  try {
    const { parentId } = req.query;

    let query = supabase.from("records").select("*");
    if (parentId) query = query.eq("parentId", parentId);

    const { data, error } = await query;
    if (error) throw error;

    res.json(data);
  } catch (err) {
    console.error("❌ Error fetching records:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ✅ Student login with subscription check
router.post("/login", async (req, res) => {
  try {
    const { avatar, pin } = req.body;

    if (!avatar || !pin) {
      return res.status(400).json({ message: "Avatar and PIN are required" });
    }

    const { data: student, error } = await supabase
      .from("records")
      .select("*")
      .eq("avatar", avatar)
      .eq("pin", pin)
      .single();

    if (error || !student) {
      return res.status(401).json({ message: "Invalid avatar or PIN" });
    }

    // 🚨 Subscription check
    if (!student.hasPaid) {
      return res.status(403).json({ message: "Subscription required before login" });
    }

    res.json({
      message: "Login successful",
      student: {
        id: student.id,
        fullName: student.fullName,
        avatar: student.avatar,
        school: student.school,
        hasPaid: student.hasPaid,
        subscriptionExpiry: student.subscriptionExpiry || null,
      },
    });
  } catch (err) {
    console.error("❌ Error during student login:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
