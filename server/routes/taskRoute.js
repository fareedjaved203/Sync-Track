const express = require("express");
const {
  postTask,
  deleteTask,
  updateTask,
  getSingleTask,
} = require("../controllers/userController");

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

const router = express.Router();

router.post("/task", isAuthenticatedUser, postTask);
router.get("/task/:id", isAuthenticatedUser, getSingleTask);
router.get("/all-tasks", isAuthenticatedUser, getAllTasks);
router.delete("/task/:id", isAuthenticatedUser, deleteTask);
router.put("/task/:id", isAuthenticatedUser, updateTask);

module.exports = router;
