import { useEffect, useState } from "react";
import deliveryCompanyAPI from "~/apis/deliveryCompanyAPI/deliveryCompanyAPI";

function DeliveryConmpaniesSelect({ data, setData }) {
  const [deliveryCompanies, setDeliveryCompanies] = useState();

  const getDeliveryCompanies = async () => {
    const res = await deliveryCompanyAPI.getDeliveryCompanies();
    if (res.data.result != null) {
      setDeliveryCompanies(res.data.result);
    }
  };

  useEffect(() => {
    getDeliveryCompanies();
  }, []);

  return (
    <>
      <select
        className="form-select"
        value={data.deliveryCompanyId}
        onChange={(e) => {
          setData({
            ...data,
            deliveryCompanyId: e.target.value,
          });
        }}
      >
        {deliveryCompanies?.map((deliveryCompany) => {
          return (
            <option key={deliveryCompany.id} value={deliveryCompany.id}>
              {deliveryCompany.name}
            </option>
          );
        })}
      </select>
      <label>Đơn vị vận chuyển</label>
    </>
  );
}

export default DeliveryConmpaniesSelect;
