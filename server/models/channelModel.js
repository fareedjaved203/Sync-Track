const mongoose = require("mongoose");
const DEVELOPMENT_ROLES = require("../types/developmentRoles");

const channelSchema = new mongoose.Schema(
  {
    channel: {
      type: String,
      unique: true,
      required: true,
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    name: String,
    description: String,
    startDate: String,
    endDate: String,
    users: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        role: {
          type: String,
          enum: [
            DEVELOPMENT_ROLES.PROJECT_MANAGER,
            DEVELOPMENT_ROLES.DEVELOPER,
            DEVELOPMENT_ROLES.TEAM_LEAD,
            DEVELOPMENT_ROLES.TESTER,
            "team_lead",
          ],
          default: DEVELOPMENT_ROLES.PROJECT_MANAGER,
        },
        status: {
          enum: ["working", "approved", "disapproved", "rejected"],
          type: String,
          default: "working",
        },
        request: {
          enum: ["pending", "approved", "declined", "accepted", "rejected"],
          type: String,
          default: "pending",
        },
        rating: String,
        feedback: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Channel", channelSchema);
