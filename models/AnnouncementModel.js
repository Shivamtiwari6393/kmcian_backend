const mongoose = require('mongoose')

const AnnouncementSchema = new mongoose.Schema({

    content: {
        type: String,
        required: true
    }

}, { timestamps: true })

const Announcement = mongoose.model("Announcement", AnnouncementSchema)

module.exports = Announcement