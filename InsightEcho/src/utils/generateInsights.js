export function generateInsights(data) {
  const insights = [];

  // Avg sentiment
  if (data.averageSentiment < 0) {
    insights.push(
      "Overall sentiment is negative. Consider investigating frequent complaints."
    );
  } else if (data.averageSentiment < 5) {
    insights.push(
      "Sentiment is mixed. Improvements in certain areas might help."
    );
  } else {
    insights.push(
      "Sentiment is generally positive. Keep doing what’s working!"
    );
  }

  // Check negative themes
  if (data.themeSentiment) {
    Object.entries(data.themeSentiment).forEach(([theme, stats]) => {
      if (stats.average < 0) {
        insights.push(
          `Sentiment around "${theme}" is negative. You may want to review feedback related to this.`
        );
      }
    });
  }

  // Strongly negative reviews
  if (data.sentimentBuckets?.stronglyNegative > 0) {
    insights.push(
      `There are ${data.sentimentBuckets.stronglyNegative} strongly negative reviews — address the causes quickly.`
    );
  }

  // Positive phrases
  if (
    data.frequentPositivePhrases?.length &&
    data.frequentPositivePhrases.some((p) => p.phrase.includes("recommend"))
  ) {
    insights.push(
      "Customers often recommend your service. Highlight these reviews for marketing."
    );
  }

  // Negative phrases
  if (
    data.frequentNegativePhrases?.length &&
    data.frequentNegativePhrases.some(
      (p) => p.phrase.includes("dirty") || p.phrase.includes("headache")
    )
  ) {
    insights.push(
      "Some reviews mention cleanliness or discomfort — this may be hurting your image."
    );
  }

  if (!insights.length) {
    insights.push("No specific advice generated — sentiment is balanced.");
  }

  return insights;
}
