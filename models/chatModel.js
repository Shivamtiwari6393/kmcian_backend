const mongoose = require('mongoose')

const chatSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },

    sender: {
        type: String
    },
    timestamp: {
        type: Date,
        default: Date.now,
    }
})

const chatModel = mongoose.model("Chat", chatSchema)

module.exports = chatModel