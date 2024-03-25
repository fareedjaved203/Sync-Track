const mongoose = require("mongoose");

const announcementSchema = new mongoose.Schema(
  {
    description: String,
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Channel",
    },
    user: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Announcement", announcementSchema);
