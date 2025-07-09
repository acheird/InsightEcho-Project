import { useEffect, useState } from "react";
import { BarChart3, Loader2 } from "lucide-react";
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
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 p-4">
      <div className="max-w-6xl w-full mx-auto">
        {/* Header + Selector */}
        <div className="bg-white rounded-xl shadow-lg mb-4">
          {" "}
          {/* reduced mb from 6 to 4 */}
          <div className="p-4 sm:p-6">
            {" "}
            {/* reduced padding slightly */}
            <div className="flex items-center gap-2 mb-3">
              {" "}
              {/* reduced mb */}
              <BarChart3 className="text-primary" size={20} />{" "}
              {/* reduced size */}
              <h1 className="text-xl sm:text-2xl font-bold text-foreground">
                {" "}
                {/* smaller on small screens */}
                Sentiment Analysis Dashboard
              </h1>
            </div>
            <div className="flex items-center gap-3">
              {" "}
              {/* reduced gap */}
              <label className="text-sm font-medium text-foreground">
                Select Organization:
              </label>
              <select
                value={org}
                onChange={(e) => setOrg(e.target.value)}
                className="bg-background text-foreground border border-input rounded-md px-2 py-1.5 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors text-sm"
              >
                {orgs.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
                <option value="all">All Organizations</option>
              </select>
            </div>
          </div>
        </div>

        {/* Loading state */}
        {loading ? (
          <div className="bg-white rounded-xl shadow-lg">
            <div className="flex flex-col items-center justify-center p-10">
              {" "}
              {/* reduced p-16 to p-10 */}
              <Loader2 className="h-6 w-6 animate-spin text-primary mb-3" />{" "}
              {/* smaller loader */}
              <p className="text-muted-foreground text-sm">
                Loading analysis data...
              </p>
            </div>
          </div>
        ) : !data ? (
          <div className="bg-white rounded-xl shadow-lg">
            <div className="text-center p-10">
              {" "}
              {/* reduced padding */}
              <BarChart3 className="h-10 w-10 text-muted-foreground mx-auto mb-3" />{" "}
              {/* smaller icon */}
              <p className="text-foreground font-medium text-base">
                No data available
              </p>
              <p className="text-muted-foreground text-sm">
                Try selecting a different organization
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="space-y-6">
              <AnalysisDetails data={data} />
              <AnalysisInsights insights={insights} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Analysis;
