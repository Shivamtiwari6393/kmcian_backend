const express = require('express')
const router = express.Router()

const {postReply, getReply} = require('../controllers/replyController')

router.post("/", postReply)

router.get("/:queryId",getReply)


module.exports = router