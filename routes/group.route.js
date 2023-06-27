const express = require("express");
const groupController = require("../controllers/group.controller");
const { groupMemberValidation } = require("../validations/group.validation");
const auth = require("../middlewares/auth");

const router = express.Router();

router.get("/groups", auth, groupController.groupsList);
router.post("/groups", auth, groupController.createGroup);
router.delete("/groups/:id", auth, groupController.deleteGroup);
router.patch(
  "/groups/add-member/:id",
  auth,
  groupMemberValidation,
  groupController.addGroupMember
);
router.patch(
  "/groups/remove-member/:id",
  auth,
  groupMemberValidation,
  groupController.removeGroupMember
);

module.exports = router;
