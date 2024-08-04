const express = require("express");
const router = express.Router()

const getPaper = require("../controllers/getPaper")
const postPaper = require("../controllers/postPaper")
const downloadPaper = require("../controllers/downloadPaper")
const multer = require('multer')
const upload = multer({ storage: multer.memoryStorage() })


router.post(`/api/paper`, getPaper)
router.post('/api/paper/upload', upload.single('pdf'), postPaper)

router.get('/api/paper/download',downloadPaper);




module.exports = router
