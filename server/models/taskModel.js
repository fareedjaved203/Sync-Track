const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    status: String,
    priority: String,
    startDate: {
      type: Date,
      default: Date.now,
    },
    endDate: Date,
    milestone: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Milestone",
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Channel",
    },
    assigned_to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    assigned_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    feedback: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
