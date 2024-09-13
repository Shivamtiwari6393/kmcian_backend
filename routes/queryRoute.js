const express = require('express')
const router = express.Router()
const { postQuery, getQuery } = require("../controllers/queryController")



router.get('/:currentPage',getQuery)
router.post('/', postQuery)

module.exports =  router
