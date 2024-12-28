
const User = require("../models/userModel")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const { path } = require("../models/paperSchema");



// ===============generate taken====================


const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '5h',
    });
};



// ================user register==============


const registerUser = async (req, res) => {

    const { username, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.log('registration failed', error);
        res.status(500).json({ message: 'Server error' });
    }
}


// ===============user login=========================== 


const loginUser = async (req, res) => {
    const { email, password } = JSON.parse(req.body)

    // console.log(email, password, "email", "password");
    try {

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        res.cookie('token', generateToken(user._id), { httpOnly: false, maxAge: 18000000, sameSite: 'none', secure: true })

        return res.status(200).json({ message: "Logged in successfully" })

    } catch (error) {
        console.log('login failed', error);

        res.status(500).json({ "message": 'Server error' });
    }
}




//============== update user =========================


const updateUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const user = await User.findOne(email);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.username = username || user.username;
        user.email = email || user.email;

        if (password) {
            user.password = await bcrypt.hash(password, 10);
        }

        await user.save();
        res.json(user);
    } catch (error) {
        console.log('user updation failed', error);

        res.status(500).json({ error: 'Server error' });
    }
}


module.exports = { registerUser, loginUser, updateUser }