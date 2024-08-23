
const Paper = require("../models/paperModel")

const deletePaper = async (req, res) => {
    const { id } = req.params

    try {

        const deletedPaper = await Paper.findByIdAndDelete(id)

        if (!deletePaper) {
            res.status(404).json({ message: "Paper not found" })
        }
        res.status(200).json({ message: "Paper deleted successfully" })


    } catch (e) {

        res.status(500).json({ message: "Failed to delete Paper" })

    }

}


module.exports = deletePaper