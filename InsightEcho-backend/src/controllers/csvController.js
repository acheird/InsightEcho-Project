const parseCSV = require("../utils/csvParser");
const validateReview = require("../utils/validateReview");
const { insertReviews } = require("../services/reviewService");

const bulkUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No CSV file provided" });
    }

    const parsedReviews = await parseCSV(req.file.buffer);

    const validationResults = parsedReviews.map((review, index) => {
      const result = validateReview(review);
      return {
        index: index + 1,
        isValid: result.isValid,
        errors: result.errors,
        row: review,
      };
    });

    const validReviews = validationResults
      .filter((r) => r.isValid)
      .map((r) => r.row);

    const invalidReviews = validationResults.filter((r) => !r.isValid);

    if (validReviews.length === 0) {
      return res.status(400).json({
        error: "No valid reviews found in CSV.",
        failedRows: invalidReviews.map(({ index, errors }) => ({
          row: index,
          errors,
        })),
      });
    }

    await insertReviews(validReviews);

    const statusCode = invalidReviews.length > 0 ? 207 : 200;
    return res.status(statusCode).json({
      message: `Inserted ${validReviews.length} valid reviews.`,
      failed: invalidReviews.length,
      ...(invalidReviews.length > 0 && {
        failedRows: invalidReviews.map(({ index, errors }) => ({
          row: index,
          errors,
        })),
      }),
    });
  } catch (error) {
    console.error("CSV Upload Error:", error);
    res.status(500).json({ error: "Error processing CSV file" });
  }
};

module.exports = { bulkUpload };
