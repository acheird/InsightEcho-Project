const pool = require("../db");

const insertReviews = async (reviews) => {
  if (!reviews || reviews.length === 0) return;

  const texts = [];
  const ratings = [];
  const organizations = [];
  const reviewedAt = [];

  for (const { text, rating, organization, reviewed_at } of reviews) {
    texts.push(text);
    ratings.push(rating);
    organizations.push(organization);
    reviewedAt.push(reviewed_at ? reviewed_at.toISOString() : null);
  }

  const query = `
    INSERT INTO reviews (text, rating, organization, reviewed_at)
    SELECT * FROM UNNEST($1::text[], $2::int[], $3::text[], $4::timestamptz[])
  `;

  await pool.query(query, [texts, ratings, organizations, reviewedAt]);
};

module.exports = { insertReviews };
