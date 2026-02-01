import axios from "axios";

const API = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}/v1`,
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
