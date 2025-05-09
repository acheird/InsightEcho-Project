const validateReview = (review) => {
  const { text, rating, organization } = review;

  if (typeof text !== "string" || text.trim() === "") return false;
  if (typeof organization !== "string" || organization.trim() === "")
    return false;
  if (isNaN(rating) || rating < 1 || rating > 5) return false;

  return true;
};

module.exports = validateReview;
