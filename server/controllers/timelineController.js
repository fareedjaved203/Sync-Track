const ErrorHandler = require("../utils/errorHandler");

const Timeline = require("../models/timelineModel");

// POST timeline
const postTimeline = async (req, res) => {
  try {
    // Your logic here
    res.status(201).json({ message: "Timeline created" });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

// GET timeline
const getTimeline = async (req, res) => {
  try {
    const id = req.params.id;
    // Your logic here
    res.status(200).json({ message: `Timeline ${id} fetched` });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

// DELETE timeline
const deleteTimeline = async (req, res) => {
  try {
    const id = req.params.id;
    // Your logic here
    res.status(200).json({ message: `Timeline ${id} deleted` });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

// PUT timeline
const updateTimeline = async (req, res) => {
  try {
    const id = req.params.id;
    // Your logic here
    res.status(200).json({ message: `Timeline ${id} updated` });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

module.exports = {
  updateTimeline,
  deleteTimeline,
  getTimeline,
  postTimeline,
};
