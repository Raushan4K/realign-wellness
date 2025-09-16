import axios from "axios";

const httpClient = axios.create({
  /** Local dev */
  baseURL: "http://localhost:8080/api",

  /** Prod URL */
  // baseURL: "https://realign-wellness.onrender.com/api",
  contentType: "application/json",
});

httpClient.interceptors.request.use((config) => {
  config.headers.Authorization = localStorage.getItem("token")
    ? `Bearer ${localStorage.getItem("token")}`
    : undefined;
  return config;
});

export default httpClient;
