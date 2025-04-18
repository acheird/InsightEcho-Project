import { useEffect, useState } from "react";
import { fetchAnalysis } from "../api";
import { generateInsights } from "../utils/generateInsights";

const Analysis = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const { data: analysisData } = await fetchAnalysis();
        setData(analysisData);
      } catch (error) {
        console.error("Failed to fetch analysis", error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  if (loading) return <p>Loading analysis...</p>;
  if (!data) return <p>No data available</p>;

  return (
    <div className="bg-white text-black shadow-lg rounded-lg p-6 w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Sentiment Analysis Results</h2>

      <p>
        <strong>Total Reviews:</strong> {data.totalReviews}
      </p>
      <p>
        <strong>Average Sentiment:</strong> {data.averageSentiment.toFixed(2)}
      </p>

      {/* Sentiment by Rating */}
      {data.sentimentByRating && (
        <div className="mt-4">
          <h3 className="font-semibold text-lg">
            Average Sentiment per Rating
          </h3>
          <ul className="list-disc pl-6">
            {Object.entries(data.sentimentByRating).map(([rating, score]) => (
              <li key={rating}>
                Rating {rating}: {score.toFixed(2)}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Sentiment Buckets */}
      {data.sentimentBuckets && (
        <div className="mt-6">
          <h3 className="font-semibold text-lg">Sentiment Distribution</h3>
          <ul className="list-disc pl-6">
            {Object.entries(data.sentimentBuckets).map(([label, count]) => (
              <li key={label}>
                {label.replace(/([a-z])([A-Z])/g, "$1 $2")}: {count}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Theme-Based Sentiment */}
      {data.themeSentiment && (
        <div className="mt-6">
          <h3 className="font-semibold text-lg">Theme-Based Sentiment</h3>
          <ul className="list-disc pl-6">
            {Object.entries(data.themeSentiment).map(([theme, stats]) => (
              <li key={theme}>
                {theme}: Avg Score {stats.average.toFixed(2)} ({stats.count}{" "}
                mentions)
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Top Positive/Negative Words */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div>
          <h3 className="font-semibold text-lg">Top Positive Words</h3>
          <ul className="list-disc pl-6">
            {data.topPositiveWords.map((word, index) => (
              <li key={index}>
                {word.word} (Score: {word.score.toFixed(2)})
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-lg">Top Negative Words</h3>
          <ul className="list-disc pl-6">
            {data.topNegativeWords.map((word, index) => (
              <li key={index}>
                {word.word} (Score: {word.score.toFixed(2)})
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Top Positive/Negative Phrases */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div>
          <h3 className="font-semibold text-lg">Top Positive Phrases</h3>
          <ul className="list-disc pl-6">
            {data.topPositivePhrases.map((phrase, index) => (
              <li key={index}>
                {phrase.phrase} (Score: {phrase.score.toFixed(2)})
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-lg">Top Negative Phrases</h3>
          <ul className="list-disc pl-6">
            {data.topNegativePhrases.map((phrase, index) => (
              <li key={index}>
                {phrase.phrase} (Score: {phrase.score.toFixed(2)})
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Frequent Phrases */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div>
          <h3 className="font-semibold text-lg">Frequent Positive Phrases</h3>
          <ul className="list-disc pl-6">
            {data.frequentPositivePhrases.map((phrase, index) => (
              <li key={index}>
                {phrase.phrase} (Score: {phrase.score.toFixed(2)})
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-lg">Frequent Negative Phrases</h3>
          <ul className="list-disc pl-6">
            {data.frequentNegativePhrases.map((phrase, index) => (
              <li key={index}>
                {phrase.phrase} (Score: {phrase.score.toFixed(2)})
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Advice/Insights Section */}
      <div className="mt-8 border-t pt-6">
        <h3 className="text-xl font-semibold mb-2">
          Key Insights & Suggestions
        </h3>
        <ul className="list-disc pl-6 text-gray-800">
          {generateInsights(data).map((insight, index) => (
            <li key={index}>{insight}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Analysis;
