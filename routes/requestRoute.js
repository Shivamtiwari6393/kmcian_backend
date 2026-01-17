const express = require('express')
const router = express.Router()
const { getCount, getLogs} = require("../controllers/requestController")
const protect = require('../middleware/auth')

router.get('/v1',getCount)
router.get('/v2/logs/:name', getLogs)

module.exports =  router