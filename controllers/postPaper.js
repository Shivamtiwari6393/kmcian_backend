const Paper = require("../models/paperModel")
const postPaper = async (req, res) => {

    console.log("Post request from -----", req.rawHeaders[21])
    const { course, branch, paper, semester } = req.body
    const pdf = req.file.buffer
    const pdfContentType = req.file.mimetype

    console.log(course, branch, paper, semester,pdf,pdfContentType,"inside post papers");


    try {
        console.log("inside try");
        if (!course || !branch || !paper|| !semester || !pdf) {
            return res.status(400).json({ error: "all field are required" })
        }
        const newPaper = new Paper({ course, branch, paper, semester,pdf,pdfContentType })
        await newPaper.save();

        console.log("saved in database");
        res.status(201).json(newPaper)

    }
    catch (e) {

        console.log("inside catch");

         
        res.status(500).json({ error: "internal server error" })

    }
}

module.exports = postPaper