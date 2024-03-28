const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    status: {
      type: String,
      default: "pending",
    },
    priority: String,
    startDate: {
      type: Date,
      default: Date.now,
    },
    endDate: Date,
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Channel",
    },
    assigned_to: String,
    assigned_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    feedback: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
