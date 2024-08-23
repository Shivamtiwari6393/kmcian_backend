const express = require("express");
const router = express.Router()

const getPaper = require("../controllers/getPaper")
const postPaper = require("../controllers/postPaper")
const downloadPaper = require("../controllers/downloadPaper")
const multer = require('multer');
const updatePaper  = require("../controllers/UpdatePaper");
const deletePaper = require("../controllers/deletePaper")
const upload = multer({ storage: multer.memoryStorage() })


router.post(`/api/paper`, getPaper)
router.post('/api/paper/upload', upload.single('pdf'), postPaper)

router.get('/api/paper/download',downloadPaper);

router.put('/api/paper/update/:id',upload.single('updatedpdf'),updatePaper)

router.delete('/api/paper/delete/:id',deletePaper)




module.exports = router
