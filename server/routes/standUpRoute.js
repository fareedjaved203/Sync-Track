const express = require("express");
const {
  postStandUp,
  deleteStandUp,
  updateStandUp,
  getSingleUserStandUps,
} = require("../controllers/userController");

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

const router = express.Router();

router.post("/standup", isAuthenticatedUser, postStandUp);
router.get(
  "/standup/:projectId/:userId",
  isAuthenticatedUser,
  getSingleUserStandUps
);
router.get("/standup/:projectId", isAuthenticatedUser, getAllStandUps);
router.delete("/standup/:id", isAuthenticatedUser, deleteStandUp);
router.put("/standup/:id", isAuthenticatedUser, updateStandUp);

module.exports = router;
