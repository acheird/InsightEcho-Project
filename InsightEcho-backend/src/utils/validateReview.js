const validateReview = (review) => {
  const { text, rating, organization } = review;

  if (typeof text !== "string" || text.trim() === "") return false;
  if (typeof organization !== "string" || organization.trim() === "")
    return false;

  const numericRating = Number(rating);
  if (!Number.isFinite(numericRating) || numericRating < 1 || numericRating > 5)
    return false;

  return true;
};

module.exports = validateReview;
