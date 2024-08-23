const Paper = require("../models/paperModel")

const UpdatePaper = async (req, res) => {

    try {
        const { id } = req.params
        const data = JSON.parse(req.body)

        const updatedPaper = await Paper.findByIdAndUpdate(id, {
            $set: data
        }, { new: true })


        if (!updatedPaper) {
            return res.status(404).json({ message: "Paper not found" })
        }

        res.status(200).json({ message: "Paper Updated" })


    } catch (error) {
        res.status(500).json({ message: "Error updating Paper" })
    }

}

module.exports = UpdatePaper

