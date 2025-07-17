const axios = require("axios");

const generateInsights = async (data) => {
  const ruleBasedFallback = () => {
    const insights = [];
    if (data.averageSentimentScore < 0) {
      insights.push(
        "Customers are generally dissatisfied. Investigate top complaints and address them quickly."
      );
    }
    if (data.topNegativeKeywords?.length > 0) {
      insights.push(
        `Common issues include: ${data.topNegativeKeywords
          .slice(0, 5)
          .join(", ")}.`
      );
    }
    return insights.length
      ? insights
      : ["No insights could be generated from fallback logic."];
  };

  try {
    // ✅ Step 1: Compact summary object
    const summary = {
      averageSentimentScore: data.averageSentimentScore,
      reviewCount: data.totalReviews || data.reviewCount || 0,
      topPositiveKeywords: (data.topPositiveKeywords || []).slice(0, 5),
      topNegativeKeywords: (data.topNegativeKeywords || []).slice(0, 5),
      keyThemes: Object.entries(data.themeSentiment || {})
        .filter(([, stats]) => stats.count > 0)
        .map(([theme]) => theme)
        .slice(0, 5),
      sentimentByRating: data.sentimentByRating,
    };

    // ✅ Step 2: Human-readable, efficient prompt
    const prompt = `
You are a strategic business analyst. Based on the customer sentiment summary below, generate three specific, actionable business improvement suggestions. Be practical and avoid vague or generic statements.

Customer Sentiment Summary:
- Average Sentiment Score: ${summary.averageSentimentScore}
- Total Reviews: ${summary.reviewCount}
- Top Positive Keywords: ${summary.topPositiveKeywords.join(", ") || "None"}
- Top Negative Keywords: ${summary.topNegativeKeywords.join(", ") || "None"}
- Key Themes: ${summary.keyThemes.join(", ") || "None"}
- Sentiment by Rating (1–5): ${
      Object.entries(summary.sentimentByRating || {})
        .map(([rating, score]) => `${rating}: ${score}`)
        .join(", ") || "Not available"
    }

Format:
- Insight 1: ...
- Insight 2: ...
- Insight 3: ...
`;

    const response = await axios.post(
      process.env.GROQ_API_URL ||
        "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama3-70b-8192",
        messages: [
          {
            role: "system",
            content: "You are a helpful and strategic business advisor.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
      }
    );

    const content = response?.data?.choices?.[0]?.message?.content || "";

    if (process.env.NODE_ENV === "development") {
      console.log("Prompt sent to Groq:", prompt);
      console.log("Groq Response:", content);
    }

    // ✅ Step 3: Extract bullet-point insights from response
    const insights = content
      .split("\n")
      .filter((line) => line.trim().startsWith("-"))
      .map((line) => line.replace(/^- /, "").trim());

    return insights.length ? insights : ruleBasedFallback();
  } catch (error) {
    console.error(
      "Error generating dynamic insights with Groq:",
      error.message
    );
    return ruleBasedFallback();
  }
};

module.exports = { generateInsights };
