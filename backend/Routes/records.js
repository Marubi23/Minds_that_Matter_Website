const express = require("express");
const router = express.Router();
const Record = require("../models/Record");

// ✅ Create new student record
router.post("/", async (req, res) => {
  try {
    const { fullName, age, gender, school, avatar, pin, parentId } = req.body;

    const newRecord = new Record({
      fullName,
      age,
      gender,
      school,
      avatar,
      pin,
      parentId: parentId || null,
      hasPaid: false, // default lock when student is created
    });

    await newRecord.save();
    res.status(201).json(newRecord);
  } catch (err) {
    console.error("❌ Error saving record:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ✅ Fetch all student records (optionally filter by parentId)
router.get("/", async (req, res) => {
  try {
    const { parentId } = req.query;
    const query = parentId ? { parentId } : {};
    const records = await Record.find(query);
    res.json(records);
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

    const student = await Record.findOne({ avatar, pin });

    if (!student) {
      return res.status(401).json({ message: "Invalid avatar or PIN" });
    }

    // 🚨 Subscription check
    if (!student.hasPaid) {
      return res.status(403).json({ message: "Subscription required before login" });
    }

    res.json({
      message: "Login successful",
      student: {
        id: student._id,
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
