const Reply = require("../models/replyModel")

const getReply = async (req, res) => {
    try {
        const queryId = req.params.queryId
        const reply = await Reply.find({ queryId: queryId }).sort({ createdAt: -1 })
        return res.status(200).json(reply)
    } catch (error) {
        console.log("error in fetching in reply ", error);
        return res.status(500).json({ message: "Server error" })
    }
}


const postReply = async (req, res) => {
    try {

        const { queryId, content } = req.body
        if (!content || !queryId) return res.status(400).json({ message: "All fields are required." })

        const newReply = new Reply({
            queryId: queryId,
            content: content
        }
        )
        await newReply.save()
        return res.status(200).json({ message: "Success! Replied successfully." })
    } catch (error) {
        console.log("error in posting reply", error);
        return res.status(500).json({ message: "Server error" })
    }

}

//============= update reply ================================


const updateReply = async (req, res) => {


    const { replyId } = req.query

    const { content } = req.body

    try {
        const updatedReply = await Reply.findByIdAndUpdate(replyId, { $set: { content: content } }, { new: true })
        if (updatedReply) return res.status(200).json({ message: "Success! Reply updated succesfully." })
        else return res.status(404).json({ message: 'Sorry! Reply not found.' })
    } catch (error) {
        console.log('error in updating reply ', error);
        return res.status(500).json({ message: 'Internal server error' })
    }

}



//================ delete many reply ===========================

const deleteManyReply = async (queryId) => {

    try {
        const deletedReply = await Reply.deleteMany({ "queryId": queryId })
        return deletedReply
    } catch (error) {
        console.log("error in deleting many reply");
        return false
    }
}


module.exports = { getReply, postReply, deleteManyReply, updateReply }