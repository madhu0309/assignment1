const User = require("../models/User");
const bcrypt = require("bcrypt");
const { SALT } = require("../utils/constants");

const findUser = async (email) => {
  return User.findOne({ email: email });
};

const findUserById = async (id) => {
  return User.findById(id);
};

const addUser = async (name, email, password) => {
  try {
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, SALT);

    const result = await User.create({
      email: email,
      password: hashedPassword,
      name: name,
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};

const editUser = async (email, name, password) => {
  try {
    let hashedPassword;
    if (password) {
      hashedPassword = await bcrypt.hash(password, SALT);
    }

    return User.findOneAndUpdate(
      { email },
      hashedPassword ? { name: name, password: hashedPassword } : { name }
    );
  } catch (error) {
    console.log(error);
  }
};

const deleteToken = async (token) => {
  return User.findOneAndUpdate(
    {
      token: token,
    },
    {
      $unset: { token: 1 },
    }
  );
};

module.exports = {
  addUser,
  editUser,
  findUser,
  findUserById,
  deleteToken,
};
