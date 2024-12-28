const newPaperInfo = require("../models/newPaperModel");
const paperSchema = require("../models/paperSchema")
const mongoose = require('mongoose')



// download paper 

const downloadPaper = async (req, res) => {
    const { course, paper, semester, branch, year, t } = req.query;
    try {

        const Paper = mongoose.model("paper", paperSchema, course);
        const reqPaper = await Paper.findOne({ paper: paper, semester: semester, branch: branch, year: year });

        if (!reqPaper) {
            return res.status(404).json({ message: "Paper not found" });
        }

        res.setHeader('Content-Type', reqPaper.pdfContentType);

        if (t === 'd') res.setHeader('Content-Disposition', `attachment; filename="${reqPaper.paper}.pdf"`);
        if (t === 's') res.setHeader('Content-Disposition', `inline; filename="${reqPaper.paper}.pdf"`);
        res.status(200).send(reqPaper.pdf);

    } catch (error) {
        console.log("error in downloading paper", error);

        res.status(500).json({ message: "Internal Server Error" });
    }
}







// get paper 


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
            return res.status(404).json({ message: "Sorry, Papers will be available soon" });
        }
        res.status(200).json(reqPaper)
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ message: "Internal Server Error" })

    }

}



// post paper 


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


        const paperInfo = new newPaperInfo({
            course: course,
            branch: branch,
            paper: paper,
            semester: semester,
            name: name,
            year: year
        })
        // console.log("saved in database");
        await paperInfo.save()
        res.status(201).json({ message: "File uploaded successfully" })
    }
    catch (e) {
        console.log("error in uploading paper", e);
        return res.status(500).json({ message: "Internal Server Error" })
    }
}




// update paper 



const updatePaper = async (req, res) => {

    try {
        const { id } = req.params
        const data = req.body


        // fields verification

        if (!data.course || !data.branch || !data.paper || !data.semester || !data.year || !data.name || !data.downloadable) {
            return res.status(400).json({ "message": "All fields are required" })
        }

        // console.log(data,"inside update");


        if (req.file) {
            data.pdf = req.file.buffer;
            data.pdfContentType = req.file.mimetype;
        }


        const Paper = mongoose.model("paper", paperSchema, data.course);

        const updatedPaper = await Paper.findByIdAndUpdate(id, {
            $set: data
        }, { new: true })


        if (!updatedPaper) {

            return res.status(404).json({ message: "Paper not found" })
        }

        res.status(200).json({ message: "Paper Updated" })


    } catch (error) {
        console.log("error in updating paper", error);
        res.status(500).json({ message: "Internal Server Error" })
    }

}



// delete paper




const deletePaper = async (req, res) => {
    const { id, course } = req.params


    try {
        const Paper = mongoose.model("paper", paperSchema, course);

        const deletedPaper = await Paper.findByIdAndDelete(id)

        if (!deletedPaper) {
            return res.status(404).json({ message: "Paper not found" })
        }

        return res.status(200).json({ message: "Paper deleted successfully" })


    } catch (e) {
        console.log("error in deleting paper", error);

        return res.status(500).json({ message: "Internal Server Error" })

    }

}



module.exports = { downloadPaper, getPaper, postPaper, updatePaper, deletePaper }