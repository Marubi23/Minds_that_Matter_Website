// backend/Routes/notifications.js

const express = require('express');
const router = express.Router();
const Notification = require('../Models/Notification'); // adjust path if needed

// GET all psychiatrist notifications
router.get("/notifications", async (req, res) => {
  const notifications = await Notification.find({ role: "psychiatrist" }).sort({ createdAt: -1 });
  res.json(notifications);
});

// PATCH mark one as read
router.patch("/notifications/:id/read", async (req, res) => {
  await Notification.findByIdAndUpdate(req.params.id, { read: true });
  res.sendStatus(204);
});

module.exports = router;
