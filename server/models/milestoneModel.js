const mongoose = require("mongoose");

const milestoneSchema = new mongoose.Schema(
  {
    milestones: [
      {
        title: String,
        description: String,
        startDate: { type: Date, default: Date.now },
        endDate: Date,
      },
    ],
    milestoneNumber: { type: Number, default: 1 },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Channel",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Milestone", milestoneSchema);
