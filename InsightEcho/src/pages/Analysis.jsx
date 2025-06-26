import { useEffect, useState } from "react";
import { fetchAnalysis, fetchInsights, fetchOrganizations } from "../api";
import AnalysisDetails from "../components/AnalysisDetails";
import AnalysisInsights from "../components/AnalysisInsights";

const Analysis = () => {
  const [data, setData] = useState(null);
  const [org, setOrg] = useState("");
  const [orgs, setOrgs] = useState([]);
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrgsAndData = async () => {
      try {
        const organizations = await fetchOrganizations();
        setOrgs(organizations);

        const savedOrg = localStorage.getItem("selectedOrg");

        let selectedOrg = "";

        if (savedOrg && organizations.includes(savedOrg)) {
          selectedOrg = savedOrg;
        } else if (organizations.length > 0) {
          selectedOrg = organizations[0];
        }

        setOrg(selectedOrg);

        if (selectedOrg) {
          const [analysisData, insightsData] = await Promise.all([
            fetchAnalysis(selectedOrg),
            fetchInsights(selectedOrg),
          ]);
          setData(analysisData);
          setInsights(insightsData);
        }
      } catch (error) {
        console.error("Failed to load organizations or analysis data", error);
      } finally {
        setLoading(false);
      }
    };

    loadOrgsAndData();
  }, []);

  useEffect(() => {
    if (!org) return;

    localStorage.setItem("selectedOrg", org);
    const getData = async () => {
      try {
        setLoading(true);
        const [analysisData, insightData] = await Promise.all([
          fetchAnalysis(org),
          fetchInsights(org),
        ]);
        setData(analysisData);
        setInsights(insightData);
      } catch (error) {
        console.error("Failed to fetch analysis or insights", error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [org]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 p-4 rounded-2xl">
      <div className="max-w-3xl w-full mx-auto bg-white shadow-lg rounded-lg p-6">
        <div className="mb-6">
          <label className="block mb-4">
            <span className="font-semibold">Select Organization:</span>
            <select
              value={org}
              onChange={(e) => setOrg(e.target.value)}
              className="ml-2 border p-1 rounded bg-white"
            >
              {orgs.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
              <option value="all">All</option>
            </select>
          </label>
        </div>

        {loading ? (
          <div className="w-full flex flex-col items-center justify-center h-[200px] animate-pulse">
            <div className="h-6 w-2/3 bg-gray-200 rounded mb-4" />
            <div className="h-4 w-full bg-gray-100 rounded mb-2" />
            <div className="h-4 w-1/2 bg-gray-100 rounded" />
          </div>
        ) : !data ? (
          <div className="text-center text-gray-500 font-medium py-16">
            No data available.
          </div>
        ) : (
          <>
            <h2 className="text-3xl text-center font-bold mb-4 text-blue-900 tracking-tight">
              Sentiment Analysis Results
            </h2>
            <div className="mb-6">
              <AnalysisDetails data={data} />
            </div>
            <div>
              <AnalysisInsights insights={insights} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Analysis;
