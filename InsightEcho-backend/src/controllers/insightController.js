const pool = require("../db");
const { calculateSentiment } = require("../services/calculateSentiment");
const { generateInsights } = require("../services/generateInsights");
const { buildReviewQuery } = require("../utils/queryBuilder");

const getInsights = async (req, res) => {
  const organization = req.query.organization || null;

  try {
    const { text, values } = buildReviewQuery(organization);
    const result = await pool.query(text, values);

    const reviews = result.rows;

    if (reviews.length === 0) {
      return res.json([]);
    }

    const analysis = calculateSentiment(reviews);
    const insights = await generateInsights(analysis);
    res.json(insights);
  } catch (error) {
    console.error("Error generating insights:", error);
    res.status(500).json({ error: "Error generating insights" });
  }
};

module.exports = { getInsights };
