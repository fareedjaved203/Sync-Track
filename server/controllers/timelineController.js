const ErrorHandler = require("../utils/errorHandler");

const Timeline = require("../models/timelineModel");

// POST timeline
const postTimeline = async (req, res) => {
  try {
    const { project } = req.body;
    let projectTimeline = await Timeline.findOne({ project });

    if (projectTimeline) {
      projectTimeline.timelines.push({
        ...req.body,
        timelineNumber: projectTimeline.timelineNumber + 1,
      });
      projectTimeline.timelineNumber++;
    } else {
      projectTimeline = new Timeline({
        project,
        timelines: [{ ...req.body }],
      });
    }

    await projectTimeline.save();
    res
      .status(201)
      .json({ success: true, message: "Timeline created", projectTimeline });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error.toString() });
  }
};

// GET timeline
const getTimeline = async (req, res) => {
  try {
    const id = req.params.id;
    const timeline = await Timeline.find({ project: id });
    if (timeline) {
      res
        .status(200)
        .json({ success: true, message: `Timeline fetched`, timeline });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.toString() });
  }
};

// DELETE timeline
const deleteTimeline = async (req, res) => {
  try {
    const id = req.params.id;

    const timeline = await Timeline.findOneAndUpdate(
      { "timelines._id": id },
      { $pull: { timelines: { _id: id } } },
      { new: true }
    );

    if (!timeline) {
      return res
        .status(404)
        .json({ success: false, message: "Timeline not found" });
    }

    res.status(200).json({ success: true, message: `Timeline deleted` });
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
