const express = require("express");
const router = express.Router();

const { getInsights } = require("../controllers/insightControler");

router.get("/insights", getInsights);

module.exports = router;
