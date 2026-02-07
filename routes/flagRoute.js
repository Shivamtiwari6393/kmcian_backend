const express = require("express");
const router = express.Router();
const {
  postFlag,
  getFlag,
  deleteFlag,
} = require("../controllers/flagController");

router.get("/", getFlag);
router.post("/", postFlag);
router.delete("/:flagId", deleteFlag);

module.exports = router;
