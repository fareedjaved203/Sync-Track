const ErrorHandler = require("../utils/errorHandler");

const StandUp = require("../models/standUpModel");

// POST standup
const postStandUp = async (req, res) => {
  try {
    const standup = await StandUp.create({
      ...req.body,
    });
    if (standup) {
      res.status(201).json({ success: true, message: "Standup created" });
    }
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

// GET all standups
const getAllStandUps = async (req, res) => {
  try {
    const projectId = req.params.projectId;
    const standup = await StandUp.find({ project: projectId });

    if (standup) {
      res.status(200).json({
        success: true,
        message: `All standups for project fetched`,
        standup,
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

module.exports = {
  getAllStandUps,
  postStandUp,
};
