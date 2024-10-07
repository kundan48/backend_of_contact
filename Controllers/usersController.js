const bcrypt = require("bcryptjs");
const User = require("../Models/usersModels");
const jwt = require("jsonwebtoken");

const RegisterUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are mandatory" });
        }
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = await User.create({
            username,
            email,
            password: hashedPassword
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                username: user.username,
                email: user.email,

            });
        } else {
            res.status(400).json({ message: "User registration failed" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



const LoginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are mandatory" });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        const token = jwt.sign(
            { userId: user._id, username: user.username }, 
            process.env.ACCESS_TOKEN_SECRET, 
            { expiresIn: "1m" } 
        );
        res.status(200).json({
            token, 
            user: {
                _id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {

        res.status(500).json({ message: error.message });
    }
};

module.exports = { LoginUser };


const CurrentUser = async(req, res)=>{

    res.json({message : "current user information"});
};
module.exports={
    RegisterUser,
    LoginUser,
    CurrentUser

};
