const express = require("express");
const userController = require("../controllers/user.controller");
const isAdmin = require("../middlewares/isadmin");
const auth = require("../middlewares/auth");
const {
  createUserValidation,
  updateUserValidation,
  loginUserValidation,
} = require("../validations/user.validation");

const router = express.Router();

router.post(
  "/users",
  auth,
  isAdmin,
  createUserValidation,
  userController.createUser
);
router.put(
  "/users",
  auth,
  isAdmin,
  updateUserValidation,
  userController.updateUser
);
router.post("/users/login", loginUserValidation, userController.loginUser);
router.post("/users/logout", auth, userController.logoutUser);

module.exports = router;
