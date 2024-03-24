const mongoose = require("mongoose");

const standUpSchema = new mongoose.Schema(
  {
    description: String,
    created_at: { type: Date, default: Date.now },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Channel",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("StandUp", standUpSchema);
