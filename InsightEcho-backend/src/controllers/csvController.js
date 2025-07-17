const parseCSV = require("../utils/csvParser");
const validateReview = require("../utils/validateReview");
const { insertReviews } = require("../services/reviewService");

const bulkUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No CSV file provided" });
    }

    const parsedReviews = await parseCSV(req.file.buffer);

    const validReviews = [];
    const invalidReviews = [];

    for (const [index, review] of parsedReviews.entries()) {
      const { isValid, errors } = validateReview(review);
      if (isValid) {
        validReviews.push(review);
      } else {
        invalidReviews.push({ row: index + 1, review, errors });
      }
    }

    if (req.query.preview === "true") {
      return res.status(200).json({
        total: parsedReviews.length,
        valid: validReviews.length,
        invalid: invalidReviews.length,
        invalidReviews: invalidReviews.slice(0, 10),
      });
    }

    if (validReviews.length === 0) {
      return res
        .status(400)
        .json({ error: "No valid reviews found in CSV", invalidReviews });
    }

    await insertReviews(validReviews);

    res.status(200).json({
      message: `Inserted ${validReviews.length} reviews.`,
    });
  } catch (error) {
    console.error("CSV Upload Error:", error);
    res.status(500).json({ error: "Error processing CSV file" });
  }
};

module.exports = { bulkUpload };
