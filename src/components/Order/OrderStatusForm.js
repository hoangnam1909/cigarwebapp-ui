import { useEffect, useState } from "react";
import orderAPI from "~/apis/orderAPI/orderAPI";
import orderStatusAPI from "~/apis/orderStatusAPI/orderStatusAPI";

export default function OrderStatusForm({ order, getOrder }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderStatuses, setOrderStatuses] = useState();
  const [requestBody, setRequestBody] = useState({
    orderStatusId: "",
  });

  const getOrderStatuses = async () => {
    const res = await orderStatusAPI.getOrderStatuses();
    if (res.data.result != null) {
      setOrderStatuses(res.data.result);
    }
  };

  useEffect(() => {
    getOrderStatuses();
    setRequestBody({
      ...requestBody,
      orderStatusId: order.orderStatus.id.toString(),
    });
  }, []);

  const handleSubmitForm = (e) => {
    e.preventDefault();

    const updateOrderStatus = async (e) => {
      setIsSubmitting(true);
      const res = await orderAPI.partialUpdateOrder(order.id, requestBody);

      if (res.status === 200) getOrder();

      setIsSubmitting(false);
    };

    updateOrderStatus();
  };

  return (
    <form
      onSubmit={handleSubmitForm}
      className={`${order ? "" : "loading-skeleton"}`}
    >
      {isSubmitting ? (
        <div
          className="isSubmitting-border me-3 align-self-center"
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : null}

      <select
        className="form-select mb-3"
        disabled={isSubmitting}
        onChange={(e) => {
          setRequestBody({
            ...requestBody,
            orderStatusId: e.target.value.toString(),
          });
        }}
      >
        {orderStatuses?.map((orderStatus) => {
          return (
            <option
              key={orderStatus.id}
              value={orderStatus.id.toString()}
              selected={order?.orderStatus?.id == orderStatus.id}
            >
              {orderStatus.name}
            </option>
          );
        })}
      </select>

      <button
        className="btn btn-primary w-100 py-2"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <span
            className="isSubmitting-border isSubmitting-border-sm me-2"
            aria-hidden="true"
          ></span>
        ) : null}
        <span role="status">Lưu</span>
      </button>
    </form>
  );
}
