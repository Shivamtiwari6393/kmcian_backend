const mongoose = require('mongoose')

const logInInfo = new mongoose.Schema({
    username: String,
    email: String,
    ip: String,
}, { timestamps: true })


const logInInfoModel = mongoose.model("logInInfo", logInInfo)
module.exports = logInInfoModel