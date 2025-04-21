import React from "react";

const AnalysisDetails = ({ data }) => {
  if (!data) return null;

  return (
    <div className="p-4">
      <p>
        <strong>Total Reviews:</strong> {data.totalReviews}
      </p>
      <p>
        <strong>Average Sentiment:</strong> {data.averageSentiment.toFixed(2)}
      </p>

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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div>
          <h3 className="font-semibold text-lg">Top Positive Words</h3>
          <ul className="list-disc pl-6">
            {data.topPositiveWords?.map((word, index) => (
              <li key={index}>
                {word.word} (Score: {word.score.toFixed(2)})
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-lg">Top Negative Words</h3>
          <ul className="list-disc pl-6">
            {data.topNegativeWords?.map((word, index) => (
              <li key={index}>
                {word.word} (Score: {word.score.toFixed(2)})
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div>
          <h3 className="font-semibold text-lg">Top Positive Phrases</h3>
          <ul className="list-disc pl-6">
            {data.topPositivePhrases?.map((phrase, index) => (
              <li key={index}>
                {phrase.phrase} (Score: {phrase.score.toFixed(2)})
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-lg">Top Negative Phrases</h3>
          <ul className="list-disc pl-6">
            {data.topNegativePhrases?.map((phrase, index) => (
              <li key={index}>
                {phrase.phrase} (Score: {phrase.score.toFixed(2)})
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div>
          <h3 className="font-semibold text-lg">Frequent Positive Phrases</h3>
          <ul className="list-disc pl-6">
            {data.frequentPositivePhrases?.map((phrase, index) => (
              <li key={index}>
                {phrase.phrase} (Score: {phrase.score.toFixed(2)})
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-lg">Frequent Negative Phrases</h3>
          <ul className="list-disc pl-6">
            {data.frequentNegativePhrases?.map((phrase, index) => (
              <li key={index}>
                {phrase.phrase} (Score: {phrase.score.toFixed(2)})
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AnalysisDetails;
