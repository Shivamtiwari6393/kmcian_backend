
const mongoose = require('mongoose')
const paperSchema = require("../models/paperSchema")
const postPaper = async (req, res) => {

    console.log("Post request from -----", req.rawHeaders[21])
    const { course, branch, paper, semester, name, year } = req.body


    if (!course || !branch || !paper || !semester || !(req?.file?.buffer || false) || !year) {
        return res.status(400).json({ message: "All fields are required" })
    }
    const pdf = req.file.buffer
    const pdfContentType = req.file.mimetype
    try {

        // dynamic collection
        const Paper = mongoose.model("paper", paperSchema, course);
        const newPaper = new Paper({ course, branch, paper, semester, pdf, pdfContentType, downloadable: false, name, year })

        await newPaper.save();

        // console.log("saved in database");

        res.status(201).json({ message: "File uploaded sucessfully" })

    }
    catch (e) {
        console.log("error in uploading paper", e);
        res.status(500).json({ message: "Internal Server Error" })
    }
}

module.exports = postPaper