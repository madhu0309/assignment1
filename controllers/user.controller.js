const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { getUsers, addUser, editUser, findUser } = require("../services/user.service");
 
SECRET_KEY = "MADHU";

const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await addUser(name, email, password);
        res.status(201).json({ 
            success: true,
            data: user, 
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Something went wrong"});
    }
}

const updateUser = async (req, res) => {
    try {
        const {email, name, password} = req.body;
        const result = await editUser(name, email, password);
        res.status(201).json({ success: true, data: result })
    } catch {
        console.log(error);
        res.status(500).json({message: "Something went wrong"});
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await findUser(email);
        
        if (!existingUser) {
            res.status(404).json({ message: "User not found" })
        }

        const matchPassword = await bcrypt.compare(password, existingUser?.password);
        if (!matchPassword) {
            res.status(400).json({message: "Invalid Credentials"})
        }

        const token =  jwt.sign({ email: existingUser.email, id: existingUser._id }, SECRET_KEY)
        res.status(201).json({success: true, data: {
                user: existingUser, 
                token: token 
            } 
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Something went wrong"})
    }
}

module.exports = {
    createUser,
    updateUser,
    loginUser
}