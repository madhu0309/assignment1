const {
  getGroups,
  addGroup,
  removeGroup,
  addMember,
  removeMember,
  getGroup
} = require("../services/group.service");
const { validationResult } = require("express-validator");
const { findUserById } = require("../services/user.service");

const groupsList = async (req, res) => {
  try {
    const query = req.query.name;
    const groups = await getGroups(query);
    res.status(200).json({ success: true, data: groups });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const createGroup = async (req, res) => {
  try {
    const { name } = req.body;
    const userId = req.user?.id;
    const group = await addGroup(name, userId);
    res.status(201).json({ success: true, data: group });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const deleteGroup = async (req, res) => {
  try {
    const groupId = req.params.id;
    const group = await removeGroup(groupId);
    
    if (!group) {
      res.status(404).json({
        success: false,
        message: "No group found",
      });
    }
    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const addGroupMember = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: errors.array(),
      });
    }

    const { userId } = req.body;
    const groupId = req.params.id;

    const user = await findUserById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const group = await getGroup(groupId);
    if (!group) {
      return res.status(404).json({
        success: false,
        message: "Group not found",
      });
    }

    await addMember(userId, groupId);
    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const removeGroupMember = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: errors.array(),
      });
    }

    const { userId } = req.body;
    const groupId = req.params.id;

    const user = await findUserById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const group = await getGroup(groupId);
    if (!group) {
      return res.status(404).json({
        success: false,
        message: "Group not found",
      });
    }

    await removeMember(userId, groupId);
    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
  groupsList,
  createGroup,
  deleteGroup,
  addGroupMember,
  removeGroupMember,
};
