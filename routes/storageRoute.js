const express = require('express')
const getSignedUrl = require('../controllers/storageController')
const router = express.Router()


router.get('/url', getSignedUrl)


module.exports = router