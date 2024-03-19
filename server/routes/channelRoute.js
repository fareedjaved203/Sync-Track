const express = require("express");
const {
  postChannel,
  deleteChannel,
  updateChannel,
  myChannels,
  myChannel,
} = require("../controllers/channelController");

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

const router = express.Router();

router.post("/channel", isAuthenticatedUser, postChannel);
router.get("/channel", isAuthenticatedUser, myChannels);
router.get("/channel/:id", isAuthenticatedUser, myChannels);
router.delete("/channel/:id", isAuthenticatedUser, deleteChannel);
router.put("/channel/:id", isAuthenticatedUser, updateChannel);

module.exports = router;
