const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Parent = require('../models/parent.js');

// ✅ JWT Token Generator (now includes role)
const generateToken = (parent) => {
  return jwt.sign(
    {
      user: {
        _id: parent._id,
        role: 'parent',
      },
    },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};

// ✅ Register (Sign Up)
router.post('/register', async (req, res) => {
  const { email, password, name } = req.body;

  try {
    const existingParent = await Parent.findOne({ email });
    if (existingParent) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newParent = new Parent({ email, password: hashedPassword, name });
    await newParent.save();

    res.status(201).json({ message: 'Parent registered successfully' });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const parent = await Parent.findOne({ email });
    if (!parent) {
      return res.status(404).json({ message: 'Parent not found' });
    }

    const isMatch = await bcrypt.compare(password, parent.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // ✅ Updated to include role and _id
    const token = generateToken(parent);

    res.status(200).json({
      message: 'Login successful',
      token,
      parent: {
        _id: parent._id,
        email: parent.email,
        name: parent.name || '',
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
