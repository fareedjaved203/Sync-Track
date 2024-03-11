const express = require("express");
const {
  postTimeline,
  deleteTimeline,
  updateTimeline,
  getSingleTimeline,
} = require("../controllers/userController");

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

const router = express.Router();

router.post("/timeline", isAuthenticatedUser, postTask);
router.get("/timeline/:id", isAuthenticatedUser, getSingleTask);
router.delete("/timeline/:id", isAuthenticatedUser, deleteTask);
router.put("/timeline/:id", isAuthenticatedUser, updateTask);

module.exports = router;
