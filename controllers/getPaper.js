const Paper = require("../models/paperModel")

const getPaper = async (req, res) => {

    console.log("GET request from -----", req.rawHeaders[21])

    const { course, branch, semester } = req.body

    try {
        const reqPaper = await Paper.find({ course: course, branch: branch, semester: semester, downloadable: false }, { pdf: 0, pdfContentType: 0 })
        if (reqPaper.length === 0) {
            return res.status(404).json({ error: "No papers found" });
        }
        res.status(200).json(reqPaper)
    }
    catch (e) {
        res.status(500).json({ error: "internal server error" })

    }

}

module.exports = getPaper