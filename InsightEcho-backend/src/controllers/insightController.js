const pool = require("../db");
const { calculateSentiment } = require("../services/calculateSentiment");
const { generateInsights } = require("../services/generateInsights");

const getInsights = async (req, res) => {
  try {
    const result = await pool.query("SELECT text, rating FROM reviews");

    const reviews = result.rows;

    if (reviews.length === 0) {
      return res.json({ message: "There are not reviews for analysis" });
    }

    let analysisResult = calculateSentiment(reviews);
    let insights = generateInsights(analysisResult);

    res.json(insights);
  } catch (error) {
    res.status(500).json({ error: "Error generating insights" });
  }
};

module.exports = { getInsights };
