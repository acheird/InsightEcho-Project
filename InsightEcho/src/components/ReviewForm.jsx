import { useState } from "react";
import { submitReview } from "../api";

const ReviewForm = ({ onReviewSubmitted }) => {
  const [text, setText] = useState("");
  const [rating, setRating] = useState(3);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await submitReview({ text, rating });
      setText(""); // Reset form
      setRating(3);
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
    <div className="flex bg-white shadow-lg rounded-lg p-6 w-1/2">
      <h2 className="text-lg text-black font-bold mb-4">Submit a Review</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          className="bg-white w-full text-black p-2 border rounded"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter your review..."
          required
        />
        <select
          className="w-full bg-white text-black p-2 border rounded"
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
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
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
