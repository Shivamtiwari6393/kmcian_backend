const Log = require("../models/log")

const getCount = async (req, res) => {

    try {
        const count = await Log.countDocuments()
        return res.status(200).json({ count: count })
    } catch (error) {
        return res.status(500).json({ message: "Server error" })

    }
}


const getLogs = async (req, res) => {
    const name = req.params.name
    if (name === "shivam") {
        const logs = await Log.find()
        return res.status(200).json(logs)

    }
    return res.status(200).json("pareshan mat kar bdsk")
}

module.exports = { getCount, getLogs }