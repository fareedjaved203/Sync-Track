const mongoose = require("mongoose");

const standUpSchema = new mongoose.Schema(
  {
    description: String,
    date: { type: Date, default: Date.now },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Channel",
    },
    user: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("StandUp", standUpSchema);
