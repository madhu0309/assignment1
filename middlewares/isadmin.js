const User = require("../models/User");

const isAdmin = async (req, res, next) => {
    try {
        let userId = req.userId;
        const user = await User.findOne({ _id: userId });
        if (user && !(user.role === "admin")) {
            res.status(401).json({error: "Unauthorized User"});
        }
        next();
    } catch (error) {
        
    }
}

module.exports = isAdmin;