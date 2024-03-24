const mongoose = require("mongoose");

const timelineSchema = new mongoose.Schema(
  {
    timelines: [
      {
        title: String,
        description: String,
        startDate: { type: Date, default: Date.now },
        endDate: Date,
      },
    ],
    timelineNumber: { type: Number, default: 1 },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Channel",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Timeline", timelineSchema);
