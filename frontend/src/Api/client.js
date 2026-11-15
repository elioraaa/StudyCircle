import axios from "axios";

// CRA exposes variables with the REACT_APP_ prefix. Keep VITE_API_URL as a
// fallback for projects that later move to Vite.
const apiUrl = process.env.REACT_APP_API_URL || process.env.VITE_API_URL || "http://localhost:3000/api";
const client = axios.create({ baseURL: apiUrl });

client.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default client;
