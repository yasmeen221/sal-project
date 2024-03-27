import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL as string;
if (!apiUrl) {
  throw new Error("Missing API base URL");
}
const axiosInstance = axios.create({
  baseURL: apiUrl,
});
// axiosInstance("login");
axiosInstance.interceptors.response.use((response) => response.data);
export default axiosInstance;
