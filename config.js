require('dotenv').config();

module.exports = {
    JWT_SECTRET_KEY: process.env.JWT_SECTRET_KEY,
    PORT: process.env.PORT,
    MONGO_URL: process.env.MONGO_URL
}
