const express = require("express");
const router = express.Router()
const protect = require("../middleware/auth")
const multer = require('multer');
const {getPaper, postPaper, updatePaper, deletePaper, downloadPaper} = require("../controllers/paperController")


const upload = multer({ storage: multer.memoryStorage() })


router.post(`/`, getPaper)
router.post('/post', upload.single('pdf'), postPaper)
router.get('/download',downloadPaper);
router.put('/update/:id',protect,upload.single('pdf'),updatePaper)
router.delete('/delete/:course/:id',protect,deletePaper)

module.exports = router
