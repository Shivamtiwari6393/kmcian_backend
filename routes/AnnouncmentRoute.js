const express = require('express')
const router = express.Router()

const {postAnnouncment,getAnnouncment,deleteAnnouncment} = require('../controllers/AnnouncmentController')

router.get('/:page',getAnnouncment)
router.post('/',postAnnouncment)
router.delete('/',deleteAnnouncment)

module.exports = router