import axiosAuth from "../axiosAuth";
import { privateEndpoints } from "../endpoints";

const deliveryCompanyAPI = {
  getDeliveryCompanies: () => {
    const url = `${privateEndpoints.deliveryCompanies}`;
    return axiosAuth.get(url);
  },
};

export default deliveryCompanyAPI;
