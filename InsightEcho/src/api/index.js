import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

export const fetchAnalysis = async (organization) => {
  try {
    const orgParam =
      organization && organization !== "All"
        ? `?organization=${organization}`
        : "";
    const res = await fetch(`${API_BASE_URL}/analysis${orgParam}`);
    return await res.json();
  } catch (error) {
    console.error("Error fetching analysis", error);
    return null;
  }
};

export const submitReview = async (review) => {
  return axios.post(`${API_BASE_URL}/reviews`, review);
};

export const fetchInsights = async (org) => {
  const response = await axios.get(`${API_BASE_URL}/insights`, {
    params: { org },
  });
  return response.data;
};

export const fetchOrganizations = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/organizations`);
    const data = await res.json();
    return data.organizations;
  } catch (error) {
    console.error("Error fetching organizations", error);
    return [];
  }
};
