const mongoose = require("mongoose");

const standUpSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    date: Date,
    created_at: { type: Date, default: Date.now },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
    channel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Channel",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("StandUp", standUpSchema);
