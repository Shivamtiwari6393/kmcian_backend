const express = require("express")
const router = express.Router()

const { postFlag, getFlag } = require("../controllers/flagController")
const protect = require("../middleware/auth")

router.get('/', getFlag)
router.post('/', postFlag)


module.exports = router