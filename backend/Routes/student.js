const express = require('express');
const router = express.Router();
const Record = require('../models/Record');

// Student login using PIN + Avatar
router.post('/login', async (req, res) => {
  const { pin, avatar } = req.body;
  if (!pin || !avatar) {
    return res.status(400).json({ message: 'Both PIN and avatar are required' });
  }

  try {
    // First check PIN
    const student = await Record.findOne({ pin });
    if (!student) {
      return res.status(404).json({ message: 'Invalid PIN. No student found.' });
    }

    // Then check Avatar
    if (student.avatar !== avatar) {
      return res.status(401).json({ message: 'Avatar does not match for this PIN.' });
    }

    // Success
    res.status(200).json({ message: 'Login successful', student });

  } catch (err) {
    console.error("❌ Login error:", err);
    res.status(500).json({ message: 'Server error. Please try again later.', error: err.message });
  }
});

module.exports = router;

