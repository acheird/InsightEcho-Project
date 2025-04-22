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
      setText(""); // Reset form
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
    <div
      className="flex flex-col bg-white/90 shadow-lg rounded-lg p-6 h-full w-full max-w-xl mx-auto"
      style={{
        background: "linear-gradient(109.6deg, #dfeaf7 11.2%, #f4f8fc 91.1%)",
      }}
    >
      <h2 className="text-xl text-black font-bold mb-4 p-3 w-full text-center">
        Submit a Review
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4 w-full">
        <input
          className="w-full bg-white text-black p-3 border border-gray-300 rounded focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition"
          type="text"
          name="organization"
          placeholder="Organization"
          value={organization}
          onChange={(e) => setOrganization(e.target.value)}
        />
        <textarea
          className="bg-white text-black p-3 border border-gray-300 rounded focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition w-full resize-none min-h-[80px] placeholder:text-gray-400"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter your review..."
          required
        />
        <select
          className="w-full bg-white text-black p-3 border border-gray-300 rounded focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
        >
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>
              {num} Stars
            </option>
          ))}
        </select>
        <button
          className="bg-blue-600 text-white px-6 py-2 rounded shadow w-full font-semibold hover:bg-blue-700 transition disabled:bg-gray-400"
          type="submit"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Review"}
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
