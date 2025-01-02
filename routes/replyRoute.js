const express = require('express')
const router = express.Router()

const {postReply, getReply, updateReply} = require('../controllers/replyController')

router.post("/", postReply)

router.get("/:queryId",getReply)

router.put('/update', updateReply)


module.exports = router