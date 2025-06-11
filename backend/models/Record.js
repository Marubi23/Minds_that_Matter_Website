const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
  school: String,
  grade: String,
  contactNumber: String,
  emergencyContact: String,
  medicalConditions: String,
  additionalNotes: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Record', recordSchema);
