const ErrorHandler = require("../utils/errorHandler");

const Channel = require("../models/channelModel");

const cloudinary = require("cloudinary");

// POST channel
const postChannel = async (req, res) => {
  try {
    console.log(req.body);
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
    const channels = await Channel.find(req.params.id);
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
      res.status(200).json({ message: `Channel ${id} updated` });
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
};
