import { Lightbulb, CheckCircle } from "lucide-react";

const AnalysisInsights = ({ insights }) => {
  if (!insights || !insights.length) {
    return (
      <div className="mt-4 p-4 text-center bg-white shadow rounded-md">
        {" "}
        {/* mt-6 -> mt-4, p-6 -> p-4 */}
        <p className="text-gray-500 text-sm">No insights available.</p>{" "}
        {/* smaller text */}
      </div>
    );
  }

  return (
    <div className="mt-4 p-4 bg-white shadow-md rounded-md hover:shadow-lg transition-shadow">
      {" "}
      {/* mt-6 -> mt-4, p-6 -> p-4 */}
      <div className="flex items-center gap-1.5 mb-3">
        {" "}
        {/* gap-2 -> gap-1.5, mb-4 -> mb-3 */}
        <Lightbulb className="text-blue-600" size={20} /> {/* size 24 -> 20 */}
        <h3 className="text-lg font-semibold text-gray-900">
          {" "}
          {/* text-xl -> text-lg, font-bold -> font-semibold */}
          Key Insights & Suggestions
        </h3>
      </div>
      <ul className="space-y-3">
        {" "}
        {/* space-y-4 -> space-y-3 */}
        {insights.map((insight, index) => (
          <li
            key={index}
            className="flex items-start gap-2 p-2 rounded-md bg-blue-50 hover:bg-blue-100 transition-colors"
          >
            <CheckCircle className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" />
            <span className="text-gray-800 text-sm leading-snug">
              {insight}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AnalysisInsights;
