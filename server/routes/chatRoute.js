const express = require("express");
const { saveMessageWithRoute } = require("../controllers/chatController");

const router = express.Router();

router.post("/save-chat/:senderId/:receiverId", saveMessageWithRoute);

module.exports = router;
