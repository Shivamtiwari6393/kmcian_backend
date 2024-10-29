const Comment = require("../models/CommentModel")

const postComment = async (req, res) => {

    const { comment } = JSON.parse(req.body)

    try {
        const newComment = new Comment({ 'comment': comment })
        const storedComment = await newComment.save()
        res.status(201).json({ 'message': "Comment Posted Successfully" })
    } catch (error) {
        res.status(500).json({ "message": "Internal Server Error" })
        console.log("error in uploading comment");
    }

}


module.exports = postComment

