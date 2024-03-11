const mongoose = require("mongoose");

const channelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    role: "Project Manager",
  },
  { timestamps: true }
);

module.exports = mongoose.model("Channel", channelSchema);
