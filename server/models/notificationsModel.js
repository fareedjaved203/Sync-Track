const mongoose = require("mongoose");

const notificationsSchema = new mongoose.Schema(
  {
    type: {
      enum: [
        "reminder",
        "improvement",
        "approved",
        "disapproved",
        "deletion",
        "information",
      ],
      type: String,
    },
    sender: String,
    receiver: String,
    project: String,
    description: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notifications", notificationsSchema);
