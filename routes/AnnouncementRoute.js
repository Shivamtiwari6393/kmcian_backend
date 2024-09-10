const express = require('express')
const router = express.Router()
const protect = require("../middleware/auth")



const {postAnnouncement,getAnnouncement,deleteAnnouncement} = require('../controllers/AnnouncementController')

router.get('/:page',getAnnouncement)
router.post('/',protect,postAnnouncement)
router.delete('/',protect,deleteAnnouncement)

module.exports = router