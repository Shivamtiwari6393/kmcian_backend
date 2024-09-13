const Log = require("../models/log")

const getCount = async (req, res) => {

    try {
        const count = await Log.countDocuments()
        return res.status(200).json({ count: count })
    } catch (error) {
        return res.status(500).json({ message: "Server error" })

    }


}

module.exports = { getCount }