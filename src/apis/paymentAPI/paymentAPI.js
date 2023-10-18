import axiosAuth from "../axiosAuth";
import axiosClient from "../axiosClient";
import { privateEndpoints, publicEndpoints } from "../endpoints";

const paymentAPI = {
  updatePaymentStatus: (requestBody) => {
    const url = `${publicEndpoints.updatePaymentStatus}`;
    return axiosClient.patch(url, requestBody);
  },

  // ADMIN
  adminUpdatePaymentStatus: (orderId) => {
    const url = `${privateEndpoints.updatePaymentStatus}/${orderId}`;
    return axiosAuth.patch(url);
  },
  adminRecreatePaymentUrl: (orderId) => {
    const url = `${privateEndpoints.recreatePaymentUrl}/${orderId}`;
    return axiosAuth.patch(url);
  },
};

export default paymentAPI;
