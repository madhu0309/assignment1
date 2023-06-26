const {
  addMessage,
  addLike,
  findMessages,
} = require("../services/message.service");
const { getGroup } = require("../services/group.service");
const { validationResult } = require("express-validator");

const getMessages = async (req, res) => {
  try {
    const userId = req.userId;
    const groupId = req.params.id;
    const messages = await findMessages(userId, groupId);
    res.status(200).json({ success: true, data: messages });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const createMessage = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: errors.array(),
      });
    }
    const { message, groupId } = req.body;
    const userId = req.userId;

    const group = getGroup(groupId);
    if (!group) {
      return res
        .status(404)
        .json({ status: false, message: "Group not found" });
    }

    const msg = await addMessage(message, userId, groupId);
    res.status(201).json({ success: true, data: msg });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const likeMessage = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: errors.array(),
      });
    }
    const { messageId } = req.body;
    const userId = req.userId;
    const msg = await addLike(messageId, userId);
    res.status(200).json({ success: true, data: msg });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  getMessages,
  createMessage,
  likeMessage,
};
