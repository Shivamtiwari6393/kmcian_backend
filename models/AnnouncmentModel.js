const mongoose = require('mongoose')

const AnnouncmentSchema = new mongoose.Schema({

    content: {
        type: String,
        required: true
    }

}, { timestamps: true })

const Announcment = mongoose.model("Announcment", AnnouncmentSchema)

module.exports = Announcment