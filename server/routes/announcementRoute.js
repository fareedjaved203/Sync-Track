const express = require("express");
const {
  postAnnouncement,
  getAllAnnouncements,
} = require("../controllers/userController");

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

const router = express.Router();

router.post("/Announcement", isAuthenticatedUser, postAnnouncement);
router.get(
  "/announcement/:projectId",
  isAuthenticatedUser,
  getAllAnnouncements
);

module.exports = router;
