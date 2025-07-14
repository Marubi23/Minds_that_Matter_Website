const express = require('express');
const router = express.Router();
const Record = require('../models/Record');
const authParent = require('../middleware/authParent'); // 🔒 Make sure you have this

// 🔐 POST: Create a new record for the logged-in parent
router.post('/', authParent, async (req, res) => {
  console.log('📥 Incoming record submission:', req.body);

  const {
    name,
    age,
    gender,
    school,
    grade,
    contactNumber,
    emergencyContact,
    medicalConditions,
    additionalNotes,
  } = req.body;

  if (!name || !age || !gender || !school || !grade) {
    return res.status(400).json({
      message: 'Please fill all required fields: name, age, gender, school, and grade.',
    });
  }

  try {
    const newRecord = new Record({
      name,
      age,
      gender,
      school,
      grade,
      contactNumber,
      emergencyContact,
      medicalConditions,
      additionalNotes,
      parentId: req.parent._id, // ✅ Save this record under this parent
    });

    await newRecord.save();
    console.log('✅ Record saved to database.');
    res.status(201).json({ message: 'Record saved successfully' });
  } catch (err) {
    console.error('❌ Failed to save record:', err.message);
    res.status(400).json({ message: err.message });
  }
});

// 🔐 GET: Fetch only records belonging to the logged-in parent
router.get('/', authParent, async (req, res) => {
  try {
    const records = await Record.find({ parentId: req.parent._id }).sort({ createdAt: -1 });
    res.json(records);
  } catch (err) {
    console.error('❌ Failed to fetch records:', err.message);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
