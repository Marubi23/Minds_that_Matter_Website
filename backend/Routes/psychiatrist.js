const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Psychiatrist = require('../models/Psychiatrist'); 

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log('📨 Incoming login:', email);

    const user = await Psychiatrist.findOne({ email }); 
    if (!user) {
      console.log('❌ No psychiatrist found');
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log('🔐 Password match:', isMatch);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { id: user._id, role: 'psychiatrist' },
      process.env.JWT_SECRET || 'default_secret', 
      { expiresIn: '7d' }
    );

    res.json({ token, name: user.name });
  } catch (err) {
    console.error('💥 Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

