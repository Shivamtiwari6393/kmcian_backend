const Paper = require("../models/paperModel")
const postPaper = async (req, res) => {

    console.log("Post request from -----", req.rawHeaders[21])
    const { course, branch, paper, semester, name,year } = req.body
    console.log(req.body);
    

    if (!course || !branch || !paper || !semester || !(req?.file?.buffer || false) || !year) {
        return res.status(400).json({ error: "All fields are required" })
    }
    const pdf = req.file.buffer
    const pdfContentType = req.file.mimetype
    try {

        console.log("inside try");
        const newPaper = new Paper({ course, branch, paper, semester, pdf, pdfContentType, downloadable: false, name,year })

        await newPaper.save();

        console.log("saved in database");
        res.status(201).json({message: "File uploaded sucessfully"})

    }
    catch (e) {
        console.log("inside catch");
        res.status(500).json({ error: "internal server error" })
    }
}

module.exports = postPaper