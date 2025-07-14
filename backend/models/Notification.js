const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  type: String,
  title: String,
  message: String,
  studentId: String,
  role: String, // psychiatrist, parent, etc.
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Notification", notificationSchema);
