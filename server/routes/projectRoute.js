const express = require("express");
const {
  postProject,
  deleteProject,
  updateProject,
  getSingleProject,
  getAllProjects,
} = require("../controllers/userController");

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

const router = express.Router();

router.post("/milestone", isAuthenticatedUser, postProject);
router.get("/milestone/:id", isAuthenticatedUser, getSingleProject);
router.post("/milestone", isAuthenticatedUser, getAllProjects);
router.delete("/milestone/:id", isAuthenticatedUser, deleteProject);
router.put("/milestone/:id", isAuthenticatedUser, updateProject);

module.exports = router;
