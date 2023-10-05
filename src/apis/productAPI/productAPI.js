import axiosAuth from "../axiosAuth";
import axiosClient from "../axiosClient";
import { privateEndpoints, publicEndpoints } from "../endpoints";

const productAPI = {
  // Public API
  getProducts: (params, page, size) => {
    const url = `${publicEndpoints.products}`;
    return axiosClient.get(url, {
      params: {
        ...params,
        page: page ? page : 1,
        size: size,
      },
    });
  },
  getProductByID: (id) => {
    const url = `${publicEndpoints.products}/${id}`;
    return axiosClient.get(url);
  },
  getProductsSuggestion: (id, amount) => {
    const url = `${publicEndpoints.productsSuggestion}/${id}`;
    return axiosClient.get(url, {
      params: {
        count: amount,
      },
    });
  },

  // Private API
  getAdminProducts: (params, page, size) => {
    const url = `${privateEndpoints.products}`;
    return axiosAuth.get(url, {
      params: {
        ...params,
        page: page ? page : 1,
        size: size,
      },
    });
  },
  getAdminProductByID: (id) => {
    const url = `${privateEndpoints.products}/${id}`;
    return axiosAuth.get(url);
  },
  addProduct: (formData) => {
    const url = `${privateEndpoints.products}`;
    return axiosAuth.post(url, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  entireUpdateProduct: (id, formData) => {
    const url = `${privateEndpoints.products}/${id}`;
    return axiosAuth.put(url, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  partialUpdateProduct: (id, params) => {
    const url = `${privateEndpoints.products}/${id}`;
    return axiosAuth.patch(url, params);
  },
  deleteProduct: (id) => {
    const url = `${privateEndpoints.products}/${id}`;
    return axiosAuth.delete(url);
  },
};

export default productAPI;
