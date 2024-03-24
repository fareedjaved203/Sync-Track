const mongoose = require("mongoose");

const notificationsSchema = new mongoose.Schema(
  {
    type: {
      enum: ["reminder", "improvement", "approved", "disapproved"],
      type: String,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Channel",
    },
    description: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notifications", notificationsSchema);
