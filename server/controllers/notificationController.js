const Notification = require("../models/notficationsModel");

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
      project: req.params.channel,
      receiver: req.params.email,
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
