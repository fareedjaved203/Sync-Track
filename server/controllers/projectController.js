const ErrorHandler = require("../utils/errorHandler");

const Project = require("../models/projectModel");

const cloudinary = require("cloudinary");

// POST project
const postProject = async (req, res) => {
  try {
    // Your logic here
    res.status(201).json({ message: "Project created" });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

// GET project
const getProject = async (req, res) => {
  try {
    const id = req.params.id;
    // Your logic here
    res.status(200).json({ message: `Project ${id} fetched` });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

// DELETE project
const deleteProject = async (req, res) => {
  try {
    const id = req.params.id;
    // Your logic here
    res.status(200).json({ message: `Project ${id} deleted` });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

// PUT project
const updateProject = async (req, res) => {
  try {
    const id = req.params.id;
    // Your logic here
    res.status(200).json({ message: `Project ${id} updated` });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

module.exports = {
  updateProject,
  deleteProject,
  getProject,
  postProject,
};
