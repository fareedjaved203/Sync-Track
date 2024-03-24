const mongoose = require("mongoose");

const timelineSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    startDate: { type: Date, default: Date.now },
    endDate: Date,
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Channel",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Timeline", timelineSchema);
