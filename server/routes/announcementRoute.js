const express = require("express");
const {
  postAnnouncement,
  getAllAnnouncements,
  deleteAnnouncement,
} = require("../controllers/announcementController");

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

const router = express.Router();

router.post("/announcement", isAuthenticatedUser, postAnnouncement);
router.get("/announcement/:id", isAuthenticatedUser, getAllAnnouncements);
router.delete("/announcement/:id", isAuthenticatedUser, deleteAnnouncement);

module.exports = router;
