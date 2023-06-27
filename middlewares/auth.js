const User = require("../models/User");

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
