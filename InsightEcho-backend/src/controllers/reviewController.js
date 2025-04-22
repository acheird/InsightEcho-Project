const pool = require("../db");
const { calculateSentiment } = require("../services/calculateSentiment");

const addReview = async (req, res) => {
  const { text, rating, organization } = req.body;

  if (!text || !rating || !organization) {
    return res.status(400).json({ error: "Text and rating are required" });
  }

  try {
    const result = await pool.query(
      "INSERT INTO reviews (text, rating, organization) VALUES ($1, $2, $3) RETURNING *",
      [text, rating, organization]
    );
    res.json(result.rows[0]); // Return the stored review
  } catch (error) {
    res.status(500).json({ error: "Database error" });
  }
};

const getAnalysis = async (req, res) => {
  const organization = req.query.organization;
  try {
    const query = organization
      ? "SELECT text, rating FROM reviews WHERE organization = $1"
      : "SELECT text, rating FROM reviews";

    const result = organization
      ? await pool.query(query, [organization])
      : await pool.query(query);

    const reviews = result.rows;
    //console.log("Fetched reviews:", reviews);
    //console.log("Fetched reviews:", reviews.length);

    if (reviews.length === 0) {
      return res.json({ message: "There are not reviews for analysis" });
    }

    let analysisResult = calculateSentiment(reviews);

    res.json(analysisResult);
  } catch (error) {
    res.status(500).json({ error: "Error occurred during sentiment analysis" });
  }
};

module.exports = { addReview, getAnalysis };
