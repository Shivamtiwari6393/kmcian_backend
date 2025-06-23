const mongoose = require('mongoose')

const flagSchema = new mongoose.Schema({
    paperId: {
        type: mongoose.Schema.Types.ObjectID,
        required: true
    },

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
    year: {
        type: String,
        required: true

    }, 
    name: {
        type: String,
        required: true

    },
    description: {

        type: String,
        required: true
    }


}, {
    timestamps: true
})


const flagModel = mongoose.model("flag", flagSchema)

module.exports = flagModel