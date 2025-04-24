import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 rounded-2xl my-8 ml-8 shadow-xl bg-gradient-to-br from-white via-blue-50 to-blue-100 border border-blue-100 flex flex-col p-8">
      <div className="flex items-center gap-2 mb-8">
        <h2 className="text-xl font-bold text-blue-600 tracking-tight">
          Dashboard
        </h2>
      </div>
      <ul className="flex flex-col gap-2">
        <li>
          <Link to="/reviews" className="hover:text-gray-300 transition-colors">
            Add a Review
          </Link>
        </li>
        <li>
          <Link
            to="/upload-csv"
            className="hover:text-gray-300 transition-colors"
          >
            Upload Reviews
          </Link>
        </li>
        <li>
          <Link
            to="/analysis"
            className="hover:text-gray-300 transition-colors"
          >
            Analysis
          </Link>
        </li>
      </ul>
      <div className="flex-1" />
    </div>
  );
};

export default Sidebar;
