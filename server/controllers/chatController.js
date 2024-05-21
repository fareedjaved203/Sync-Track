const Chat = require("../models/chat/chatModel");
const User = require("../models/userModel");
const Conversation = require("../models/chat/conversationModel");
const mongoose = require("mongoose");

const saveMessage = async (message, senderId, receiverId) => {
  try {
    const newMessage = new Chat({
      sender: new mongoose.Types.ObjectId(senderId),
      receiver: new mongoose.Types.ObjectId(receiverId),
      content: message,
      timestamp: new Date(),
    });

    await newMessage.save();
  } catch (error) {
    console.log(error);
  }
};

const saveMessageWithRoute = async (req, res) => {
  try {
    console.log(req.body);
    const newMessage = new Chat({
      sender: new mongoose.Types.ObjectId(req.params.senderId),
      receiver: new mongoose.Types.ObjectId(req.params.receiverId),
      content: req.body.message,
      timestamp: new Date(),
    });

    await newMessage.save();
  } catch (error) {
    console.log(error);
  }
};

const getUserWithChatHistory = async (req, res) => {
  try {
    const { senderId, receiverId } = req.params;
    const chatHistory = await Chat.find({
      $or: [
        { sender: senderId, receiver: receiverId },
        { sender: receiverId, receiver: senderId },
      ],
    }).sort({ timestamp: 1 });

    res.status(200).json({
      success: true,
      chatHistory,
    });
  } catch (error) {
    console.log(error);
    // throw new Error("Error fetching user and chat history: " + error.message);
  }
};

module.exports = { getUserWithChatHistory, saveMessage, saveMessageWithRoute };
