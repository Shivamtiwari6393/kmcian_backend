const Short = require('../models/ShortModel');
const protect = require("../middleware/auth");
const express = require('express');
const router = express.Router();
const { deleteShort, postMetadata, getMetaData, getSignedUrl, getData } = require('../controllers/ShortController.js');


//========================== signed url===============================


router.get("/signupload", getSignedUrl);


//========================= fetch metadata===========================


router.get("/", getMetaData);



// ================upload metadata==============================



router.get("/c",protect, getData);



router.post("/uploadmetadata", postMetadata);


// ====================delete short end point================================ 


router.delete("/delete/:id", protect, deleteShort)


// ===============================================================================================

module.exports = router;
