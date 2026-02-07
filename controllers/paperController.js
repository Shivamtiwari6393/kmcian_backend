const Paper = require("../models/paperModel");
const User = require("../models/userModel");

// ===============download paper==================================

const downloadPaper = async (req, res) => {
  const { course, paper, semester, branch, year, t } = req.query;

  if (!course || !branch || !paper || !semester || !year) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // const Paper = mongoose.model("paper", paperSchema, course);
    const reqPaper = await Paper.findOne({
      paper: paper,
      semester: semester,
      branch: branch,
      year: year,
    });

    if (!reqPaper) {
      return res.status(404).json({ message: "Sorry! Paper not found" });
    }

    res.setHeader("Content-Type", reqPaper.pdfContentType);

    if (t === "d")
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${reqPaper.paper}.pdf"`,
      );
    if (t === "s")
      res.setHeader(
        "Content-Disposition",
        `inline; filename="${reqPaper.paper}.pdf"`,
      );
    res.status(200).send(reqPaper.pdf);
  } catch (error) {
    console.log("error in downloading paper", error);

    res.status(500).json({ message: "Internal Server Error" });
  }
};

//============= get paper ==========================

const getPaper = async (req, res) => {
  const { course, branch, semester, year } = req.body;
  if (!course || !branch || !semester || !year) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const requestedData = {
    course: course,
    downloadable: true,
  };

  if (semester !== "All") requestedData.semester = semester;
  if (year !== "All") requestedData.year = year;
  if (branch !== "All") requestedData.branch = branch;

  try {
    // const Paper = mongoose.model("paper", paperSchema);
    const reqPaper = await Paper.find(
      { ...requestedData },
      { pdf: 0, pdfContentType: 0 },
    ).sort({ paper: 1 });

    if (reqPaper.length === 0) {
      return res
        .status(404)
        .json({ message: "Sorry! Papers will be available soon." });
    }
    res.status(200).json(reqPaper);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//================== post paper=========================================

const postPaper = async (req, res) => {
  const { course, branch, paper, semester, name, year, userId, email } =
    req.body;

  if (
    !course ||
    !branch ||
    !paper ||
    !semester ||
    !(req?.file?.buffer || false) ||
    !year
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const pdf = req.file.buffer;
  const pdfContentType = req.file.mimetype;
  try {
    const newPaper = new Paper({
      course,
      branch,
      paper,
      semester,
      pdf,
      pdfContentType,
      downloadable: false,
      name,
      year,
      email,
    });

    const meta = await newPaper.save();

    if (meta && userId) {
      await User.findByIdAndUpdate(
        userId,
        {
          $push: {
            papers: {
              paperId: meta._id,
            },
          },
        },
        { new: true },
      );
    }
    res.status(201).json({ message: "Thankyou! Paper uploaded successfully." });
  } catch (e) {
    console.log("error in uploading paper", e);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//==================== update paper ================================

const updatePaper = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    // fields verification

    if (
      !id ||
      !data.course ||
      !data.branch ||
      !data.paper ||
      !data.semester ||
      !data.year ||
      !data.name ||
      !data.email
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // console.log(req.user.role, data.email);
    if (req.user?.role != "superadmin" && req.user?.email != data.email)
      return res.status(401).json({
        message:
          "You are not authorized,Please Login with email you uploaded this paper",
      });

    if (req.file) {
      data.pdf = req.file.buffer;
      data.pdfContentType = req.file.mimetype;
    }

    if (req.user?.role != "superadmin") data.downloadable = false;
    const updatedPaper = await Paper.findByIdAndUpdate(
      id,
      {
        $set: data,
      },
      { new: true },
    );

    if (!updatedPaper) {
      return res.status(404).json({ message: "Sorry! Paper not found" });
    }

    return res
      .status(200)
      .json({ message: "Thankyou! Paper has been updated." });
  } catch (error) {
    console.log("error in updating paper", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//====================== delete paper===================================

const deletePaper = async (req, res) => {
  if (req.user.role != "superadmin")
    return res.status(401).json({
      message: "You are not authorized,Please Login with admin email",
    });

  const { id } = req.params;

  try {
    if (!id) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const result = await Paper.findOne(
      { _id: id },
      { pdf: 0, pdfContentType: 0 },
    );

    if (!result) return res.status(404).json({ message: "Paper not found" });

    const email = result.email;

    if (email) {
      const user = await User.findOne({ email: email });
      // console.log("user", user);
      if (user) {
        const deletedPaper = await User.updateOne(
          { email: email },
          { $pull: { papers: { paperId: id } } },
        );
        // console.log(deletedPaper, "deleted");
      }
    }

    await Paper.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ message: "Paper deleted successfully.", result });
  } catch (error) {
    console.log("error in deleting paper", error);

    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getHiddenPapers = async (req, res) => {
  if (req.user.role != "superadmin")
    return res.status(401).json({
      message: "You are not authorized,Please Login with admin email",
    });

  try {
    const reqPaper = await Paper.find(
      { downloadable: false },
      { pdf: 0, pdfContentType: 0 },
    ).sort({ paper: 1 });

    if (reqPaper.length === 0) {
      return res.status(404).json({ message: "Sorry! No New Papers." });
    }
    res.status(200).json(reqPaper);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  downloadPaper,
  getPaper,
  getHiddenPapers,
  postPaper,
  updatePaper,
  deletePaper,
};
