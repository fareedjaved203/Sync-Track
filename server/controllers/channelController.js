const ErrorHandler = require("../utils/errorHandler");

const Channel = require("../models/channelModel");

const User = require("../models/userModel");

const renderEmailTemplate = require("../utils/emailTemplate");

const sendEmail = require("../utils/sendEmail");

// POST channel
const postChannel = async (req, res) => {
  try {
    await Channel.create({
      creator: req.user.id,
      users: [
        {
          user: req.user.id,
        },
      ],
      channel: req.body.channel,
      ...req.body,
    });
    res.status(201).json({ message: "Channel created" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.toString() });
  }
};

// GET single channel
const myChannels = async (req, res) => {
  try {
    const channels = await Channel.find({
      users: { $elemMatch: { user: req.user.id } },
    });
    if (channels) {
      res.status(200).json({ message: `Channels fetched`, channels });
    }
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

const myChannel = async (req, res) => {
  try {
    const channels = await Channel.findById(req.params.id);
    if (channels) {
      res.status(200).json({ message: `Channel fetched`, channels });
    }
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

const myTeam = async (req, res) => {
  try {
    const channels = await Channel.findById(req.params.id).populate(
      "users.user"
    );
    if (channels) {
      res.status(200).json({ message: `Channel fetched`, channels });
    }
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

// DELETE channel
const deleteChannel = async (req, res) => {
  try {
    const id = req.params.id;
    const channel = await Channel.findByIdAndDelete(id);
    if (channel) {
      res.status(200).json({ message: `Channel deleted Successfully` });
    }
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

const deleteMember = async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.params.userId;
    console.log(userId);

    const channel = await Channel.findByIdAndUpdate(
      id,
      {
        $pull: { users: { user: userId } },
      },
      { new: true }
    );

    if (channel) {
      res
        .status(200)
        .json({ success: true, message: `User removed Successfully` });
    } else {
      res.status(404).json({ success: false, message: `Channel not found` });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.toString() });
  }
};

// PUT channel
const updateChannel = async (req, res) => {
  try {
    const id = req.params.id;
    const newChannelData = {
      ...req.body,
    };
    const channel = await Channel.findByIdAndUpdate(id, newChannelData, {
      new: true,
      runValidators: true,
    });
    if (channel) {
      res.status(200).json({ message: `Channel ${id} updated`, success: true });
    }
  } catch (error) {
    console.log(error);
    res.status(409).json({
      message: "Channel with same name already exists",
      success: false,
    });
  }
};

const addUser = async (req, res) => {
  try {
    const channelId = req.params.channelId;
    const email = req.body.email;
    const user = await User.find({ email });
    console.log(user);
    if (user) {
      const channel = await Channel.findById(channelId);
      if (!channel) {
        return res.status(404).json({ error: "Channel not found" });
      }
      // const userExists = channel.users.some(
      //   (userObj) => userObj.user?.toString() === user?._id?.toString()
      // );
      // if (userExists) {
      //   return res
      //     .status(400)
      //     .json({ error: "User already added to the channel" });
      // }

      const updatedChannel = await Channel.findByIdAndUpdate(
        channelId,
        {
          $addToSet: {
            users: {
              user: user[0]._id,
              role: req.body.role,
            },
          },
        },
        { new: true }
      );
      if (updatedChannel) {
        console.log("hello");
        const invitationUrl = `${process.env.INVITATION_URL}/${channelId}`;

        const invitationData = {
          invitationUrl: invitationUrl,
        };

        const path = require("path");
        const templatePath = path.join(
          __dirname,
          "..",
          "public",
          "views",
          "templates",
          "invitationTemplate.html"
        );
        const invitationContent = renderEmailTemplate(
          templatePath,
          invitationData
        );

        await sendEmail({
          email: email,
          subject: "Sync Track Project Invitation",
          html: invitationContent,
        });

        res.status(200).json({
          success: true,
          message: `Email Sent to the user`,
        });
      }
    } else {
      res.status(404).json({ message: error.toString() });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.toString() });
  }
};

const userResponse = async (req, res) => {
  try {
    const channelId = req.params.channelId;
    const userId = req.params.userId;
    const newRequestStatus = req.body.request;
    console.log(newRequestStatus);
    console.log(userId);
    console.log(channelId);
    console.log(req.user.id);

    const updatedChannel = await Channel.findOneAndUpdate(
      { _id: channelId, "users.user": req.user.id },
      {
        $set: {
          "users.$.request": newRequestStatus,
        },
      },
      { new: true }
    );

    console.log(updatedChannel);

    if (updatedChannel) {
      res
        .status(200)
        .json({ success: true, message: `User request status updated` });
    }
  } catch (error) {
    res.status(404).json({ success: false, message: error.toString() });
  }
};

module.exports = {
  updateChannel,
  deleteChannel,
  myChannels,
  myChannel,
  postChannel,
  addUser,
  userResponse,
  myTeam,
  deleteMember,
};
