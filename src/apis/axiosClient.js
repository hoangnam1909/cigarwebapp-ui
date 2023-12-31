import axios from "axios";

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_DOMAIN,
});

axiosClient.interceptors.response.use(
  function (response) {
    // Optional: Do something with response data
    return response;
  },
  function (error) {
    // Do whatever you want with the response error here:

    // But, be SURE to return the rejected promise, so the caller still has
    // the option of additional specialized handling at the call-site:
    return Promise.reject(error);
  }
);

export default axiosClient;
