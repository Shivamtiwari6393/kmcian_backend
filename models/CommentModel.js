const mongoose = require('mongoose')


const commentSchema = new mongoose.Schema({

    comment : {
        type: String,
        required : true
    }

}, {timeseries: true})

const commentModel = mongoose.model("Comment", commentSchema)

module.exports = commentModel  