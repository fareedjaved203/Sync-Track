const ErrorHandler = require("../utils/errorHandler");

const Task = require("../models/taskModel");

const User = require("../models/userModel");

// POST task
const postTask = async (req, res) => {
  try {
    console.log(req.body);
    const task = await Task.create({
      ...req.body,
    });
    res.status(201).json({ success: true, message: "Task created" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.toString() });
  }
};

// GET single task
const getAssignedTask = async (req, res) => {
  try {
    console.log(req.user);
    const user = await User.findById(req.user.id);
    const tasks = await Task.find({
      assigned_to: user.email,
      project: req.params.channelId,
    });
    res.status(200).json({ success: true, message: "tasks fetched", tasks });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

// GET all tasks
const getAllTasks = async (req, res) => {
  try {
    // Assuming Task is your mongoose model
    const tasks = await Task.find({ project: req.params.id });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

// DELETE task
const deleteTask = async (req, res) => {
  try {
    const id = req.params.id;
    const task = await Task.findByIdAndDelete(id);
    if (task) {
      res.status(200).json({ success: true, message: `Task deleted` });
    }
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

// PUT task
const updateTask = async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const updatedData = req.body;

    const task = await Task.findByIdAndUpdate(taskId, updatedData, {
      new: true,
    });

    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: `Task not found` });
    }

    res.status(200).json({ success: true, message: `Task updated`, task });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

module.exports = {
  updateTask,
  deleteTask,
  getAllTasks,
  getAssignedTask,
  postTask,
};
