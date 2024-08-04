const Paper = require("../models/paperModel")

const downloadPaper = async (req, res) => {
    const { course, semester, branch } = req.query;



    try {
        console.log("inside try dwnload");
        const paper = await Paper.findOne({ course, semester, branch });
        if (!paper) {
            return res.status(404).json({ error: "Paper not found" });
        }
        res.setHeader('Content-Type', paper.pdfContentType);
        res.setHeader('Content-Disposition', `attachment; filename="${paper.paper}.pdf"`);
        res.setHeader('X-Filename', `${paper.paper}.pdf`);
        res.send(paper.pdf);

    } catch (error) {

        console.log("inside catch dwnload", error);

        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = downloadPaper