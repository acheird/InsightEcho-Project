const validateReview = (review) => {
  const errors = [];

  if (typeof review.text !== "string" || review.text.trim() === "") {
    errors.push("Missing or invalid 'text'");
  }

  if (
    typeof review.organization !== "string" ||
    review.organization.trim() === ""
  ) {
    errors.push("Missing or invalid 'organization'");
  }

  const numericRating = Number(review.rating);
  if (
    !Number.isFinite(numericRating) ||
    numericRating < 1 ||
    numericRating > 5
  ) {
    errors.push("Rating must be a number between 1 and 5");
  }

  if (!review.reviewed_at || isNaN(Date.parse(review.reviewed_at))) {
    errors.push("Missing or invalid 'reviewed_at' date");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

module.exports = validateReview;
