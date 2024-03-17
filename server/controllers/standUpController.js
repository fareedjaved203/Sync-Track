const ErrorHandler = require("../utils/errorHandler");

const StandUp = require("../models/standUpModel");

const cloudinary = require("cloudinary");

// POST standup
const postStandUp = async (req, res) => {
  try {
    // Your logic here
    res.status(201).json({ message: "Standup created" });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

// GET single user standups
const getSingleUserStandUps = async (req, res) => {
  try {
    const projectId = req.params.projectId;
    const userId = req.params.userId;
    // Your logic here
    res.status(200).json({
      message: `Standups for user ${userId} in project ${projectId} fetched`,
    });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

// GET all standups
const getAllStandUps = async (req, res) => {
  try {
    const projectId = req.params.projectId;
    // Your logic here
    res
      .status(200)
      .json({ message: `All standups for project ${projectId} fetched` });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

// DELETE standup
const deleteStandUp = async (req, res) => {
  try {
    const id = req.params.id;
    // Your logic here
    res.status(200).json({ message: `Standup ${id} deleted` });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

// PUT standup
const updateStandUp = async (req, res) => {
  try {
    const id = req.params.id;
    // Your logic here
    res.status(200).json({ message: `Standup ${id} updated` });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

module.exports = {
  updateStandUp,
  deleteStandUp,
  getAllStandUps,
  postStandUp,
  getSingleUserStandUps,
};
