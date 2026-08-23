import axios from "axios";

const BASE_URL =
  import.meta.env.VITE_API_URL ||
  "https://attendance-management-system-sooty.vercel.app/api/";

const API = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // Send cookies with requests
});

// Store access token in memory
let accessToken = null;

export const setAccessToken = (token) => {
  accessToken = token;
};

export const getAccessToken = () => {
  return accessToken;
};

export const clearAccessToken = () => {
  accessToken = null;
};

// Request interceptor - add access token to headers
API.interceptors.request.use((req) => {
  if (accessToken) {
    req.headers.Authorization = `Bearer ${accessToken}`;
  }
  return req;
});

// Response interceptor - handle token refresh
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If 401 and haven't retried yet, try to refresh token
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const { data } = await axios.post(
          `${BASE_URL}user/refresh`,
          {},
          { withCredentials: true },
        );

        setAccessToken(data.token);
        originalRequest.headers.Authorization = `Bearer ${data.token}`;

        return API(originalRequest);
      } catch (refreshError) {
        // Refresh failed, redirect to login
        clearAccessToken();
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default API;
