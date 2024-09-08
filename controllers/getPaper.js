const paperSchema = require("../models/paperSchema")
const mongoose = require('mongoose')

const getPaper = async (req, res) => {


    const { course, branch, semester, year, downloadable } = req.body


    const requestedData = {
        course: course,
        downloadable: downloadable,
    }

    if (semester !== "All") requestedData.semester = semester
    if (year !== "All") requestedData.year = year
    if (branch !== "All") requestedData.branch = branch

    try {
        const Paper = mongoose.model("paper", paperSchema, course);

        const reqPaper = await Paper.find({ ...requestedData }, { pdf: 0, pdfContentType: 0 }).sort({ paper: 1 })

        if (reqPaper.length === 0) {
            return res.status(404).json({ message: "No papers found" });
        }
        res.status(200).json(reqPaper)
    }
    catch (e) {
        console.log(e);

        res.status(500).json({ message: "Internal Server Error" })

    }

}

module.exports = getPaper
