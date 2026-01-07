const newPaper = require("../models/newPaperModel")


const getNewPaperInfo = async (req, res) => {

    try {
        const newPapers = await newPaper.find().short({createdAt: -1})
        res.status(200).json(newPapers)
    } catch (error) {

        console.log('error in fetching all new uploaded papers');
        res.status(500).json({ 'message': 'Internal server error' })

    }

}


module.exports = {getNewPaperInfo}