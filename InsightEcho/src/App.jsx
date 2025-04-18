import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Reviews from "./pages/Reviews";
import Analysis from "./components/Analysis";
import Header from "./components/Header";

function App() {
  return (
    <Router>
      <div className="flex h-screen">
        {/* Sidebar on the left */}
        <Sidebar />

        {/* Main content area on the right */}
        <div className="flex-1 p-6">
          <Header />
          <Routes>
            <Route path="/" element={<Reviews />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/analysis" element={<Analysis />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
