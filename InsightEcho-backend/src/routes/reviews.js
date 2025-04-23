const express = require("express");
const router = express.Router();

const { addReview, getAnalysis } = require("../controllers/reviewController");
const { getOrganizations } = require("../controllers/organizationController");

router.post("/reviews", addReview);

router.get("/analysis", getAnalysis);
router.get("/organizations", getOrganizations);

module.exports = router;
