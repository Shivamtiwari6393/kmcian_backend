const express = require('express')
const router = express.Router()

const {getNewPaperInfo} = require('../controllers/newPaperInfoController')


router.get('/', getNewPaperInfo)


module.exports = router