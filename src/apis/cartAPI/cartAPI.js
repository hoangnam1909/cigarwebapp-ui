import { getProductIdsCart } from "~/services/CartService";
import axiosClient from "../axiosClient";
import { publicEndpoints } from "../endpoints";

const cartAPI = {
  getProductsInCart: () => {
    const url = `${publicEndpoints.carts}`;
    return axiosClient.get(url, { params: { ids: getProductIdsCart() } });
  },
};

export default cartAPI;
