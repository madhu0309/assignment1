const User = require("../models/User");
const bcrypt  = require("bcrypt");

const findUser = async (email) => {
    return User.findOne({ email: email })
}

const addUser = async (name, email, password) => {
    try {
        const existingUser = await User.findOne({email: email});
        if (existingUser) {
            throw new Error("User already exists");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await User.create({
            email: email,
            password: hashedPassword,
            name: name
        })
        return result;
    } catch (error) {
        console.log(error);
    }
}

const editUser = async (email, name, password) => {
    try {
        let hashedPassword;
        if (password) {
            hashedPassword = await bcrypt.hash(password, 10);
        }

        return User.findOneAndUpdate(
            { email }, 
            hashedPassword ? 
                { name: name, password: hashedPassword } : {name}
        );
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    addUser,
    editUser,
    findUser
}