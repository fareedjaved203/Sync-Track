const express = require("express");
const {
  postTask,
  deleteTask,
  updateTask,
  getAssignedTask,
  getAllTasks,
} = require("../controllers/taskController");

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

const router = express.Router();

router.post("/task", isAuthenticatedUser, postTask);
router.get("/mytasks/:channelId", isAuthenticatedUser, getAssignedTask);
router.get("/tasks/:id", isAuthenticatedUser, getAllTasks);
router.delete("/task/:id", isAuthenticatedUser, deleteTask);
router.put("/task/:id", isAuthenticatedUser, updateTask);

module.exports = router;
