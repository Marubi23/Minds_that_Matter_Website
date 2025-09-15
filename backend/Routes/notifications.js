// backend/Routes/notifications.js

const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification.js'); 

router.get("/notifications", async (req, res) => {
  const notifications = await Notification.find({ role: "psychiatrist" }).sort({ createdAt: -1 });
  res.json(notifications);
});

router.patch("/notifications/:id/read", async (req, res) => {
  await Notification.findByIdAndUpdate(req.params.id, { read: true });
  res.sendStatus(204);
});

module.exports = router;
