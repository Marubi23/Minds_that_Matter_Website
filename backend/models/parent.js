const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const ParentSchema = new mongoose.Schema({
  name: { type: String, required: false }, // Optional, for dashboard display
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// 🔒 Hash the password before saving
ParentSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    return next(err);
  }
});

// ✅ Add method to compare passwords
ParentSchema.methods.matchPassword = function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('Parent', ParentSchema);
