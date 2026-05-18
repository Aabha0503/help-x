import axios from "axios";

// API flow:
// 1. Vite reads VITE_API_BASE_URL from .env.
// 2. Axios sends requests to the Express backend at http://localhost:5000/api.
// 3. Response interceptors unwrap the backend's { success, data } envelope.
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "https://musical-space-journey-7vpxg676grgpfrgwv-5000.app.github.dev/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json"
  }
});

apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.message || error.message || "Unable to reach Help-X backend";
    return Promise.reject(new Error(message));
  }
);

export default apiClient;