import ReviewForm from "../components/ReviewForm";

const Reviews = () => {
  return <ReviewForm onReviewSubmitted={() => alert("Review submitted!")} />;
};

export default Reviews;
