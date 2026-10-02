const jwt = require("jsonwebtoken");
const User = require("../models/User");

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h"});
};

const registerUser = async (req, res) => {
    const { fullName, email, password, profileUrl } = req.body;

    if(!fullName || !email || !password){
        return res.status(400).json({message: "All fields are required!"});
    }

    try {
        const existingEmail = await User.findOne({ email });
        if(existingEmail){
            return res.status(400).json({message: "User already in use"});
        }

        const user = await User.create({
            fullName,
            email,
            password,
            profileUrl
        });

        res.status(201).json({
            id: user._id,
            user,
            // token: generateToken(user._id)
        });
    } catch (error) {
        res.
            status(500).
            json({message: "Internal Server Error", error: error.message});
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if(!email || !password){
        return res.status(400).json({message: "All fields are required!"});
    }

    try {
        const user = await User.findOne({email});

        if(!user || !(await user.comparePassword(password))){
            return res.status(400).json({message: "invalid credentials"});
        }

        res
            .status(200)
            .json({
                id: user._id,
                user: user,
                token: generateToken(user._id)
            })
    } catch (error) {
        res.
            status(500).
            json({message: "Error registering user", error: error.message});
    }
}

const getUserInfo = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.user.id }).select("-password");

        if(!user){
            return res.status(404).json({message: "User not found"});
        }
        res.status(200).json(user);
    } catch (error) {
        res.
            status(500).
            json({message: "Internal Server Error", error: error.message});
    }
}

module.exports = {
    registerUser,
    loginUser,
    getUserInfo
}
