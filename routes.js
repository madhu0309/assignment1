const express = require("express");
const router = express.Router();
const userController = require("./controllers/user.controller");
const groupController = require("./controllers/group.controller");
const messageController = require("./controllers/message.controller");
const auth = require("./middlewares/auth");
const isAdmin = require("./middlewares/isadmin");

router.post("/users", auth, isAdmin, userController.createUser)
router.put("/users", auth, isAdmin, userController.updateUser);
router.post("/users/login", userController.loginUser);

router.get("/groups", auth,  groupController.groupsList);
router.post("/groups", auth, groupController.createGroup);
router.delete("/groups/:id", auth, groupController.deleteGroup);
router.patch("/groups/:id", auth, groupController.addGroupMember);

router.post("/messages", auth, messageController.createMessage);
router.patch("/messages/like", messageController.likeMessage);

module.exports = router;
