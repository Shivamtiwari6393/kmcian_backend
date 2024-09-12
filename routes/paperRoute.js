const express = require("express");
const router = express.Router()

// const getPaper = require("../controllers/getPaper")
// const postPaper = require("../controllers/postPaper")
// const downloadPaper = require("../controllers/downloadPaper")
const multer = require('multer');
// const updatePaper  = require("../controllers/UpdatePaper");
// const deletePaper = require("../controllers/deletePaper")

const {getPaper, postPaper, updatePaper, deletePaper, downloadPaper} = require("../controllers/paperController")




const upload = multer({ storage: multer.memoryStorage() })
const protect = require("../middleware/auth")

router.post(`/`, getPaper)
router.post('/post', upload.single('pdf'), postPaper)

router.get('/download',downloadPaper);

router.put('/update/:id',protect,upload.single('pdf'),updatePaper)

router.delete('/delete/:course/:id',protect,deletePaper)

module.exports = router
