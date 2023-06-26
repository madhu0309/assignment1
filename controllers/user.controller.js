const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { addUser, editUser, findUser } = require("../services/user.service");
const { validationResult } = require('express-validator');
const { JWT_SECTRET_KEY } = require('../config');

const createUser = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: errors.array()
            })
        }
        const { name, email, password } = req.body;
        const user = await findUser(email);
        if (user) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            })
        }
        const currentUser = await addUser(name, email, password);
        res.status(201).json({ 
            success: true,
            data: currentUser, 
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
}

const updateUser = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: errors.array()
            })
        }
        const {email, name, password} = req.body;
        const result = await editUser(name, email, password);
        res.status(201).json({ success: true, data: result })
    } catch {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await findUser(email);
        
        if (!existingUser) {
            return res.status(404).json({ message: "User not found" })
        }

        const matchPassword = await bcrypt.compare(password, existingUser?.password);
        if (!matchPassword) {
            return res.status(400).json({message: "Invalid Credentials"})
        }

        const token =  jwt.sign({ email: existingUser.email, id: existingUser._id }, JWT_SECTRET_KEY, {
            expiresIn: "30d"
        })

        res.status(201).json({success: true, data: {
                user: existingUser, 
                token: token 
            } 
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong"
        })
    }
}

module.exports = {
    createUser,
    updateUser,
    loginUser
}