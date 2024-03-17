const Announcement = require("../models/announcementModel");

// POST announcement
const postAnnouncement = async (req, res) => {
  try {
    // Your logic here
    res.status(201).json({ message: "Announcement created" });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

// GET all announcements
const getAllAnnouncements = async (req, res) => {
  try {
    const projectId = req.params.projectId;
    // Your logic here
    res
      .status(200)
      .json({ message: `All announcements for project ${projectId} fetched` });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

module.exports = {
  postAnnouncement,
  getAllAnnouncements,
};
