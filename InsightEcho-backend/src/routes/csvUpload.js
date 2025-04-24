const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const { bulkUpload } = require("../controllers/csvController");

router.post("/upload-csv", upload.single("file"), bulkUpload);

module.exports = router;
