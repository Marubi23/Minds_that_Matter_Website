const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// =====================
// 🔧 Middleware
// =====================
app.use(cors());
app.use(express.json());

// =====================
// 📦 Import Routes
// =====================
const parentRoutes = require('./Routes/parentAuth');
const recordRoutes = require('./Routes/records');
const notificationRoutes = require('./Routes/notifications');
const psychiatristRoutes = require('./Routes/psychiatrist'); // ✅ Psychiatrist login route

// =====================
// 🚦 Route Usage
// =====================
app.use('/api/parents', parentRoutes);
app.use('/api/records', recordRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/psychiatrist', psychiatristRoutes); // ✅ Mount psychiatrist route

// =====================
// 🌐 Root Route
// =====================
app.get('/', (req, res) => {
  res.send('Welcome to Minds that Matter Backend ~inspired by Felix');
});

// =====================
// 🔗 MongoDB Connection
// =====================
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected successfully");

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => console.error("❌ MongoDB connection failed:", err));
