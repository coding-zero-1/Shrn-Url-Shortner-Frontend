import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4000/v1",
});

API.interceptors.request.use((req) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      req.headers.token = token;
    }
  }
  return req;
});

export default API;
