import axiosAuth from "../axiosAuth";
import axiosClient from "../axiosClient";
import { privateEndpoints, publicEndpoints } from "../endpoints";

const orderAPI = {
  // Public API
  addOrder: (requestBody) => {
    const url = `${publicEndpoints.orders}`;
    return axiosClient.post(url, requestBody);
  },
  trackingOrder: (orderId, phone) => {
    const url = `${publicEndpoints.trackingOrder}`;
    return axiosClient.get(url, {
      params: {
        orderId: orderId,
        phone: phone,
      },
    });
  },

  // Private API
  adminAddOrder: (requestBody) => {
    const url = `${privateEndpoints.orders}`;
    return axiosAuth.post(url, requestBody);
  },
  getAdminOrders: (params, page, size) => {
    const url = `${privateEndpoints.orders}`;
    return axiosAuth.get(url, {
      params: {
        ...params,
        page: page,
        size: size,
      },
    });
  },
  getAdminOrder: (id) => {
    const url = `${privateEndpoints.orders}/${id}`;
    return axiosAuth.get(url);
  },
  partialUpdateOrder: (id, requestBody) => {
    const url = `${privateEndpoints.orders}/${id}`;
    return axiosAuth.patch(url, requestBody);
  },
};

export default orderAPI;
