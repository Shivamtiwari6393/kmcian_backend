const express = require('express')
const router = express.Router()

const {postAnnouncement,getAnnouncement,deleteAnnouncement} = require('../controllers/AnnouncementController')

router.get('/',getAnnouncement)
router.post('/',postAnnouncement)
router.delete('/',deleteAnnouncement)

module.exports = router