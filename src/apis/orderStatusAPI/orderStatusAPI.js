import axiosAuth from "../axiosAuth";
import { privateEndpoints } from "../endpoints";

const orderStatusAPI = {
  getOrderStatuses: () => {
    const url = `${privateEndpoints.orderStatus}`;
    return axiosAuth.get(url);
  },
};

export default orderStatusAPI;
