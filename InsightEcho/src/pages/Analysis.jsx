import { useEffect, useState } from "react";
import { fetchAnalysis, fetchInsights } from "../api";
import AnalysisDetails from "../components/AnalysisDetails";
import AnalysisInsights from "../components/AnalysisInsights";

const Analysis = () => {
  const [data, setData] = useState(null);
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const analysisData = await fetchAnalysis();
        setData(analysisData);

        const insightData = await fetchInsights();
        setInsights(insightData);
      } catch (error) {
        console.error("Failed to fetch analysis or insights", error);
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
      <AnalysisDetails data={data} />
      <AnalysisInsights insights={insights} />
    </div>
  );
};

export default Analysis;
