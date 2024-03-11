const mongoose = require("mongoose");

const milestoneSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    startDate: { type: Date, default: Date.now },
    endDate: Date,
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Milestone", milestoneSchema);
