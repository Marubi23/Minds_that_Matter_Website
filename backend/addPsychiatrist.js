require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Psychiatrist = require('./models/Psychiatrist');

const addPsychiatrist = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  // Hash the password before saving
  const hashedPassword = await bcrypt.hash('felo2305', 10);

  const psychiatrist = new Psychiatrist({
    name: 'Dr. Felix',
    email: 'felixmarubi@gmail.com',
    password: hashedPassword,
  });

  await psychiatrist.save();
  console.log('✅ Psychiatrist added');
  mongoose.disconnect();
};

addPsychiatrist();
