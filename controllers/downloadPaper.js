const Paper = require("../models/paperModel")

const downloadPaper = async (req, res) => {
    const { paper, semester, branch } = req.query;
    console.log(paper, semester, branch);

    try {

        const reqPaper = await Paper.findOne({ paper, semester, branch });

        if (!reqPaper) {
            return res.status(404).json({ error: "Paper not found" });
        }
        
        res.setHeader('Content-Type', reqPaper.pdfContentType);
        res.setHeader('Content-Disposition', `attachment; filename="${reqPaper.paper}.pdf"`);

        res.send(reqPaper.pdf);

    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = downloadPaper