const ErrorHandler = require("../utils/errorHandler");

const User = require("../models/userModel");

const sendToken = require("../utils/jwtToken");

const sendEmail = require("../utils/sendEmail");

const crypto = require("crypto");

const cloudinary = require("cloudinary");

const renderEmailTemplate = require("../utils/emailTemplate");

//register

const registerUser = async (req, res, next) => {
  try {
    let image = "https://www.computerhope.com/jargon/g/guest-user.png";
    const myCloud = await cloudinary.v2.uploader.upload(image, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });

    const { name, email, password } = req.body;
    const emailAlreadyPresent = await User.findOne({ email });
    if (emailAlreadyPresent) {
      res.status(409).json({
        success: false,
        message: "Email Already Exists",
      });
    }
    const user = await User.create({
      name,
      email,
      password,
      avatar: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
    });
    sendToken(user, 201, res);
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler(error.message, 400));
  }
};

//login
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please enter both email and password",
      });
    }
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    sendToken(user, 200, res);
  } catch (error) {
    return next(new ErrorHandler(error, 404));
  }
};

//logout
const logout = async (req, res, next) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
    res.status(200).json({
      success: true,
      message: "Logged Out",
    });
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler(error.message, 500));
  }
};

//for oneself
const getUserDetails = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 404));
  }
};

//get all users (for admin)
const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
};

//get a single user
const getSingleUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.params.id });
    if (!user) {
      return next(
        new ErrorHandler(`User Doesn't Exist with Email: ${req.params.id}`, 404)
      );
    }
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error.message);
    return next(new ErrorHandler(error.message, 400));
  }
};

//update user role (for admin)
const updateUserRole = async (req, res, next) => {
  try {
    const newUserData = {
      role: req.body.role,
    };

    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
      new: true,
      runValidators: true,
    });

    console.log(user);

    if (!user) {
      return next(new ErrorHandler("User Does not Exist with this id ", 404));
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (err) {
    console.log(err.message);
    return next(new ErrorHandler(err.message, 500));
  }
};

//delete user (for admin)
const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return next(new ErrorHandler("User Does not Exist with this id ", 404));
    }

    res.status(200).json({
      success: true,
      message: "User Deleted Successfully",
    });
  } catch (err) {
    return next(new ErrorHandler(err.message, 500));
  }
};

const forgotPassword = async (req, res, next) => {
  try {
    const [key, value] = Object.entries(req.body)[0];
    console.log(key);
    const user = await User.findOne({ email: key });
    if (!user) {
      return next(new ErrorHandler("User Not Found", 404));
    }
    const resetToken = await user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });

    const resetPasswordUrl = `${process.env.RESET_TOKEN_URL}/${resetToken}`;

    const emailData = {
      resetPasswordUrl: resetPasswordUrl,
    };

    const path = require("path");
    const templatePath = path.join(
      __dirname,
      "..",
      "public",
      "views",
      "templates",
      "resetPasswordTemplate.html"
    );
    const emailContent = renderEmailTemplate(templatePath, emailData);

    try {
      await sendEmail({
        email: user.email,
        subject: "Sync Track Password Recovery",
        html: emailContent,
      });

      res.status(200).json({
        success: true,
        message: `Email Sent to ${user.email}`,
      });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save({ validateBeforeSave: false });
      return next(new ErrorHandler(error.message, 500));
    }
  } catch (error) {
    console.log(error.message);
    return next(new ErrorHandler(error.message, 404));
  }
};

const resetPassword = async (req, res, next) => {
  try {
    console.log(req.body);
    console.log(req.params.token);
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    console.log("hello");

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    console.log("hello2");
    console.log(user);

    if (!user) {
      return next(new ErrorHandler("Token expired or invalid", 400));
    }
    if (req.body.newPassword !== req.body.confirmPassword) {
      return next(new ErrorHandler("Password Does not Match", 400));
    }
    user.password = req.body.newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();
    sendToken(user, 200, res);
  } catch (error) {
    console.log(error.message);
    return next(new ErrorHandler(error.message, 500));
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const newUserData = {
      name: req.body.name,
      email: req.body.email,
    };

    const user = await User.findById(req.user.id);

    if (req.body.avatar) {
      const imageId = user.avatar.public_id;
      await cloudinary.v2.uploader.destroy(imageId);
      const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatars",
        width: 150,
        crop: "scale",
      });
      newUserData.avatar = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };
    } else {
      newUserData.avatar = {
        public_id: user.avatar.public_id,
        url: user.avatar.url,
      };
    }

    await User.findByIdAndUpdate(req.user.id, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.log(error.message);
    return next(new ErrorHandler(error.message, 500));
  }
};

const updatePassword = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("+password");

    if (req.body.newPassword !== req.body.confirmPassword) {
      return next(new ErrorHandler("password does not match", 400));
    }

    user.password = req.body.newPassword;

    await user.save();

    sendToken(user, 200, res);
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

module.exports = {
  registerUser,
  loginUser,
  logout,
  getUserDetails,
  getAllUsers,
  getSingleUser,
  updateUserRole,
  deleteUser,
  forgotPassword,
  resetPassword,
  updateProfile,
  updatePassword,
};
