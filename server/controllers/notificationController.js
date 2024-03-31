const Notification = require("../models/notificationsModel");

const postNotifications = async (req, res) => {
  try {
    const data = await Notification.create({
      ...req.body,
    });
    if (data) {
      res.status(201).json({ success: true, message: "Notification saved" });
    }
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

const getAllNotifications = async (req, res) => {
  try {
    const data = await Notification.find({
      $or: [{ receiver: req.params.email }, { receiver: req.user.id }],
    });
    if (data) {
      res.status(200).json({ message: `All Notifications fetched`, data });
    }
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

module.exports = {
  postNotifications,
  getAllNotifications,
};
