const Comment = require("../models/CommentModel")

const postComment = async (req, res) => {

    const { comment } = JSON.parse(req.body)
    if (!comment) {
        return res.status(400).json({ "message": "All fields are required" })
    }

    try {
        const newComment = new Comment({ 'comment': comment })
        const storedComment = await newComment.save()
        res.status(201).json({ 'message': "Thankyou! Response posted successfully." })
    } catch (error) {
        console.log("error in uploading comment");
        res.status(500).json({ "message": "Internal Server Error" })
    }

}


module.exports = postComment

