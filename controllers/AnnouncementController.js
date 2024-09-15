const Announcement = require('../models/AnnouncementModel')

//=========== Announcement Post Request==============

const postAnnouncement = async (req, res) => {

    try {
        const content = JSON.parse(req.body)

        // if no content

        if (!content) return res.status(400).json({ "message": "All fields is rquired" })

        // create new announcement
        const newAnnouncement = new Announcement({
            content: content
        })

        // save announcement

        await newAnnouncement.save()

        // respond with success
        res.status(201).json({ message: "Announcement uploaded successfully" })
    } catch (error) {
        console.log("error posting Announcement", error);

        return res.status(500).json({ 'message': 'Internal server error' })

    }
}



// ====================fetch======================


const getAnnouncement = async (req, res) => {


    try {
        const currentPage = Number(req.params.currentPage) || 1

        const skip = (currentPage - 1) * 5

        const announcements = await Announcement.find().sort({ 'createdAt': -1 }).skip(skip).limit(5)

        const total = await Announcement.countDocuments()

        // total page

        totalPage = Math.ceil(total / 5)

        res.status(200).json({ announcements, currentPage, totalPage })
    } catch (error) {
        console.log("error fetching Announcement", error);

        res.status(500).json({ 'message': "Internal Server Error" })
    }
}



//============== delete Announcement==================== 


const deleteAnnouncement = async (req, res) => {

    try {

        const { id } = req.body

        if (!id) return res.status(400).json({ "message": "ID is required" })

        const deletedAnnouncement = await Announcement.findByIdAndDelete(id)

        // if announcemt not deleted 

        if (!deletedAnnouncement) return res(400).json({ 'message': 'Announcement not found' })

        // if announcement deleted

        return res.status(200).json({ 'message': "Announcement Deleted Successfully" })

    } catch (error) {

        console.log("error deleting Announcement", error);

        return res.status(500).json({ message: "Internal Server Error" })

    }

}

module.exports = { postAnnouncement, getAnnouncement, deleteAnnouncement }