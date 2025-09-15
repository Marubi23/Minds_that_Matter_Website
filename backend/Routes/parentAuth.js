const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Parent = require('../models/parent');

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// Parent Registration
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Email and password required' });

  try {
    const existing = await Parent.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Parent already exists' });

    const parent = new Parent({ name, email, password });
    await parent.save();

    res.status(201).json({
      message: 'Parent registered successfully',
      parent: { id: parent._id, name: parent.name, email: parent.email },
      token: generateToken(parent._id)
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Parent Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Email and password required' });

  try {
    const parent = await Parent.findOne({ email });
    if (!parent) return res.status(400).json({ message: 'Parent not found' });

    const isMatch = await parent.matchPassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    res.status(200).json({
      message: 'Login successful',
      parent: { id: parent._id, name: parent.name, email: parent.email },
      token: generateToken(parent._id)
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;

