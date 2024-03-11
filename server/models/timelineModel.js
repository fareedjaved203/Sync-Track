const mongoose = require("mongoose");

const timelineSchema = new mongoose.Schema(
  {
    event: String,
    date: Date,
    description: String,
    created_at: { type: Date, default: Date.now },
    milestone: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Milestone",
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Timeline", timelineSchema);
