const express = require('express');
const { registerUser, loginUser, updateUser } = require("../controllers/userController")
const router = express.Router();


router.post('/register', registerUser);
router.put('/update', updateUser);
router.post('/login', loginUser);

module.exports = router;
