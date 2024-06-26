const express = require("express");
const {
  postMilestone,
  deleteMilestone,
  updateMilestone,
  getSingleMilestone,
  getAllMilestones,
} = require("../controllers/milestoneController");

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

const router = express.Router();

router.post("/milestone", isAuthenticatedUser, postMilestone);
router.get("/milestone/:id", isAuthenticatedUser, getSingleMilestone);
router.delete("/milestone/:id", isAuthenticatedUser, deleteMilestone);
router.put("/milestone/:id", isAuthenticatedUser, updateMilestone);

module.exports = router;
