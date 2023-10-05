import axiosClient from "../axiosClient";
import { publicEndpoints } from "../endpoints";

const authAPI = {
  authenticate: (requestBody) => {
    const url = `${publicEndpoints.authenticate}`;
    return axiosClient.post(url, requestBody);
  },
  refreshToken: (refreshToken) => {
    const url = `${publicEndpoints.refreshToken}`;
    return axiosClient.post(url, {
      refreshToken: refreshToken,
    });
  },
};

export default authAPI;
