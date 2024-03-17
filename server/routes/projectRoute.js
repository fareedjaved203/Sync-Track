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

router.post("/project", isAuthenticatedUser, postProject);
router.get("/project/:id", isAuthenticatedUser, getProject);
router.delete("/project/:id", isAuthenticatedUser, deleteProject);
router.put("/project/:id", isAuthenticatedUser, updateProject);

module.exports = router;
