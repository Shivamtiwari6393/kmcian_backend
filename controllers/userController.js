
const User = require("../models/userModel")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const { path } = require("../models/paperSchema");



// ===============generate taken====================


const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT, {
        expiresIn: '1h',
    });
};



// ================user register==============


const registerUser = async (req, res) => {

    const { username, email, password } = req.body


    if (!username || !email || !password) {
        return res.status(400).json({ "message": "All fields are required" })
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'Sorry! Email already in use.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        return res.status(201).json({ message: 'Success! User registered successfully.' });
    } catch (error) {
        console.log('registration failed', error);
        res.status(500).json({ message: 'Server error' });
    }
}


// ===============user login=========================== 


const loginUser = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({ "message": "All fields are required" })
    }


    // console.log(email, password, "email", "password");
    try {

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid password' });
        }
        const token = generateToken(user._id)

        return res.status(200).json({ message: "Logged in successfully", token: token })

    } catch (error) {
        console.log('login failed', error);

        res.status(500).json({ "message": 'Server error' });
    }
}




//============== update user =========================


const updateUser = async (req, res) => {
    const { username, email, password } = req.body

    if (!username || !email || !password) {
        return res.status(400).json({ "message": "All fields are required" })
    }

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
        res.status(200).json({ message: "Updated successfully" });
    } catch (error) {
        console.log('user updation failed', error);

        res.status(500).json({ error: 'Server error' });
    }
}


module.exports = { registerUser, loginUser, updateUser }