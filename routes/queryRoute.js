const express = require('express')
const router = express.Router()
const { postQuery, getQuery, deleteQuery } = require("../controllers/queryController")
const protect = require('../middleware/auth')



router.get('/:currentPage', getQuery)
router.post('/', postQuery)
router.delete('/', protect, deleteQuery)

module.exports = router
