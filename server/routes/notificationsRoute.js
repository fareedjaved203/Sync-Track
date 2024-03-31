const express = require("express");
const {
  postNotifications,
  getAllNotifications,
} = require("../controllers/notificationController");

const { isAuthenticatedUser } = require("../middlewares/auth");

const router = express.Router();

router.post("/notification", isAuthenticatedUser, postNotifications);
router.get("/notifications/:email", isAuthenticatedUser, getAllNotifications);

module.exports = router;
