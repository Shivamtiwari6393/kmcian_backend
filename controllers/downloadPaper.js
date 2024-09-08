const paperSchema = require("../models/paperSchema")
const mongoose = require('mongoose')

const downloadPaper = async (req, res) => {
    const { course, paper, semester, branch, year } = req.query;

    try {

        const Paper = mongoose.model("paper", paperSchema, course);

        const reqPaper = await Paper.findOne({ paper: paper, semester: semester, branch: branch, year: year });

        if (!reqPaper) {
            return res.status(404).json({ message: "Paper not found" });
        }

        res.setHeader('Content-Type', reqPaper.pdfContentType);
        res.setHeader('Content-Disposition', `attachment; filename="${reqPaper.paper}.pdf"`);

        res.status(200).send(reqPaper.pdf);

    } catch (error) {
        console.log("error in downloading paper",error);

        res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = downloadPaper