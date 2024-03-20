const mongoose = require("mongoose");

const notificationsSchema = new mongoose.Schema(
  {
    type: {
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
    description: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notifications", notificationsSchema);
