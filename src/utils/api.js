import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

api.interceptors.request.use(
  (config) => {
    // Skip adding token for auth/register and auth/verify
    if (
      config.url.includes("/auth/register/") ||
      config.url.includes("/auth/verify/") ||
      config.url.includes("/auth/login/")
    ) {
      return config;
    }

    const token = localStorage.getItem("access");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;