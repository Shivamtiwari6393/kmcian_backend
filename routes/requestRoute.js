const express = require('express')
const router = express.Router()
const { getCount} = require("../controllers/requestController")



router.get('/',getCount)

module.exports =  router