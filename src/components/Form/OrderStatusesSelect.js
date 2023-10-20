import { useEffect, useState } from "react";
import orderStatusAPI from "~/apis/orderStatusAPI/orderStatusAPI";

function OrderStatusesSelect({ data, setData, register }) {
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
        {...register("orderStatusId", {
          valueAsNumber: true,
        })}
        // value={data.orderStatusId}
        // onChange={(e) => {
        //   setData({
        //     ...data,
        //     orderStatusId: e.target.value,
        //   });
        // }}
      >
        {orderStatuses?.map((orderStatus) => {
          return (
            <option
              key={orderStatus.id}
              value={orderStatus.id}
              selected={orderStatus.id == 2}
            >
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
