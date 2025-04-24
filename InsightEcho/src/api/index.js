import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

export const fetchAnalysis = async (organization) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/analysis`, {
      params: organization && organization !== "all" ? { organization } : {},
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching analysis:", error);
    return null;
  }
};

export const submitReview = async (review) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/reviews`, review);
    return response.data;
  } catch (error) {
    console.error("Error submitting review:", error);
    throw error;
  }
};

export const fetchInsights = async (organization) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/insights`, {
      params: organization && organization !== "all" ? { organization } : {},
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching insights:", error);
    return [];
  }
};

export const fetchOrganizations = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/organizations`);
    return response.data.organizations;
  } catch (error) {
    console.error("Error fetching organizations:", error);
    return [];
  }
};

export const uploadCSV = async (formData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/upload-csv`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error uploading CSV:", error);
    throw error;
  }
};
