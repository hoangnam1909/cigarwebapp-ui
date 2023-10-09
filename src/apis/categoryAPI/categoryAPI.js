import axiosAuth from "../axiosAuth";
import axiosClient from "../axiosClient";
import { privateEndpoints, publicEndpoints } from "../endpoints";

const categoryAPI = {
  // Public API
  getCategories: () => {
    const url = `${publicEndpoints.categories}`;
    return axiosClient.get(url);
  },
  getCategory: (id) => {
    const url = `${publicEndpoints.categories}/${id}`;
    return axiosClient.get(url);
  },

  // Private API
  getAdminCategories: (params) => {
    const url = `${privateEndpoints.categories}`;
    return axiosAuth.get(url, { params: params });
  },
  addCategory: (requestBody) => {
    const url = `${privateEndpoints.categories}`;
    return axiosAuth.post(url, requestBody);
  },
  updateCategory: (id, requestBody) => {
    const url = `${privateEndpoints.categories}/${id}`;
    return axiosAuth.put(url, requestBody);
  },
  deleteCategory: (id) => {
    const url = `${privateEndpoints.categories}/${id}`;
    return axiosAuth.delete(url);
  },
};

export default categoryAPI;
