import axios from "axios";

const server = axios.create({
  baseURL: process.env.API_BASE_URL || "localhost:3000",
  withCredentials: true,
});

export default server;
