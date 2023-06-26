const { body, check } = require("express-validator");
var mongoose = require("mongoose");

const groupMemberValidation = [
  body("userId").notEmpty().isMongoId().withMessage("Invalid id"),
];


module.exports = {
    groupMemberValidation,
};
