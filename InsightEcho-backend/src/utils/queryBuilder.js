const buildReviewQuery = (organization) => {
  if (!organization || organization === "all" || organization === "") {
    return {
      text: "SELECT text, rating FROM reviews",
      values: [],
    };
  }

  return {
    text: "SELECT text, rating FROM reviews WHERE organization = $1",
    values: [organization],
  };
};

module.exports = { buildReviewQuery };
