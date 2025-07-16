const config = require("./insightConfig.json");

function generateInsights(processedReviews) {
  let insights = [];
  let sentimentSum = 0;
  const themeCounts = {};

  for (let theme in config.themes) {
    themeCounts[theme] = 0;
  }

  processedReviews.forEach((review) => {
    const { sentimentScore, cleanedText } = review;
    sentimentSum += sentimentScore;

    for (let theme in config.themes) {
      for (let keyword of config.themes[theme]) {
        if (cleanedText.includes(keyword)) {
          themeCounts[theme]++;
          break;
        }
      }
    }
  });

  const avgSentiment = sentimentSum / processedReviews.length;

  if (avgSentiment < config.thresholds.stronglyNegative) {
    insights.push(
      "Overall reviews are strongly negative. Urgent action needed."
    );
  } else if (avgSentiment < config.thresholds.neutral) {
    insights.push("Reviews are slightly negative. Identify weak areas.");
  } else if (avgSentiment > config.thresholds.stronglyPositive) {
    insights.push("Reviews are very positive. Keep up the good work!");
  }

  const sortedThemes = Object.entries(themeCounts).sort((a, b) => b[1] - a[1]);
  if (sortedThemes[0][1] > 0) {
    insights.push(`Most mentioned theme: ${sortedThemes[0][0]}`);
  }

  return insights;
}
