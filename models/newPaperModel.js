const mongoose = require('mongoose')


const newPaper = new mongoose.Schema(

    {
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

        name: {
            type: String,
        },
        year: {
            type: String
        }

    }, { timestamps: true }

)

const newPaperModel = mongoose.model('newPaper', newPaper)


module.exports = newPaperModel