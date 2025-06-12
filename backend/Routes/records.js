const express = require('express');
const router = express.Router();
const Record = require('../models/Record');

router.post('/', async (req, res) => {
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

  // ✅ Basic required field validation
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
    });

    await newRecord.save();
    console.log('✅ Record saved to database.');
    res.status(201).json({ message: 'Record saved successfully' });
  } catch (err) {
    console.error('❌ Failed to save record:', err.message);
    res.status(400).json({ message: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const records = await Record.find().sort({ createdAt: -1 });
    res.json(records);
  } catch (err) {
    console.error('❌ Failed to fetch records:', err.message);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

