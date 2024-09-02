const paperSchema = require("../models/paperSchema")
const mongoose = require('mongoose')

const UpdatePaper = async (req, res) => {

    try {
        const { id } = req.params
        const data = req.body


        // fields verification

        if(!data.course || !data.branch || !data.paper|| !data.semester|| !data.year|| !data.name|| !data.downloadable ) {
            return res.status(400).json({"message":"All fields are required"})
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
        console.log("inside update paper catch",error);
        res.status(500).json({ message: "Error updating Paper" })
    }

}

module.exports = UpdatePaper


