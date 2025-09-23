const mongoose = require('mongoose')
const paperSchema = new mongoose.Schema({
    course: {
        type: String,
        required: true
    },
    branch: {

        type: String,
        required: true

    },

    paper: {
        type: String,
        required: true

    },
    semester: {
        type: String,
        required: true

    },
    pdf: {
        type: Buffer,
        required: true
    },
    pdfContentType: {
        type: String,
        required: true
    },

    downloadable: {
        type: Boolean,
        required: true
    },

    name: {
        type: String,
    },
    year: {
        type: String
    },
    uploader: {
        type: String
    }

}, { timestamps: true })


module.exports = paperSchema