const protect = require("../middleware/auth.js");
const express = require('express');
const router = express.Router();
const { deleteShort, postMetadata, getMetaData, getSignedUrl, getProtectedMetaData } = require('../controllers/ShortController.js');


//==========================get signed url===============================


router.get("/signupload", getSignedUrl);


//========================= fetch short metadata===========================


router.get("/", getMetaData);



//========== get protected short metadata=====================


router.get("/c",protect, getProtectedMetaData);

// ================upload metadata==============================


router.post("/uploadmetadata", postMetadata);


// ====================delete short end point================================ 


router.delete("/delete/:id", protect, deleteShort)


// ===============================================================================================

module.exports = router;
