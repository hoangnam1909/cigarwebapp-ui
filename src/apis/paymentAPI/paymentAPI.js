import axiosClient from "../axiosClient";
import { publicEndpoints } from "../endpoints";

const paymentAPI = {
  updatePaymentStatus: (requestId, paymentOrderId) => {
    const url = `${publicEndpoints.updatePaymentStatus}`;
    return axiosClient.patch(url, {
      requestId: requestId,
      paymentOrderId: paymentOrderId,
    });
  },
};

export default paymentAPI;
