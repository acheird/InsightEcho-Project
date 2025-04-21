const AnalysisInsights = ({ insights }) => {
  if (!insights || !insights.length) {
    return <p className="mt-6">No insights available.</p>;
  }

  return (
    <div className="mt-8 border-t pt-6">
      <h3 className="text-xl font-semibold mb-2">Key Insights & Suggestions</h3>
      <ul className="list-disc pl-6 text-gray-800">
        {insights.map((insight, index) => (
          <li key={index}>{insight}</li>
        ))}
      </ul>
    </div>
  );
};

export default AnalysisInsights;
