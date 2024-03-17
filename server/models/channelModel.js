const mongoose = require("mongoose");
const DEVELOPMENT_ROLES = require("../types/developmentRoles");

const channelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
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
          ],
          default: DEVELOPMENT_ROLES.PROJECT_MANAGER,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Channel", channelSchema);
