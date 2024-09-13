const mongoose = require('mongoose')

const log = new mongoose.Schema({
    method: String,
    url: String,
    ip: String,
}, { timestamps: true })


const Log = mongoose.model("Log", log)
module.exports = Log