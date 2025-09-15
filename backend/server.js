const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const parentRoutes = require('./Routes/parentAuth');
const recordRoutes = require('./Routes/records');
const notificationRoutes = require('./Routes/notifications');
const psychiatristRoutes = require('./Routes/psychiatrist'); 
const studentRoutes = require('./Routes/student');


app.use('/api/parents', parentRoutes);
app.use('/api/records', recordRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/psychiatrist', psychiatristRoutes); 
app.use('/api/student', studentRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to Minds that Matter Backend ~inspired by Felix');
});


mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected successfully");

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => console.error("❌ MongoDB connection failed:", err));
