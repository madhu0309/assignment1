const express = require("express");
const {
  createMessageValidation,
  likeMessageValidation,
  unLikeMessageValidation
} = require("../validations/message.validation");
const messageController = require("../controllers/message.controller");
const auth = require("../middlewares/auth");
const router = express.Router();

router.get("/:groupId", auth, messageController.getMessages);
router.post(
  "",
  auth,
  createMessageValidation,
  messageController.createMessage
);
router.patch(
  "/like",
  auth,
  likeMessageValidation,
  messageController.likeMessage
);
router.patch(
  "/unlike",
  auth,
  unLikeMessageValidation,
  messageController.unLikeMessage
);

module.exports = router;
