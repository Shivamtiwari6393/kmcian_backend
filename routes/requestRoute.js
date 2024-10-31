const express = require('express')
const router = express.Router()
const { getCount, getLogs} = require("../controllers/requestController")
const protect = require('../middleware/auth')

router.get('/',getCount)
router.get('/logs/:name', getLogs)

module.exports =  router