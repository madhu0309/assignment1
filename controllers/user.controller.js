const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {
  addUser,
  editUser,
  findUser,
  deleteToken,
} = require("../services/user.service");
const { validationResult } = require("express-validator");
const User = require("../models/User");

const createUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: errors.array(),
      });
    }
    
    const { name, email, password } = req.body;
    const user = await findUser(email);
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }
    const newUser = await addUser(name, email, password);
    res.status(201).json({
      success: true,
      data: newUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: errors.array(),
      });
    }

    const { email, name, password } = req.body;
    const result = await editUser(name, email, password);
    res.status(201).json({ success: true, data: result });
  } catch {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getProfile = async (req, res) => {
  res.json({
    isAuth: true,
    id: req.user._id,
    email: req.user.email,
    name: req.user.firstname + req.user.lastname,
  });
};

const loginUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: errors.array(),
      });
    }

    let token = req.cookies?.auth;
    if (token) {
      const user = await User.findByToken(token);
      if (user) {
        return res.status(400).json({
          success: false,
          message: "You are already logged in",
        });
      }
    } else {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.json({
          success: false,
          message: " Auth failed ,email not found",
        });
      }

      const isMatch = await user.comparepassword(req.body.password);
      if (!isMatch) {
        return res.json({
          success: false,
          message: "password doesn't match",
        });
      }

      const userToken = await user.generateToken();
      return res.cookie("auth", userToken.token).json({
        token: userToken.token,
        isAuth: true,
        id: user._id,
        email: user.email,
      });
    }
    res.status(200).json({ success: true })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const logoutUser = async (req, res) => {
  try {
    let token = req.token;
    if (token) {
      await deleteToken(token);
    }
    res.clearCookie('auth');
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
  createUser,
  updateUser,
  loginUser,
  logoutUser,
  getProfile,
};
