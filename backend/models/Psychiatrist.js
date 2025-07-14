// models/Psychiatrist.js

const mongoose = require('mongoose');

const psychiatristSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

const Psychiatrist = mongoose.model('Psychiatrist', psychiatristSchema);

module.exports = Psychiatrist;
