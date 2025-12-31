const cloudinary = require("../config/cloudinary.js");
const Short = require("../models/ShortModel.js");

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

module.exports = { deleteShort }


