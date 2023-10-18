import { useEffect, useState } from "react";
import orderStatusAPI from "~/apis/orderStatusAPI/orderStatusAPI";

function OrderStatusesSelect({ data, setData }) {
  const [orderStatuses, setOrderStatuses] = useState();

  const getOrderStatuses = async () => {
    const res = await orderStatusAPI.getOrderStatuses();
    if (res.data.result != null) {
      setOrderStatuses(res.data.result);
    }
  };

  useEffect(() => {
    getOrderStatuses();
  }, []);

  return (
    <>
      <select
        className="form-select"
        value={data.orderStatusId}
        onChange={(e) => {
          setData({
            ...data,
            orderStatusId: e.target.value,
          });
        }}
      >
        {orderStatuses?.map((orderStatus, index) => {
          return (
            <option key={index} value={orderStatus.id}>
              {orderStatus.name}
            </option>
          );
        })}
      </select>
      <label>Đơn vị vận chuyển</label>
    </>
  );
}

export default OrderStatusesSelect;
