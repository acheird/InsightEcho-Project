const AnalysisInsights = ({ insights }) => {
  if (!insights || !insights.length) {
    return <p className="mt-6">No insights available.</p>;
  }

  return (
    <div className="mt-10 bg-white shadow-md rounded-lg p-6">
      <h3 className="text-2xl font-bold text-blue-600 mb-4">
        Key Insights & Suggestions
      </h3>
      <ul className="space-y-3">
        {insights.map((insight, index) => (
          <li key={index} className="flex items-start text-gray-700">
            <svg
              className="w-5 h-5 text-blue-500 mt-1 mr-2 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.43 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span>{insight}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AnalysisInsights;
