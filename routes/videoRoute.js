const Short = require('../models/ShortModel');
const protect = require("../middleware/auth");
const express = require('express');
const router = express.Router();
const cloudinary = require("../config/cloudinary.js");
const { deleteShort } = require('../controllers/ShortController.js');


router.get("/signupload", async (req, res) => {
  try {
    const timestamp = Math.round(Date.now() / 1000);
    const paramsToSign = {
      timestamp,
      folder: "kmcian/shorts",
    };
    console.log("singning", paramsToSign);
    const signature = cloudinary.utils.api_sign_request(
      paramsToSign,
      process.env.API_SECRET
    );
    res.status(200).json({
      signature,
      timestamp,
      cloudName: process.env.CLOUD_NAME,
      apiKey: process.env.API_KEY,
      folder: "kmcian/shorts",
      message: "url generation completed"
    });

  } catch (error) {
    console.log("signed url generation failed", error);
    res.status(500).json({ message: error.message })

  }
});


router.get("/", async (req, res) => {
  try {
    const limit = 5;
    const cursor = req.query.cursor;

    const query = cursor
      ? { createdAt: { $lt: cursor } }
      : {};

    const shorts = await Short.find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .populate("uploadedBy", "name");

    res.status(200).json({
      shorts,
      nextCursor: shorts.length
        ? shorts[shorts.length - 1].createdAt
        : null,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/uploadmetadata", async (req, res) => {
  try {
    const short = await Short.create({
      videoUrl: req.body.videoUrl,
      publicId: req.body.publicId,
      // caption: req.body.caption,
      size: (req.body.size / (1024 * 1024)).toFixed(2)
    });

    res.status(201).json({
      message: "upload sccessfull",
      short,
    });
  } catch (error) {
    console.log("error in storing metadata", error.message);

    res.status(500).json({ message: error.message });
  }
});


router.delete("/delete/:id", deleteShort)

module.exports = router;
