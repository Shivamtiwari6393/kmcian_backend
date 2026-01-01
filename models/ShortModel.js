const mongoose = require('mongoose')
const shortSchema = new mongoose.Schema({
    videoUrl: String,
    publicId: String,
    caption: String,
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    views: { type: Number, default: 0 },
    size: String,
    show: Boolean
}, { timestamps: true });

module.exports = mongoose.model("Short", shortSchema);
