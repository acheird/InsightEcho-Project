import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

export const fetchAnalysis = async () => {
  const res = await axios.get(`${API_BASE_URL}/analysis`);
  return res.data;
};

export const submitReview = async (review) => {
  return axios.post(`${API_BASE_URL}/reviews`, review);
};

export const fetchInsights = async () => {
  const response = await axios.get(`${API_BASE_URL}/insights`);
  return response.data;
};
