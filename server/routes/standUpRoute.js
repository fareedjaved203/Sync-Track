const express = require("express");
const {
  postStandUp,
  getAllStandUps,
} = require("../controllers/standUpController");

const { isAuthenticatedUser } = require("../middlewares/auth");

const router = express.Router();

router.post("/standup", isAuthenticatedUser, postStandUp);

router.get("/standup/:projectId", isAuthenticatedUser, getAllStandUps);

module.exports = router;
