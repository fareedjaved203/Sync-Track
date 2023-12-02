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
      const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
      await User.create({
        name: "Admin User",
        email: process.env.ADMIN_EMAIL,
        password: hashedPassword,
        role: "admin",
      });
    }
  })
  .catch((err) => {
    console.log(err);
  });
