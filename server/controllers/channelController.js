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
      users: {
        $elemMatch: {
          user: req.user.id,
          status: { $ne: "disapproved" },
        },
      },
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

const specificUser = async (req, res) => {
  try {
    const channelId = req.params.channelId;
    const userId = req.params.userId;

    const channel = await Channel.findOne({
      _id: channelId,
      "users.user": userId,
    }).populate("users.user");

    if (channel) {
      const user = channel.users.find((u) => u.user._id.toString() === userId);
      res.status(200).json({
        success: true,
        message: `User and channel fetched`,
        user,
        channel,
      });
    } else {
      res
        .status(404)
        .json({ success: false, message: `User not found in the channel` });
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
    console.log(email);
    const user = await User.find({ email });
    if (user[0]) {
      console.log(user);
      const channel = await Channel.findById(channelId);
      if (!channel) {
        return res.status(404).json({ error: "Channel not found" });
      }

      const userInChannel = channel.users.find(
        (u) => u.user && u.user.toString() === user[0]?._id?.toString()
      );

      if (userInChannel) {
        if (userInChannel.request === "rejected") {
          channel.users = channel.users.filter(
            (u) => u.user.toString() !== user[0]._id.toString()
          );
        } else if (userInChannel.status !== "disapproved") {
          return res
            .status(400)
            .json({ success: false, message: "User already added" });
        } else if (userInChannel.status == "disapproved") {
          const userIndex = channel.users.findIndex(
            (u) => u.user.toString() === user[0]._id.toString()
          );
          if (userIndex !== -1) {
            channel.users[userIndex].role = req.body.role;
            channel.users[userIndex].request = "pending";
            channel.users[userIndex].status = "working";
            channel.users[userIndex].feedback = "";
          } else {
            channel.users.push({
              user: user[0]?._id,
              role: req.body.role,
              request: "pending",
              status: "working",
              feedback: "",
            });
          }
        }
      } else {
        channel.users.push({
          user: user[0]?._id,
          role: req.body.role,
        });
      }

      const updatedChannel = await channel.save();
      console.log(updatedChannel);

      if (updatedChannel) {
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
      res.status(404).json({ success: false, message: "User not found" });
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

    const user = await User.findById(userId);

    let updatedChannel = await Channel.findOne({
      _id: channelId,
      "users.user": req.user.id,
    });

    if (newRequestStatus === "rejected") {
      updatedChannel.users = updatedChannel.users.filter(
        (user) => user.user.toString() !== req.user.id
      );
    } else {
      const userIndex = updatedChannel.users.findIndex(
        (user) => user.user.toString() === req.user.id
      );
      if (userIndex !== -1) {
        updatedChannel.users[userIndex].request = newRequestStatus;
      }
      user.channels.push(channelId);
      user.projects++;

      await user.save();
    }

    updatedChannel = await updatedChannel.save();

    if (updatedChannel) {
      res
        .status(200)
        .json({ success: true, message: `Your request is sent to the team!` });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ success: false, message: "Something went wrong" });
  }
};

const concludeUser = async (req, res) => {
  try {
    const channelId = req.params.channelId;
    const userId = req.params.userId;
    const feedback = req.body.feedback;
    const rating = req.body.rating;
    const user = await User.findById(userId);
    if (user) {
      const channel = await Channel.findById(channelId);
      if (!channel) {
        return res.status(404).json({ error: "Channel not found" });
      }

      const userIndex = channel.users.findIndex(
        (userObj) => userObj.user.toString() === userId
      );
      if (userIndex === -1) {
        return res.status(404).json({ error: "User not found in the channel" });
      }

      channel.users[userIndex].status = "approved";
      channel.users[userIndex].feedback = feedback;
      channel.users[userIndex].rating = rating;

      user.rating =
        (user.rating * user.projects + Number(rating)) / user.projects + 1;

      updateRank(user);

      await user.save();

      channel.markModified("users");

      await channel.save();

      const certificateUrl = `${process.env.CERTIFICATE_URL}/${channelId}/${userId}`;

      const certificateData = {
        certificateUrl: certificateUrl,
      };

      const path = require("path");
      const templatePath = path.join(
        __dirname,
        "..",
        "public",
        "views",
        "templates",
        "certificateTemplate.html"
      );
      const certificateContent = renderEmailTemplate(
        templatePath,
        certificateData
      );

      await sendEmail({
        email: user.email,
        subject: "Sync Track Project certificate",
        html: certificateContent,
      });

      res.status(200).json({
        success: true,
        message: `Email Sent to the user`,
      });
    } else {
      res.status(404).json({ message: error.toString() });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.toString() });
  }
};

function updateRank(user) {
  const rankThresholds = [
    { name: "Novice", minProjects: 0, maxRating: 2 },
    { name: "Apprentice", minProjects: 5, maxRating: 4 },
    { name: "Expert", minProjects: 10, maxRating: 4.5 },
    { name: "Master", minProjects: 15, maxRating: 4.7 },
    { name: "Legend", minProjects: 20, maxRating: 5 },
  ];

  const averageRating = user.rating / user.projects;

  let rank = "Novice";
  for (const threshold of rankThresholds) {
    if (
      user.projects >= threshold.minProjects &&
      averageRating <= threshold.maxRating
    ) {
      rank = threshold.name;
    } else {
      break;
    }
  }

  user.rank = rank;
}

const removeUserFromChannel = async (req, res) => {
  try {
    const channelId = req.params.channelId;
    const userId = req.params.userId;
    const feedback = req.body.feedback;
    const user = await User.findById(userId);
    if (user) {
      const channel = await Channel.findById(channelId);
      if (!channel) {
        return res
          .status(404)
          .json({ success: false, message: "Channel not found" });
      }

      const userIndex = channel.users.findIndex(
        (userObj) => userObj.user.toString() === userId
      );
      if (userIndex === -1) {
        return res
          .status(404)
          .json({ success: false, message: "User not found in the channel" });
      }

      channel.users[userIndex].status = "disapproved";
      channel.users[userIndex].feedback = feedback;

      channel.markModified("users");

      await channel.save();

      res
        .status(200)
        .json({ success: true, message: "user removed successfully" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.toString() });
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
  concludeUser,
  specificUser,
  removeUserFromChannel,
};
