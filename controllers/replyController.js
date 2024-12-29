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

        const { queryId, content } = JSON.parse(req.body)
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


module.exports = { getReply, postReply, deleteManyReply }