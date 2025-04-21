const AnalysisDetails = ({ data }) => {
  if (!data) return null;

  return (
    <div className="w-full max-w-2xl mx-auto py-8 space-y-8">
      <div className="rounded-xl bg-white/60 shadow-lg p-6 border flex flex-col items-center">
        <div className="flex gap-4 items-center">
          <span className="text-6xl font-bold text-green-600">
            {data.averageSentiment.toFixed(2)}
          </span>
          <div>
            <div className="text-lg font-medium">Average Sentiment</div>
            <div className="text-slate-500 text-sm">
              from <span className="font-semibold">{data.totalReviews}</span>{" "}
              Reviews
            </div>
          </div>
        </div>
      </div>

      {data.sentimentByRating && (
        <div className="bg-white shadow rounded-lg p-4 mt-6">
          <h3 className="font-semibold mb-2 text-lg">
            Average Sentiment per Rating
          </h3>
          <ul className="space-y-3 text-gray-700 text-sm">
            {Object.entries(data.sentimentByRating).map(([rating, score]) => (
              <li
                key={rating}
                className="flex items-center justify-between border-b last:border-0 pb-1"
              >
                <div className="flex items-center space-x-1">
                  {Array.from({ length: Number(rating) }, (_, i) => (
                    <svg
                      key={i}
                      className="w-4 h-4 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.43 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span>{score.toFixed(2)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {data.sentimentBuckets && (
        <div className="rounded-lg bg-white/60 shadow p-5 border mt-6">
          <h3 className="font-semibold mb-2 text-lg">Sentiment Distribution</h3>
          <ul className="flex flex-col gap-3">
            {Object.entries(data.sentimentBuckets).map(([label, count]) => (
              <li key={label} className="flex items-center gap-2">
                <span className="w-32 text-xs md:text-sm capitalize">
                  {label.replace(/([a-z])([A-Z])/g, "$1 $2")}
                </span>
                <div className="w-full h-3 rounded bg-gray-200 relative">
                  <div
                    className={`bg-blue-400 absolute left-0 top-0 h-full rounded`}
                    style={{
                      width: `${(count / data.totalReviews) * 100}%`,
                      transition: "width 0.5s",
                    }}
                  ></div>
                </div>
                <span className="w-7 text-right text-xs">{count}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {data.themeSentiment && (
        <div className="rounded-lg bg-white/60 shadow p-5 border mt-6">
          <h3 className="font-semibold mb-2">Theme Based Sentiment</h3>
          <div className="flex flex-wrap gap-4">
            {Object.entries(data.themeSentiment).map(([theme, stats]) => (
              <div
                key={theme}
                className="flex flex-col items-center justify-center bg-green-50 rounded p-3 min-w-[90px]"
              >
                <span className="font-bold text-green-700 text-lg">
                  {stats.average.toFixed(2)}
                </span>
                <span className="text-xs text-gray-500 uppercase">{theme}</span>
                <span className="text-xs text-gray-400">
                  {stats.count} mentions
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div className="bg-green-50 rounded-lg p-4 border border-green-200">
          <h3 className="font-semibold text-green-900 text-sm mb-2">
            Top Positive Words
          </h3>
          <ul className="flex flex-wrap gap-2">
            {data.topPositiveWords.map((word, index) => (
              <li
                key={index}
                className="bg-green-200 text-green-800 px-2 py-1 text-xs rounded list-none"
              >
                {word.word} (Score: {word.score.toFixed(2)})
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-red-50 rounded-lg p-4 border border-red-200">
          <h3 className="font-semibold text-red-900 text-sm mb-2">
            Top Negative Words
          </h3>
          <ul className="flex flex-wrap gap-2">
            {data.topNegativeWords.map((word, index) => (
              <li
                key={index}
                className="bg-red-200 text-red-800 px-2 py-1 text-xs rounded list-none"
              >
                {word.word} (Score: {word.score.toFixed(2)})
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div className="bg-green-50 rounded-lg p-3 border border-green-200">
          <h3 className="font-semibold text-green-900 mb-1 text-sm">
            Top Positive Phrases
          </h3>
          <ul className="list-disc list-inside text-xs text-green-900 space-y-1">
            {data.topPositivePhrases.map((phrase, index) => (
              <li key={index}>
                {phrase.phrase} (Score: {phrase.score.toFixed(2)})
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-red-50 rounded-lg p-3 border border-red-200">
          <h3 className="font-semibold text-red-900 mb-1 text-sm">
            Top Negative Phrases
          </h3>
          <ul className="list-disc list-inside text-xs text-red-900 space-y-1">
            {data.topNegativePhrases.map((phrase, index) => (
              <li key={index}>
                {phrase.phrase} (Score: {phrase.score.toFixed(2)})
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="rounded-lg bg-white/60 shadow p-5 border mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold text-green-900 mb-2">
              Frequent Positive Phrases
            </h3>
            <div className="flex flex-wrap gap-2">
              {data.frequentPositivePhrases.map((phrase, index) => (
                <span
                  key={index}
                  className="bg-green-100 text-green-700 rounded px-2 py-1 text-xs"
                >
                  {phrase.phrase} (Score: {phrase.score.toFixed(2)})
                </span>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-red-900 mb-2">
              Frequent Negative Phrases
            </h3>
            <div className="flex flex-wrap gap-2">
              {data.frequentNegativePhrases.map((phrase, index) => (
                <span
                  key={index}
                  className="bg-red-100 text-red-700 rounded px-2 py-1 text-xs"
                >
                  {phrase.phrase} (Score: {phrase.score.toFixed(2)})
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisDetails;
