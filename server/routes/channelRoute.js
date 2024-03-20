const express = require("express");
const {
  postChannel,
  deleteChannel,
  updateChannel,
  myChannels,
  myChannel,
  addUser,
} = require("../controllers/channelController");

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

const router = express.Router();

router.post("/channel", isAuthenticatedUser, postChannel);
router.get("/channel", isAuthenticatedUser, myChannels);
router.get("/channel/:id", isAuthenticatedUser, myChannel);
router.delete("/channel/:id", isAuthenticatedUser, deleteChannel);
router.put("/channel/:id", isAuthenticatedUser, updateChannel);
router.put("/channel/add-user/:channelId", isAuthenticatedUser, addUser);

module.exports = router;
