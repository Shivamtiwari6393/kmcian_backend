
const paperSchema = require("../models/paperSchema")
const mongoose = require('mongoose')

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

        return res.status(500).json({ message: "Failed to delete Paper" })

    }

}


module.exports = deletePaper