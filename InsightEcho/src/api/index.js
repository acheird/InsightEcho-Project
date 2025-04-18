import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

export const fetchAnalysis = async () => {
  return axios.get(`${API_BASE_URL}/analysis`);
};

export const submitReview = async (review) => {
  return axios.post(`${API_BASE_URL}/reviews`, review);
};
