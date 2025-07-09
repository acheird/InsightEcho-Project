import { Link, useLocation } from "react-router-dom";
import { FileText, Upload, BarChart3, PenTool } from "lucide-react";

const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    { to: "/reviews", label: "Add a Review", icon: PenTool },
    { to: "/upload-csv", label: "Upload Reviews", icon: Upload },
    { to: "/analysis", label: "Analysis", icon: BarChart3 },
  ];

  return (
    <div className="w-64 p-4">
      <div className="h-full rounded-2xl bg-white shadow-lg p-6 flex flex-col">
        <div className="flex items-center gap-2 mb-8">
          <FileText className="text-blue-600" size={24} />
          <h2 className="text-xl font-bold text-blue-700">Dashboard</h2>
        </div>
        <nav className="flex flex-col space-y-2 flex-grow">
          {navItems.map(({ to, label, icon: Icon }) => {
            const isActive = location.pathname === to;

            return (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors group
                  ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-blue-700 hover:bg-blue-100 hover:text-blue-900"
                  }`}
              >
                <Icon
                  size={18}
                  className={`transition-colors ${
                    isActive
                      ? "text-white"
                      : "text-blue-600 group-hover:text-blue-900"
                  }`}
                />
                <span className="font-medium">{label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
