import axiosAuth from "../axiosAuth";
import axiosClient from "../axiosClient";
import { privateEndpoints, publicEndpoints } from "../endpoints";

const paymentAPI = {
  updatePaymentStatus: (requestId, paymentOrderId) => {
    const url = `${publicEndpoints.updatePaymentStatus}`;
    return axiosClient.patch(url, {
      requestId: requestId,
      paymentOrderId: paymentOrderId,
    });
  },

  // ADMIN
  adminUpdatePaymentStatus: (orderId) => {
    const url = `${privateEndpoints.updatePaymentStatus}/${orderId}`;
    return axiosAuth.patch(url);
  },
};

export default paymentAPI;
