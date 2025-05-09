const parseCSV = require("../utils/csvParser");
const validateReview = require("../utils/validateReview");
const { insertReviews } = require("../services/reviewService");

const bulkUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No CSV file provided" });
    }

    const parsedReviews = await parseCSV(req.file.buffer);

    const validReviews = parsedReviews.filter(validateReview);

    if (validReviews.length === 0) {
      return res.status(400).json({ error: "No valid reviews found in CSV" });
    }

    await insertReviews(validReviews);

    res
      .status(200)
      .json({ message: `Inserted ${validReviews.length} reviews.` });
  } catch (error) {
    console.error("CSV Upload Error:", error);
    res.status(500).json({ error: "Error processing CSV file" });
  }
};

module.exports = { bulkUpload };
