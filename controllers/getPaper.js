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

        const reqPaper = await Paper.find({ ...requestedData }, { pdf: 0, pdfContentType: 0 }).sort({ branch: 1, paper: 1, semester: 1, year: 1 })

        if (reqPaper.length === 0) {
            return res.status(404).json({ error: "No papers found" });
        }
        res.status(200).json(reqPaper)
    }
    catch (e) {
        console.log(e);

        res.status(500).json({ error: "internal server error" })

    }

}

module.exports = getPaper
