const Chat = require("../models/chat/chatModel");
const User = require("../models/userModel");
const Conversation = require("../models/chat/conversationModel");

const saveMessage = async (message, senderId, receiverId) => {
  try {
    const newMessage = new Chat({
      sender: new mongoose.Types.ObjectId(senderId),
      receiver: new mongoose.Types.ObjectId(receiverId),
      content: message.content,
      timestamp: new Date(),
    });

    await newMessage.save();
  } catch (error) {
    console.log(error);
  }
};

const getUserWithChatHistory = async (userId) => {
  try {
    const user = await User.findById(userId);
    const conversation = await Conversation.findOne({ participants: userId })
      .populate({
        path: "participants",
        select: "name email avatar", // Replace with the fields you want to select
      })
      .populate({
        path: "messages",
        select: "content timestamp",
        populate: {
          path: "sender receiver",
          select: "name email avatar", // Replace with the fields you want to select
        },
      });

    return { user, conversation };
  } catch (error) {
    throw new Error("Error fetching user and chat history: " + error.message);
  }
};

module.exports = { getUserWithChatHistory, saveMessage };
