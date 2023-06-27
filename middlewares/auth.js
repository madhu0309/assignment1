const jwt = require("jsonwebtoken");
const { JWT_SECTRET_KEY } = require("../config");
const { findUserById } = require("../services/user.service");
const User = require("../models/User");

// const auth = async (req, res, next) => {
//     try {
//         let token = req.headers.authorization;
//         if (token) {
//             token = token.split(" ")[1];
//             let user = jwt.verify(token, JWT_SECTRET_KEY);
//             const currentUser = await findUserById(user?.id);
//             if (!currentUser) {
//                 res.status(401).json({ success: false, message: "Invalid Token" });
//             } else {
//                 req.userId = currentUser.id;
//             }
//         } else {
//             res.status(401).json({ success: false, message: "Unauthorized User" });
//         }
//         next();
//     } catch (error) {

//     }
// }

let auth = async (req, res, next) => {
  let token = req.cookies?.auth;
  if (token) {
    const user = await User.findByToken(token);
    if (!user) {
      return res.json({
        success: false,
      });
    }
    req.token = token;
    req.user = user;
  }
  next();
};

module.exports = auth;
