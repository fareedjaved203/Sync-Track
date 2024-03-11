const express = require("express");
const {
  postChannel,
  deleteChannel,
  updateChannel,
  getSingleChannel,
  getAllChannels,
} = require("../controllers/userController");

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

const router = express.Router();

router.post("/channel", isAuthenticatedUser, postChannel);
router.get("/channel/:id", isAuthenticatedUser, getSingleChannel);
router.get("/channel", isAuthenticatedUser, getAllChannels);
router.delete("/channel/:id", isAuthenticatedUser, deleteChannel);
router.put("/channel/:id", isAuthenticatedUser, updateChannel);

module.exports = router;
