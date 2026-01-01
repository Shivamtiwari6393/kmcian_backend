const mongoose = require('mongoose')

const logInInfo = new mongoose.Schema({
    ip: String,
    email: String,
    useName: String
}, { timestamps: true })


const logInInfoModel = mongoose.model("logInInfo", logInInfo)
module.exports = logInInfoModel