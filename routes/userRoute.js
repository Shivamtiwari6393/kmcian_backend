const express = require('express');
const { registerUser, loginUser, updateUser } = require("../controllers/userController");
const protect = require('../middleware/auth');
const router = express.Router();


router.post('/register',protect, registerUser);
router.put('/update', updateUser);
router.post('/login', loginUser);

module.exports = router;
