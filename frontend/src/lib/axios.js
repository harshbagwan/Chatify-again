import axios from "axios";

export const axiosInstance = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:3000/api"
      : "/api", //"/api" sends the requeest to same domain as the frontend, which is the backend server in production. In development, it sends the request to localhost:3000/api, where 3000 is the port number of the backend server.
  withCredentials: true, // This option allows the browser to send cookies along with the request. It is necessary for authentication and session management when the frontend and backend are on different domains or ports.
});
