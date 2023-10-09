import axiosAuth from "../axiosAuth";
import axiosClient from "../axiosClient";
import { privateEndpoints, publicEndpoints } from "../endpoints";

const brandAPI = {
  // Public API
  getBrands: () => {
    const url = `${publicEndpoints.brands}`;
    return axiosClient.get(url);
  },

  // Private API
  getAdminBrand: (id) => {
    const url = `${privateEndpoints.brands}/${id}`;
    return axiosAuth.get(url);
  },
  getAdminBrands: (params) => {
    const url = `${privateEndpoints.brands}`;
    return axiosAuth.get(url, { params: params });
  },
  addBrand: (requestBody) => {
    const url = `${privateEndpoints.brands}`;
    return axiosAuth.post(url, requestBody);
  },
  updateBrand: (id, requestBody) => {
    const url = `${privateEndpoints.brands}/${id}`;
    return axiosAuth.put(url, requestBody);
  },
  deleteBrand: (id) => {
    const url = `${privateEndpoints.brands}/${id}`;
    return axiosAuth.delete(url);
  },
};

export default brandAPI;
