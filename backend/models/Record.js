const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  age: {
    type: Number,
    required: [true, 'Age is required'],
    min: [1, 'Age must be at least 1'],
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: [true, 'Gender is required'],
  },
  school: {
    type: String,
    required: [true, 'School is required'],
    trim: true,
  },
  grade: {
    type: String,
    required: [true, 'Grade is required'],
    trim: true,
  },
  contactNumber: {
    type: String,
    trim: true,
    default: '',
  },
  emergencyContact: {
    type: String,
    trim: true,
    default: '',
  },
  medicalConditions: {
    type: String,
    trim: true,
    default: '',
  },
  additionalNotes: {
    type: String,
    trim: true,
    default: '',
  },
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Parent',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Record', recordSchema);
