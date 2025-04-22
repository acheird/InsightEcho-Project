const pool = require("../db");
const { calculateSentiment } = require("../services/calculateSentiment");
const { generateInsights } = require("../services/generateInsights");

const getInsights = async (req, res) => {
  const org = req.query.org || null;

  try {
    const result = org
      ? await pool.query(
          "SELECT text, rating FROM reviews WHERE organization = $1",
          [org]
        )
      : await pool.query("SELECT text, rating FROM reviews");

    const reviews = result.rows;

    if (reviews.length === 0) {
      return res.json({ message: "There are not reviews for analysis" });
    }

    const analysis = calculateSentiment(reviews);
    const insights = generateInsights(analysis);

    res.json(insights);
  } catch (error) {
    console.error("Error generating insights:", error);
    res.status(500).json({ error: "Error generating insights" });
  }
};

module.exports = { getInsights };
