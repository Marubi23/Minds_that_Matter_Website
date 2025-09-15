

const Notification = require('../models/Notification');


const createNotification = async (req, res) => {
  try {
    const { title, message, recipientRole } = req.body;

    const newNotification = new Notification({
      title,
      message,
      recipientRole, 
    });

    await newNotification.save();
    res.status(201).json({ success: true, notification: newNotification });
  } catch (error) {
    console.error('Create Notification Error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};


const getNotifications = async (req, res) => {
  try {
    const roleFilter = req.query.role; 
    const query = roleFilter ? { recipientRole: roleFilter } : {};

    const notifications = await Notification.find(query).sort({ createdAt: -1 });
    res.status(200).json({ success: true, notifications });
  } catch (error) {
    console.error('Fetch Notification Error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = {
  createNotification,
  getNotifications,
};
