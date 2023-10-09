import axiosClient from "../axiosClient";
import { publicEndpoints } from "../endpoints";

const paymentDestinationAPI = {
  getPaymentDestinations: () => {
    const url = `${publicEndpoints.paymentDestinations}`;
    return axiosClient.get(url);
  },
};

export default paymentDestinationAPI;
