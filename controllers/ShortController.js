const cloudinary = require("../config/cloudinary.js");
const Short = require("../models/ShortModel.js");

// ===================get metadata======================

const getProtectedMetaData = async (req, res) => {
  try {
    const limit = 5;
    const cursor = req.query.cursor;
    let query = null;

    if (req.user?.role === "admin") {
      query = cursor ? { createdAt: { $lt: cursor }, show: 2 } : { show: 2 };
    }

    if (req.user?.role === "superadmin") {
      query = cursor ? { createdAt: { $lt: cursor } } : {};
    }

    if (req.user.role === "user") {
      query = cursor ? { createdAt: { $lt: cursor }, show: 1 } : { show: 1 };
    }

    if (query) {
      const shorts = await Short.find(query)
        .sort({ createdAt: -1 })
        .limit(limit)
        .populate("uploadedBy", "username");

      res.status(200).json({
        shorts,
        nextCursor: shorts.length ? shorts[shorts.length - 1].createdAt : null,
      });
    }
  } catch (err) {
    console.log("error in fetching protected metadata", err);

    return res.status(500).json({ message: err.message });
  }
};


const getMetaData = async (req, res) => {
  try {
    const limit = 5;
    const cursor = req.query.cursor;
    const query = cursor
      ? { createdAt: { $lt: cursor }, show: 1 }
      : { show: 1 };

    const shorts = await Short.find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .populate("uploadedBy", "username");

    return res.status(200).json({
      shorts,
      nextCursor: shorts.length ? shorts[shorts.length - 1].createdAt : null,
    });
  } catch (err) {
    console.log("error in fetching metadata", err);

    return res.status(500).json({ message: err.message });
  }
};

// ======================store metadata==========================

const postMetadata = async (req, res) => {
  try {
    const short = await Short.create({
      videoUrl: req.body.videoUrl,
      publicId: req.body.publicId,
      title: req.body.title,
      size: (req.body.size / (1024 * 1024)).toFixed(2),
      show: req.body.show,
      uploadedBy: req.body.userId || null,
    });

    res.status(201).json({
      message: "uploaded sccessfully",
    });
  } catch (error) {
    console.log("error in storing metadata", error.message);
    res.status(500).json({ message: error.message });
  }
};

// ==================delete short =============================

const deleteShort = async (req, res) => {
  if (req.user.role != "superadmin")
    return res.status(401).json({
      message: "You are not authorized,Please Login with admin email",
    });

  try {
    const { id } = req.params;
    // console.log(id);
    const short = await Short.findById(id);
    // console.log(short);
    if (!short) {
      return res.status(404).json({ message: "Short not found in DB" });
    }

    // delete video from cloudinary
    if (short.publicId) {
      const del = await cloudinary.uploader.destroy(short.publicId, {
        resource_type: "video",
      });
      // console.log("-------------", del);
      if (del.result === "ok") {
        await short.updateOne({ show: 4 });
        return res.json({
          message: "Short deleted successfully from cloudinary",
        });
      }
      return res.status(404).json({ message: del.result });
    }
    await short.updateOne({ show: 3 });
    return res.json({ message: "Short deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

//=====================  getsignedurl=================================

const getSignedUrl = async (req, res) => {
  try {
    const timestamp = Math.round(Date.now() / 1000);
    const paramsToSign = {
      timestamp,
      folder: "kmcian/shorts",
    };
    // console.log("singning", paramsToSign);
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
      message: "url generation completed",
    });
  } catch (error) {
    console.log("signed url generation failed", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getSignedUrl,
  getMetaData,
  deleteShort,
  postMetadata,
  getProtectedMetaData,
};
