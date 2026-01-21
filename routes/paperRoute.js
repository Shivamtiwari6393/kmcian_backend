const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const multer = require("multer");
const {
  getPaper,
  postPaper,
  updatePaper,
  deletePaper,
  downloadPaper,
  getHiddenPapers,
} = require("../controllers/paperController");

const upload = multer({ storage: multer.memoryStorage() });

router.get(`/v1`, getHiddenPapers);
router.post(`/v1`, getPaper);
router.post("/v2", upload.single("pdf"), postPaper);
router.get("/download", downloadPaper);
router.put("/update/:id", protect, upload.single("pdf"), updatePaper);
router.delete("/delete/:id", protect, deletePaper);

module.exports = router;
