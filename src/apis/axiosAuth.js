import axios from "axios";
import Cookies from "js-cookie";
import { publicEndpoints } from "./endpoints";
import { isTokenExpired } from "~/services/AuthService";

const axiosAuth = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_DOMAIN,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${Cookies.get("accessToken")}`,
  },
});

axiosAuth.interceptors.request.use(
  async (request) => {
    if (isTokenExpired() && Cookies.get("rememberMe") === "true") {
      const res = await axiosAuth.post(publicEndpoints.refreshToken, {
        token: Cookies.get("accessToken"),
      });
      Cookies.set("accessToken", res.data.token);
      request.headers.Authorization = `Bearer ${Cookies.get("accessToken")}`;
    }

    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosAuth;
