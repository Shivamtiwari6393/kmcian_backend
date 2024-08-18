const Paper = require("../models/paperModel")

const downloadPaper = async (req, res) => {
    const { paper, semester, branch } = req.query;
    console.log(paper,semester, branch);
    



    try {
        console.log("inside try dwnload");
        const reqPaper = await Paper.findOne({ paper, semester, branch });
        console.log(reqPaper);
        
        if (!reqPaper) {
            return res.status(404).json({ error: "Paper not found" });
        }
        res.setHeader('Content-Type', reqPaper.pdfContentType);
        res.setHeader('Content-Disposition', `attachment; filename="${reqPaper.paper}.pdf"`);
        console.log(reqPaper.paper);
        
        res.setHeader('X-Filename', `${reqPaper.paper}.pdf`);
        res.send(reqPaper.pdf);

    } catch (error) {

        console.log("inside catch dwnload", error);

        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = downloadPaper