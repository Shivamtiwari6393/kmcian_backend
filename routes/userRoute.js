const express = require('express');
const { registerUser, loginUser, updateUser, userData } = require("../controllers/userController");
const protect = require('../middleware/auth');
const router = express.Router();


router.post('/register',protect, registerUser);
router.put('/update', updateUser);
router.post('/login', loginUser);
router.get("/", userData)

module.exports = router;
