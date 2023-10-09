import { useEffect, useState } from "react";
import deliveryCompanyAPI from "~/apis/deliveryCompanyAPI/deliveryCompanyAPI";
import orderAPI from "~/apis/orderAPI/orderAPI";

export default function DeliveryPartner({ order, getOrder }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deliveryCompanies, setDeliveryCompanies] = useState();
  const [requestBody, setRequestBody] = useState({
    trackingNumber: order?.shipment?.trackingNumber
      ? order.shipment.trackingNumber
      : "",
    deliveryCompanyId: order?.shipment?.deliveryCompany?.id
      ? order.shipment.deliveryCompany.id.toString()
      : "",
  });

  const getDeliveryCompanies = async () => {
    const res = await deliveryCompanyAPI.getDeliveryCompanies();
    if (res.data.result != null) {
      setDeliveryCompanies(res.data.result);
    }
  };

  useEffect(() => {
    getDeliveryCompanies();
  }, []);

  const handleUpdateDelivery = (e) => {
    e.preventDefault();

    const updateDeliveryCompany = async () => {
      setIsSubmitting(true);
      const res = await orderAPI.partialUpdateOrder(order.id, requestBody);
      if (res.status === 200) getOrder();
      setIsSubmitting(false);
    };

    updateDeliveryCompany();
  };

  return (
    <>
      <form onSubmit={handleUpdateDelivery}>
        <div className="mb-3">
          <label className="form-label">Mã vận đơn</label>
          <input
            type="text"
            className="form-control"
            placeholder="Mã vận đơn"
            value={requestBody.trackingNumber}
            onChange={(e) =>
              setRequestBody({
                ...requestBody,
                trackingNumber: e.target.value,
              })
            }
          />
        </div>

        <select
          className="form-select mb-3"
          disabled={isSubmitting}
          onChange={(e) =>
            setRequestBody({
              ...requestBody,
              deliveryCompanyId: e.target.value.toString(),
            })
          }
        >
          <option value={""}>Đối tác giao hàng</option>
          {deliveryCompanies?.map((deliveryCompany) => {
            return (
              <option
                key={deliveryCompany.id}
                value={deliveryCompany.id.toString()}
                selected={requestBody.deliveryCompanyId == deliveryCompany.id}
              >
                {deliveryCompany.name}
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
              className="spinner-border spinner-border-sm me-2"
              aria-hidden="true"
            ></span>
          ) : null}
          <span role="status">Lưu</span>
        </button>
      </form>
    </>
  );
}
