const protect = require("../middleware/auth.js");
const express = require('express');
const router = express.Router();
const { deleteShort, postMetadata, getMetaData, getSignedUrl, getProtectedMetaData } = require('../controllers/ShortController.js');


//==========================get signed url===============================


router.get("/v1/signupload", getSignedUrl);


//========================= fetch short metadata===========================


router.get("/v2", getMetaData);



//========== get protected short metadata=====================


router.get("/v3",protect, getProtectedMetaData);

// ================upload metadata==============================


router.post("/uploadmetadata", postMetadata);


// ====================delete short end point================================ 


router.delete("/delete/:id", protect, deleteShort)


// ===============================================================================================

module.exports = router;
