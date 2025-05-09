const pool = require("../db");

const insertReviews = async (reviews) => {
  const insertPromises = reviews.map((r) =>
    pool.query(
      "INSERT INTO reviews (text, rating, organization) VALUES ($1, $2, $3)",
      [r.text, r.rating, r.organization]
    )
  );
  await Promise.all(insertPromises);
};

module.exports = { insertReviews };
