// routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

const router = express.Router();


router.get('/user', async (req, res) => {
    try {
      const user = await User.findOne(); // Adjust as needed for user identification
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  });


  // Update user data (no authentication middleware here)

router.put('/user', async (req, res) => {
    const { username, email, password } = req.body;
  
    try {
      const user = await User.findOne(); // Adjust as needed for user identification
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      user.username = username || user.username;
      user.email = email || user.email;
  
      if (password) {
        user.password = await bcrypt.hash(password, 10);
      }
  
      await user.save();
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  });

// Register a new user
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;


    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already in use' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        // Save the user to the database
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});




router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {

        console.log("inside try login");

        // Find the user by email
        const user = await User.findOne({ email });
        console.log(user);
        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        // Check if the password matches
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        // Send the token in the response


        res.status(200).json({ "User": "Valid" });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
