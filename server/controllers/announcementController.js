const Announcement = require("../models/announcementsModel");

// POST announcement
const postAnnouncement = async (req, res) => {
  try {
    const data = await Announcement.create({
      ...req.body,
    });
    if (data) {
      res.status(201).json({ success: true, message: "Announcement created" });
    }
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

// GET all announcements
const getAllAnnouncements = async (req, res) => {
  try {
    const projectId = req.params.id;
    const data = await Announcement.find({ project: projectId });
    if (data) {
      res.status(200).json({ message: `All announcements fetched`, data });
    }
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

// GET all announcements
const deleteAnnouncement = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Announcement.findByIdAndDelete(id);
    if (data) {
      res.status(200).json({ success: true, message: `Announcement Deleted` });
    }
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

module.exports = {
  postAnnouncement,
  getAllAnnouncements,
  deleteAnnouncement,
};
