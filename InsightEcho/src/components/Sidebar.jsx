import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-900 text-white h-full p-4">
      <h2 className="text-xl font-bold mb-6">Menu</h2>
      <ul>
        <li className="mb-4">
          <Link to="/reviews" className="hover:text-gray-400">
            Reviews
          </Link>
        </li>
        <li>
          <Link to="/analysis" className="hover:text-gray-400">
            Analysis
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
