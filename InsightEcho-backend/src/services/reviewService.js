const pool = require("../db");

const insertReviews = async (reviews) => {
  if (!reviews || reviews.length === 0) return;

  const texts = [];
  const ratings = [];
  const organizations = [];

  for (const { text, rating, organization } of reviews) {
    texts.push(text);
    ratings.push(rating);
    organizations.push(organization);
  }

  const query = `
    INSERT INTO reviews (text, rating, organization)
    SELECT * FROM UNNEST($1::text[], $2::int[], $3::text[])
  `;

  await pool.query(query, [texts, ratings, organizations]);
};

module.exports = { insertReviews };
