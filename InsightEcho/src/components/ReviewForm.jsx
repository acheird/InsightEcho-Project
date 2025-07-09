import { useState } from "react";
import { submitReview } from "../api";

const ReviewForm = ({ onReviewSubmitted }) => {
  const [text, setText] = useState("");
  const [rating, setRating] = useState(3);
  const [organization, setOrganization] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await submitReview({ text, rating, organization });
      setText("");
      setRating(3);
      setOrganization("");
      if (onReviewSubmitted) {
        onReviewSubmitted();
      }
    } catch (error) {
      console.error("Submission failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-4">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
            Submit a Review
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="organization"
                className="block mb-2 text-sm font-medium text-gray-800"
              >
                Organization
              </label>
              <input
                id="organization"
                name="organization"
                type="text"
                placeholder="Enter organization name"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md bg-white text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
              />
            </div>

            <div>
              <label
                htmlFor="review-text"
                className="block mb-2 text-sm font-medium text-gray-800"
              >
                Review Text
              </label>
              <textarea
                id="review-text"
                placeholder="Share your experience..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded-md bg-white text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition resize-none min-h-[100px] placeholder-gray-400"
              />
            </div>

            <div>
              <label
                htmlFor="rating"
                className="block mb-2 text-sm font-medium text-gray-800"
              >
                Rating
              </label>
              <select
                id="rating"
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="w-full p-3 border border-gray-300 rounded-md bg-white text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
              >
                {Array(5)
                  .fill()
                  .map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1} Star{i + 1 !== 1 ? "s" : ""}
                    </option>
                  ))}
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold shadow hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? "Submitting..." : "Submit Review"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReviewForm;
