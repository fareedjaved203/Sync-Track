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
    console.log(timeline);
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
    const timelineId = req.params.id;
    const channelId = req.body.project;

    const updatedTimeline = await Timeline.findOneAndUpdate(
      { "timelines._id": timelineId, project: channelId },
      { $set: { "timelines.$": req.body } },
      { new: true }
    );

    if (!updatedTimeline) {
      return res
        .status(404)
        .json({ success: false, message: "Timeline not found" });
    }

    res.status(200).json({
      success: true,
      message: "Timeline updated successfully",
      timeline: updatedTimeline,
    });
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
