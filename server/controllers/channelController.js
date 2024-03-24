const ErrorHandler = require("../utils/errorHandler");

const Channel = require("../models/channelModel");

const User = require("../models/userModel");

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
    if (user) {
      const channel = await Channel.findById(channelId);
      if (!channel) {
        return res.status(404).json({ error: "Channel not found" });
      }

      const userExists = channel.users.some(
        (userObj) => userObj.user?.toString() === user?._id?.toString()
      );
      if (userExists) {
        return res
          .status(400)
          .json({ error: "User already added to the channel" });
      }

      const updatedChannel = await Channel.findByIdAndUpdate(
        channelId,
        {
          $addToSet: {
            users: {
              user: user._id,
              role: req.body.role,
            },
          },
        },
        { new: true }
      );
      if (updatedChannel) {
        res.status(200).json({ message: `User Added updated` });
      }
    } else {
      res.status(404).json({ message: `User Cannot Be Added` });
    }
  } catch (error) {
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
};
