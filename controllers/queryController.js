const Query = require("../models/queryModel")

const { deleteManyReply } = require("./replyController")



// get query 
const getQuery = async (req, res) => {

    try {
        const currentPage = Number(req.params.currentPage) || 1

        const skip = (currentPage - 1) * 5
        const query = await Query.find().sort({ 'createdAt': -1 }).skip(skip).limit(5)
        const total = await Query.countDocuments()
        // total page
        totalPage = Math.ceil(total / 5)
        return res.status(200).json({ query, currentPage, totalPage })

    } catch (error) {

        console.log(error, "error in fetching query");
        res.status(500).json({ message: "Server error" })

    }

}

// post query 

const postQuery = async (req, res) => {

    try {
        const { content, name } = JSON.parse(req.body)

        if (!content || !name) return res.status(400).json({ message: "All fields are required" })
        const newQuery = new Query({
            content: content,
            name: name
        })
        const storedQuery = await newQuery.save()
        if (storedQuery) return res.status(201).json({ message: "Query uploaded successfully" })
    } catch (error) {

        console.log("error in post query", error);
        res.status(500).json({ message: "Server error" })
    }

}


//==================== delete query===============


const deleteQuery = async (req, res) => {

    const { queryId } = JSON.parse(req.body)
    if (!queryId) return res.status(400).json({ "message": "ID is required" })

    try {
        const deletedQuery = await Query.findByIdAndDelete(queryId)

        if (!deletedQuery) return res.status(400).json({ "message": "Query not found" })

            // deleting corresponding replies
        await deleteManyReply(queryId)

        return res.status(200).json({ "message": "Query deleted successfully" })

    } catch (error) {
        console.log("error in deleting query", error);

        return res.status(500).json({ "message": "Internal server error" })
    }

}





module.exports = { postQuery, getQuery, deleteQuery }