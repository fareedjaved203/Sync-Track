require("dotenv").config({ path: "./.env" });

const http = require("http");

const app = require("./app");

const {
  userJoin,
  getUsers,
  userLeave,
} = require("./utils/whiteboard_collaboration/user");

require("./config/database");

const { saveMessage } = require("./controllers/chatController");

const server = http.createServer(app);
const socketIO = require("socket.io");
const io = socketIO(server);

const cloudinary = require("cloudinary");
const { userOnline, getOnlineUsers } = require("./utils/chat/user");

const port = process.env.PORT || 8000;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const onlineUsers = [];

// socket.io
let imageUrl, userRoom;
io.on("connection", (socket) => {
  socket.on("user-joined", (data) => {
    if (data) {
      const { roomId, userId, userName, host, presenter } = data;
      userRoom = roomId;
      const user = userJoin(socket.id, userName, roomId, host, presenter);
      const roomUsers = getUsers(user.room);
      socket.join(user.room);
      socket.emit("message", {
        message: "Welcome to ChatRoom",
      });
      socket.broadcast.to(user.room).emit("message", {
        message: `${user.username} has joined`,
      });

      io.to(user.room).emit("users", roomUsers);
      io.to(user.room).emit("canvasImage", imageUrl);
    }
  });

  socket.on("drawing", (data) => {
    imageUrl = data;
    socket.broadcast.to(userRoom).emit("canvasImage", imageUrl);
  });

  socket.on("online-users", (name) => {
    const user = userOnline(socket.id, name);
    socket.broadcast.emit("online-users-updated", getOnlineUsers());
  });

  socket.on("sendMessage", async (message) => {
    io.emit("message", message);
    io.emit("notification", message);
    await saveMessage(message.message, message.sender, message.receiver);
  });

  socket.on("disconnect", () => {
    const userLeaves = userLeave(socket.id);
    const roomUsers = getUsers(userRoom);

    if (userLeaves) {
      io.to(userLeaves.room).emit("message", {
        message: `${userLeaves.username} left the chat`,
      });
      io.to(userLeaves.room).emit("users", roomUsers);
    }

    // Remove user from online list
    const index = onlineUsers.findIndex((user) => user.id === socket.id);
    onlineUsers.splice(index, 1);

    // Emit offline event to all users
    io.emit("online-users", onlineUsers);
  });
});

io.listen(3000);
app.listen(port, () => {
  console.log(`server is running at http://localhost:${port}`);
});
