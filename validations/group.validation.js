const { body } = require("express-validator");
const mongoose = require('mongoose');

const groupMemberValidation = [
  body("userId").customSanitizer((value) => new mongoose.Types.ObjectId(value)),
];


module.exports = {
    groupMemberValidation,
};
