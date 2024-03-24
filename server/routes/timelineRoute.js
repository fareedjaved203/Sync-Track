const express = require("express");
const {
  postTimeline,
  deleteTimeline,
  updateTimeline,
  getTimeline,
} = require("../controllers/timelineController");

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

const router = express.Router();

router.post("/timeline", isAuthenticatedUser, postTimeline);
router.get("/timeline/:id", isAuthenticatedUser, getTimeline);
router.delete("/timeline/:id", isAuthenticatedUser, deleteTimeline);
router.put("/timeline/:id", isAuthenticatedUser, updateTimeline);

module.exports = router;
