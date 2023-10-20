import axios from "axios";

const BASE_URL = "https://provinces.open-api.vn/api";

const provinceAPI = {
  // Public API
  getProvince: (id) => {
    const url = `${BASE_URL}/p/${id}`;
    return axios.get(url);
  },
  getDistrict: (id) => {
    const url = `${BASE_URL}/d/${id}`;
    return axios.get(url);
  },
  getWard: (id) => {
    const url = `${BASE_URL}/w/${id}`;
    return axios.get(url);
  },
};

export default provinceAPI;
