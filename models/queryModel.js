const mongoose = require('mongoose')

const querySchema = mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    name: {
        type: String,
    }
}, { timestamps: true })


const queryModel = mongoose.model("query", querySchema)

module.exports = queryModel