import axios from "axios";

const MAIN_URL = "http://localhost:5000";

const axiosInstance = axios.create({
  withCredentials: true,
});

// eslint-disable-next-line
const setCsrfToken = async (config) => {
  try {
    const response = await axios.get(`${MAIN_URL}/csrf-token`, {
      withCredentials: true,
    });
    const csrfToken = response.data.csrfToken;
    if (csrfToken) {
      config.headers["X-Csrf-Token"] = csrfToken;
    }
  } catch (error) {
    console.error("Failed to fetch CSRF token", error);
  }
  return config;
};

// axiosInstance.interceptors.request.use(
//   async (config) => await setCsrfToken(config),
//   (error) => Promise.reject(error)
// );

export default axiosInstance;
