const ErrorHandler = require("../utils/errorHandler");

const Milestone = require("../models/milestoneModel");

const cloudinary = require("cloudinary");

// POST milestone
const postMilestone = async (req, res) => {
  try {
    const { project } = req.body;
    console.log(req.body);
    let projectTimeline = await Milestone.findOne({ project });

    if (projectTimeline) {
      projectTimeline.milestones.push({
        ...req.body,
        milestoneNumber: projectTimeline.milestoneNumber + 1,
      });
      projectTimeline.milestoneNumber++;
    } else {
      projectTimeline = new Milestone({
        project,
        milestones: [{ ...req.body }],
      });
    }

    await projectTimeline.save();
    res
      .status(201)
      .json({ success: true, message: "Milestone created", projectTimeline });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error.toString() });
  }
};

// GET single milestone
const getSingleMilestone = async (req, res) => {
  try {
    const id = req.params.id;
    const milestone = await Milestone.find({ project: id });
    console.log(milestone);
    if (milestone) {
      res
        .status(200)
        .json({ success: true, message: `milestone fetched`, milestone });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.toString() });
  }
};

// DELETE milestone
const deleteMilestone = async (req, res) => {
  try {
    const id = req.params.id;

    const milestone = await Milestone.findOneAndUpdate(
      { "milestones._id": id },
      { $pull: { milestones: { _id: id } } },
      { new: true }
    );

    if (!milestone) {
      return res
        .status(404)
        .json({ success: false, message: "milestone not found" });
    }

    res.status(200).json({ success: true, message: `milestone deleted` });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

// PUT milestone
const updateMilestone = async (req, res) => {
  try {
    const timelineId = req.params.id;
    const channelId = req.body.project;

    console.log(req.body);

    const updatedTimeline = await Milestone.findOneAndUpdate(
      { "milestones._id": timelineId, project: channelId },
      { $set: { "milestones.$": req.body } },
      { new: true }
    );

    if (!updatedTimeline) {
      return res
        .status(404)
        .json({ success: false, message: "Milestone not found" });
    }

    res.status(200).json({
      success: true,
      message: "Milestone updated successfully",
      timeline: updatedTimeline,
    });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

module.exports = {
  updateMilestone,
  deleteMilestone,
  getSingleMilestone,
  postMilestone,
};
