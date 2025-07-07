const validateReview = (review) => {
  const { text, rating, organization } = review;
  const errors = [];

  if (typeof text !== "string" || text.trim() === "") {
    errors.push('Missing or invalid "text"');
  }

  if (typeof organization !== "string" || organization.trim() === "") {
    errors.push('Missing or invalid "organization"');
  }

  if (isNaN(rating) || rating < 1 || rating > 5) {
    errors.push('Invalid or missing "rating" (must be between 1 and 5)');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

module.exports = validateReview;
