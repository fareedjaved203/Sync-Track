const ErrorHandler = require("../utils/errorHandler");

const Task = require("../models/taskModel");

const cloudinary = require("cloudinary");

// POST task
const postTask = async (req, res) => {
  try {
    // Your logic here
    res.status(201).json({ message: "Task created" });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

// GET single task
const getSingleTask = async (req, res) => {
  try {
    const id = req.params.id;
    // Your logic here
    res.status(200).json({ message: `Task ${id} fetched` });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

// GET all tasks
const getAllTasks = async (req, res) => {
  try {
    // Your logic here
    res.status(200).json({ message: "All tasks fetched" });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

// DELETE task
const deleteTask = async (req, res) => {
  try {
    const id = req.params.id;
    // Your logic here
    res.status(200).json({ message: `Task ${id} deleted` });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

// PUT task
const updateTask = async (req, res) => {
  try {
    const id = req.params.id;
    // Your logic here
    res.status(200).json({ message: `Task ${id} updated` });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

module.exports = {
  updateTask,
  deleteTask,
  getAllTasks,
  getSingleTask,
  postTask,
};
