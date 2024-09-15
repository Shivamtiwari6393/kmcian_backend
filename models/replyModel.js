const mongoose = require("mongoose");

const replySchema = mongoose.Schema({

    queryId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    content: {
        type: String,
        required: true
    }

}, { timestamps: true })

const replyModel = mongoose.model("reply", replySchema)

module.exports = replyModel