import { Star, TrendingUp, ChartBar } from "lucide-react";
import { useEffect, useState } from "react";

const AnalysisDetails = ({ data }) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const getSentimentColor = (score) => {
    if (score >= 0.75) return "text-green-700";
    if (score >= 0.3) return "text-green-500";
    if (score >= -0.3) return "text-gray-500";
    if (score >= -0.75) return "text-red-500";
    return "text-red-700";
  };

  const getSentimentBgColor = (score) => {
    if (score >= 0.75) return "bg-green-200";
    if (score >= 0.3) return "bg-green-100";
    if (score >= -0.3) return "bg-gray-200";
    if (score >= -0.75) return "bg-red-100";
    return "bg-red-200";
  };

  const DISTRIBUTION_COLORS = {
    stronglyPositive: "bg-green-200",
    mildlyPositive: "bg-green-100",
    neutral: "bg-gray-200",
    mildlyNegative: "bg-red-100",
    stronglyNegative: "bg-red-200",
  };

  if (!data) return null;

  const sentimentHeadlineColor = getSentimentColor(data.averageSentiment);

  return (
    <div className="w-full max-w-6xl mx-auto py-6 px-3 space-y-4 animate-fade-in">
      {" "}
      {/* reduced py-8 -> py-6, px-4 -> px-3, space-y-6 -> space-y-4 */}
      {/* Main Score */}
      <div className="overflow-hidden border-0 shadow-lg bg-gradient-to-br from-white to-gray-100 rounded-lg">
        <div className="p-4 sm:p-6">
          {" "}
          {/* reduced p-6 -> p-4, p-8 -> p-6 */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
            {" "}
            {/* gap-6 -> gap-4 */}
            <div className="flex items-center gap-4">
              {" "}
              {/* gap-5 -> gap-4 */}
              <div
                className={`text-6xl font-bold transition-colors ${sentimentHeadlineColor}`} /* text-7xl -> text-6xl */
              >
                {data.averageSentiment.toFixed(2)}
              </div>
              <div>
                <div className="text-lg font-semibold text-gray-900">
                  {" "}
                  {/* text-xl -> text-lg */}
                  Average Sentiment
                </div>
                <div className="text-gray-500 flex items-center gap-1 text-sm">
                  {" "}
                  {/* added text-sm */}
                  <TrendingUp size={14} />
                  <span>
                    from{" "}
                    <span className="font-medium">{data.totalReviews}</span>{" "}
                    reviews
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {" "}
        {/* gap-6 -> gap-4 */}
        {/* Sentiment Distribution */}
        {data.sentimentBuckets && (
          <div className="overflow-hidden shadow-md hover:shadow-lg transition-shadow rounded-lg bg-white">
            <div className="p-4">
              {" "}
              {/* p-5 -> p-4 */}
              <div className="flex items-center gap-2 mb-3 text-gray-900">
                {" "}
                {/* mb-4 -> mb-3 */}
                <ChartBar size={18} /> {/* size 20 -> 18 */}
                <h3 className="font-semibold text-base">
                  Sentiment Distribution
                </h3>{" "}
                {/* text-lg -> text-base */}
              </div>
              <ul className="flex flex-col gap-2">
                {" "}
                {/* gap-3 -> gap-2 */}
                {Object.entries(data.sentimentBuckets).map(([label, count]) => {
                  const percentage = (count / data.totalReviews) * 100;
                  const bgColor = DISTRIBUTION_COLORS[label] || "bg-blue-400";

                  return (
                    <li key={label} className="flex flex-col gap-1">
                      {" "}
                      {/* gap-2 -> gap-1 */}
                      <div className="flex justify-between text-sm">
                        <span className="capitalize text-gray-500 font-medium">
                          {label.replace(/([a-z])([A-Z])/g, "$1 $2")}
                        </span>
                        <span className="text-gray-900 font-semibold">
                          {count} ({percentage.toFixed(0)}%)
                        </span>
                      </div>
                      <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                        {" "}
                        {/* h-2.5 -> h-2 */}
                        <div
                          className={`${bgColor} h-full rounded-full transition-all duration-700 ease-out`}
                          style={{ width: animate ? `${percentage}%` : "0%" }}
                        ></div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        )}
        {/* Sentiment By Rating */}
        {data.sentimentByRating && (
          <div className="overflow-hidden shadow-md hover:shadow-lg transition-shadow rounded-lg bg-white">
            <div className="p-4">
              {" "}
              {/* p-5 -> p-4 */}
              <div className="flex items-center gap-2 mb-3 text-gray-900">
                {" "}
                {/* mb-4 -> mb-3 */}
                <Star size={18} />
                <h3 className="font-semibold text-base">
                  Sentiment by Rating
                </h3>{" "}
                {/* text-lg -> text-base */}
              </div>
              <ul className="space-y-2">
                {" "}
                {/* space-y-3 -> space-y-2 */}
                {Object.entries(data.sentimentByRating).map(
                  ([rating, score]) => {
                    const sentimentColor = getSentimentColor(score);
                    return (
                      <li key={rating} className="flex flex-col gap-1">
                        {" "}
                        {/* gap-2 -> gap-1 */}
                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-1">
                            {Array.from({ length: Number(rating) }, (_, i) => (
                              <Star
                                key={i}
                                className="w-4 h-4 fill-yellow-400 text-yellow-400"
                                size={14} /* size 16 -> 14 */
                              />
                            ))}
                            {Array.from(
                              { length: 5 - Number(rating) },
                              (_, i) => (
                                <Star
                                  key={i + Number(rating)}
                                  className="w-4 h-4 text-gray-300"
                                  size={14}
                                />
                              )
                            )}
                          </div>
                          <span
                            className={`font-semibold ${sentimentColor} text-sm`}
                          >
                            {" "}
                            {/* added text-sm */}
                            {score.toFixed(2)}
                          </span>
                        </div>
                        <div className="relative w-full h-2 rounded bg-gray-200 overflow-hidden">
                          {" "}
                          {/* h-2.5 -> h-2 */}
                          <div
                            className={`${getSentimentBgColor(
                              score
                            )} h-full rounded transition-all duration-700 ease-out`}
                            style={{
                              width: animate ? `${(score + 1) * 50}%` : "0%",
                            }}
                          ></div>
                        </div>
                      </li>
                    );
                  }
                )}
              </ul>
            </div>
          </div>
        )}
      </div>
      {/* Theme Sentiment */}
      {data.themeSentiment && (
        <div className="shadow-md hover:shadow-lg transition-shadow rounded-lg bg-white mt-4">
          {" "}
          {/* add mt-4 for slight spacing */}
          <div className="p-5">
            {" "}
            {/* p-6 -> p-5 */}
            <h3 className="font-semibold text-gray-900 mb-3 text-base">
              {" "}
              {/* text-lg -> text-base, mb-4 -> mb-3 */}
              Theme-based Sentiment
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {" "}
              {/* gap-4 -> gap-3 */}
              {Object.entries(data.themeSentiment).map(([theme, stats]) => {
                const sentimentColor = getSentimentColor(stats.average);
                const bgColor =
                  stats.average >= 0 ? "bg-green-50" : "bg-red-50";

                return (
                  <div
                    key={theme}
                    className={`flex flex-col items-center justify-center rounded-lg p-3 transition-all hover:scale-105 border ${bgColor}`}
                  >
                    <span
                      className={`font-bold text-lg mb-1 ${sentimentColor}`}
                    >
                      {stats.average.toFixed(2)}
                    </span>
                    <span className="text-sm font-medium text-gray-900 capitalize mb-1">
                      {theme}
                    </span>
                    <span className="text-xs text-gray-500">
                      {stats.count} {stats.count === 1 ? "mention" : "mentions"}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
      {/* Top Words and Phrases Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {" "}
        {/* gap-6 -> gap-4 */}
        {/* Top Positive Words */}
        <SectionBox
          bgColor="bg-green-50"
          title="Top Positive Words"
          textColor="text-green-900"
        >
          {data.topPositiveWords?.map((word, index) => (
            <Tag
              key={index}
              color="green"
              label={word.word}
              score={word.score}
            />
          ))}
        </SectionBox>
        {/* Top Negative Words */}
        <SectionBox
          bgColor="bg-red-50"
          title="Top Negative Words"
          textColor="text-red-900"
        >
          {data.topNegativeWords?.map((word, index) => (
            <Tag key={index} color="red" label={word.word} score={word.score} />
          ))}
        </SectionBox>
        {/* Top Positive Phrases */}
        <SectionBox
          bgColor="bg-green-50"
          title="Top Positive Phrases"
          textColor="text-green-900"
        >
          {data.topPositivePhrases?.map((phrase, index) => (
            <Tag
              key={index}
              color="green"
              label={phrase.phrase}
              score={phrase.score}
            />
          ))}
        </SectionBox>
        {/* Top Negative Phrases */}
        <SectionBox
          bgColor="bg-red-50"
          title="Top Negative Phrases"
          textColor="text-red-900"
        >
          {data.topNegativePhrases?.map((phrase, index) => (
            <Tag
              key={index}
              color="red"
              label={phrase.phrase}
              score={phrase.score}
            />
          ))}
        </SectionBox>
        {/* Frequent Positive Phrases */}
        <SectionBox
          bgColor="bg-green-50"
          title="Frequent Positive Phrases"
          textColor="text-green-900"
        >
          {data.frequentPositivePhrases?.map((phrase, index) => (
            <Tag
              key={index}
              color="green"
              label={phrase.phrase}
              count={phrase.count}
            />
          ))}
        </SectionBox>
        {/* Frequent Negative Phrases */}
        <SectionBox
          bgColor="bg-red-50"
          title="Frequent Negative Phrases"
          textColor="text-red-900"
        >
          {data.frequentNegativePhrases?.map((phrase, index) => (
            <Tag
              key={index}
              color="red"
              label={phrase.phrase}
              count={phrase.count}
            />
          ))}
        </SectionBox>
      </div>
    </div>
  );
};

const SectionBox = ({ bgColor, title, textColor, children }) => (
  <div
    className={`shadow-md hover:shadow-lg transition-shadow rounded-lg ${bgColor}`}
  >
    <div className="p-4">
      {" "}
      {/* p-5 -> p-4 */}
      <h3 className={`font-semibold mb-2 ${textColor}`}>
        {" "}
        {/* mb-3 -> mb-2 */}
        {title}
      </h3>
      <div className="flex flex-wrap gap-1">{children}</div>{" "}
      {/* gap-2 -> gap-1 */}
    </div>
  </div>
);

const Tag = ({ color, label, score, count }) => {
  const borderColor = color === "green" ? "border-green-300" : "border-red-300";
  const textColor = color === "green" ? "text-green-800" : "text-red-800";
  return (
    <span
      className={`border ${borderColor} ${textColor} rounded px-2 py-1 text-xs whitespace-nowrap`}
      title={score !== undefined ? `Score: ${score.toFixed(2)}` : undefined}
    >
      {label}{" "}
      {count !== undefined
        ? `(${count})`
        : score !== undefined
        ? `(Score: ${score.toFixed(2)})`
        : ""}
    </span>
  );
};

export default AnalysisDetails;
