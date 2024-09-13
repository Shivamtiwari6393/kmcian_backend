const mongoose = require('mongoose')

const AnnouncementSchema = new mongoose.Schema({

    content: {
        type: String,
        required: true
    }

}, { timestamps: true })

const announcementModel = mongoose.model("Announcement", AnnouncementSchema)

module.exports = announcementModel