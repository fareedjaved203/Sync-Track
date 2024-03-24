const mongoose = require("mongoose");

const announcementSchema = new mongoose.Schema(
  {
    description: String,
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Channel",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Announcement", announcementSchema);
