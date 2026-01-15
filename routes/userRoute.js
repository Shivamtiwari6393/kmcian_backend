const express = require('express');
const { registerUser, loginUser, updateUser, userData } = require("../controllers/userController");
const protect = require('../middleware/auth');
const router = express.Router();


router.post('/v1/register',protect, registerUser);
router.post('/v2/register',registerUser);
router.put('/update', updateUser);
router.post('/login', loginUser);
router.get("/", userData)

module.exports = router;
