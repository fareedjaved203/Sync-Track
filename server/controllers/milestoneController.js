const ErrorHandler = require("../utils/errorHandler");

const Milestone = require("../models/milestoneModel");

const cloudinary = require("cloudinary");

// POST milestone
const postMilestone = async (req, res) => {
  try {
    // Your logic here
    res.status(201).json({ message: "Milestone created" });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

// GET all milestones
const getAllMilestones = async (req, res) => {
  try {
    const projectId = req.params.projectId;
    // Your logic here
    res
      .status(200)
      .json({ message: `All milestones for project ${projectId} fetched` });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

// GET single milestone
const getSingleMilestone = async (req, res) => {
  try {
    const id = req.params.id;
    // Your logic here
    res.status(200).json({ message: `Milestone ${id} fetched` });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

// DELETE milestone
const deleteMilestone = async (req, res) => {
  try {
    const id = req.params.id;
    // Your logic here
    res.status(200).json({ message: `Milestone ${id} deleted` });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

// PUT milestone
const updateMilestone = async (req, res) => {
  try {
    const id = req.params.id;
    // Your logic here
    res.status(200).json({ message: `Milestone ${id} updated` });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

module.exports = {
  updateMilestone,
  deleteMilestone,
  getAllMilestones,
  getSingleMilestone,
  postMilestone,
};
