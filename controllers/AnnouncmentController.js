const Announcment = require('../models/AnnouncmentModel')

//=========== Announcment Post Request==============

const postAnnouncment = async (req, res) => {

    try {
        const { content } = req.body

        // if no content

        if (!content) return res.status(400).json({ "message": "All fields is rquired" })

        // create new announcement
        const newAnnouncment = new Announcment({
            content: content
        })

        // save announcement

        await newAnnouncment.save()

        // respond with success
        res.status(201).json({ message: "Announcment uploaded sucessfully" })
    } catch (error) {
        console.log("error posting Announcment", error);

        return res.status(500).json({ 'message': 'Internal server error' })

    }
}



// ====================fetch======================


const getAnnouncment = async (req, res) => {


    try {
        const { page } = req.params || 1

        const skip = (page - 1) * 5

        const announcments = await Announcment.find().sort({ 'createdAt': -1 }).skip(skip).limit(5)

        const total = await Announcment.countDocuments()

        // total page

        totalPage = Math.ceil(total / 5)

        res.status(200).json({ announcments, totalPage })
    } catch (error) {
        console.log("error fetching Announcment", error);

        res.status(500).json({ 'message': "Internal Server Error" })
    }
}



//============== delete Announcment==================== 


const deleteAnnouncment = async (req, res) => {

    try {

        const { id } = req.body

        if (!id) return res.status(400).json({ "message": "ID is required" })

        const deletedAnnouncment = await Announcment.findByIdAndDelete(id)

        // if announcemt not deleted 

        if (!deletedAnnouncment) return res(400).json({ 'message': 'Announcment not found' })

        // if announcement deleted

        return res.status(200).json({ 'message': "Announcment Deleted Successfully" })

    } catch (error) {

        console.log("error deleting Announcment", error);

        return res.status(500).json({ message: "Internal Server Error" })

    }

}

module.exports = { postAnnouncment, getAnnouncment, deleteAnnouncment }