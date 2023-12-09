const mongoose = require("mongoose");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

const { DATABASE } = process.env;

mongoose
  .connect(DATABASE)
  .then(async () => {
    console.log("Database Connection Successful");
    const user = await User.findOne({ email: process.env.ADMIN_EMAIL });
    if (!user) {
      const hashedPassword = process.env.ADMIN_PASSWORD;
      await User.create({
        name: "Admin User",
        email: process.env.ADMIN_EMAIL,
        password: hashedPassword,
        role: "admin",
        avatar: {
          public_id: "avatars/qm2t6r3rqk6cokc7vfi1",
          url: "https://res.cloudinary.com/dg2ag5s5y/image/upload/v1701628531/avatars/qm2t6r3rqk6cokc7vfi1.png",
        },
      });
    }
  })
  .catch((err) => {
    console.log(err);
  });
