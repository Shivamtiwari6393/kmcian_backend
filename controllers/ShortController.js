const cloudinary = require("../config/cloudinary.js");
const Short = require("../models/ShortModel.js");

// ===================get metadata======================

const getMetaData = async (req, res) => {
    try {
        const limit = 5;
        const cursor = req.query.cursor;
        const c = req.query.c;
        let query = null
        if (c === "abzlkmn") {
            query = cursor
                ? { createdAt: { $lt: cursor } }
                : {};
        }
        else {

            query = cursor
                ? { createdAt: { $lt: cursor }, show: true }
                : { show: true };

        }

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
}


// ======================store metadata========================== 



const postMetadata = async (req, res) => {
    try {
        const short = await Short.create({
            videoUrl: req.body.videoUrl,
            publicId: req.body.publicId,
            // caption: req.body.caption,
            size: (req.body.size / (1024 * 1024)).toFixed(2),
            show: req.body.show
        });

        res.status(201).json({
            message: "uploaded sccessfully",
            short,
        });
    } catch (error) {
        console.log("error in storing metadata", error.message);

        res.status(500).json({ message: error.message });
    }
}


// ==================delete short =============================

const deleteShort = async (req, res) => {
    try {
        const { id } = req.params;
        // console.log(id);
        const short = await Short.findById(id);
        // console.log(short);
        if (!short) {
            return res.status(404).json({ message: "Short not found" });
        }

        // delete video from cloudinary
        if (short.publicId) {
            const del = await cloudinary.uploader.destroy(short.publicId, {
                resource_type: "video",
            });
            // console.log("-------------", del);
            if (del.result === "ok") return res.json({ message: "Short deleted successfully" });
            return res.status(404).json({ message: del.result })
        }
        await short.deleteOne();
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
}


module.exports = { getSignedUrl, getMetaData, deleteShort, postMetadata }


