const jwt = require("jsonwebtoken");
const SECRET_KEY = "MADHU";

const auth = (req, res, next) => {
    try {
        let token = req.headers.authorization;
        if (token) {
            token = token.split(" ")[1];
            let user = jwt.verify(token, SECRET_KEY);
            req.userId = user.id;

        } else {
            res.status(401).json({ error: "Unauthorized User" })
        }
        next();
    } catch (error) {
     
    }
}

module.exports = auth;