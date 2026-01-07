const Flag = require("../models/flagModel")


//=============== flag post ================

const postFlag = async (req, res) => {
  try {
    const { _id, course, branch, paper, semester, description, year, name } = req.body

    if (!_id || !description) return res.status(400).json({ "message": "All fields are required" })

    const flag = new Flag({
      paperId: _id,
      course: course,
      branch: branch,
      paper: paper,
      semester: semester,
      year: year,
      name: name,
      description: description
    })


    const savedFlag = await flag.save()
    return res.status(201).json({ "message": "flag uploaded" })

  } catch (error) {

    console.log(error, "error in uploading flag");
    return res.status(500).json({ "message": "Internal server error" })

  }

}


// get flag 


const getFlag = async (req, res) => {
  try {
    const flags = await Flag.find()
    return res.status(200).json(flags)
    
  } catch (error) {
    console.log(error, "err in get flag");
    return res.status(500).json({ "message": "Internal server error" })

  }

}


module.exports = { postFlag, getFlag }