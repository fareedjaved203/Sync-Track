const express = require("express");
const {
  registerUser,
  loginUser,
  logout,
  getUserDetails,
  getAllUsers,
  getSingleUser,
  updateUserRole,
  deleteUser,
  forgotPassword,
  resetPassword,
  updateProfile,
  updatePassword,
} = require("../controllers/userController");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");
const { getUserWithChatHistory } = require("../controllers/chatController");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/password/forgot", forgotPassword);
router.put("/password/reset/:token", resetPassword);
router.get("/logout", logout);
router.get("/me", isAuthenticatedUser, getUserDetails);
router.put("/me/update", isAuthenticatedUser, updateProfile);
router.put("/password/update", isAuthenticatedUser, updatePassword);
router.get("/allusers", getAllUsers);
router.get("/user/:id", getSingleUser);
router.get(
  "/chat-history/:senderId/:receiverId",
  isAuthenticatedUser,
  getUserWithChatHistory
);
router.put(
  "/admin/user/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  updateUserRole
);
router.delete(
  "/admin/user/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  deleteUser
);

module.exports = router;
