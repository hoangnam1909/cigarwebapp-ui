import moment from "moment";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import orderAPI from "~/apis/orderAPI/orderAPI";
import DeliveryPartner from "~/components/Order/DeliveryPartner";
import OrderStatusForm from "~/components/Order/OrderStatusForm";
import { toVND } from "~/utils/NumberFormatter";
import { formatPhoneNumber } from "~/utils/StringFormatter";

function AdminUpsertOrder() {
  const { orderId } = useParams();

  document.title = `${
    orderId == null ? "Thêm đơn hàng" : `Chỉnh sửa đơn hàng #${orderId}`
  }`;

  const [order, setOrder] = useState();

  const getOrder = async () => {
    const res = await orderAPI.getAdminOrder(orderId);
    if (res.status === 200) setOrder(res.data.result);
  };

  useEffect(() => {
    getOrder();
  }, []);

  if (order) {
    return (
      <>
        <div className="mt-1">
          <h3 className="mb-4 text-gray-800">Đơn hàng #{orderId}</h3>

          <div className="row row-cols-1 row-cols-xxl-2 g-3">
            <div className="col-12 col-xxl-8">
              <div className="card shadow p-4 mb-2">
                <div className="mb-4 d-flex justify-content-between border-bottom pb-3 gap-2">
                  <h5 className="mb-1">
                    {moment(order.createdAt).format("LTS")}
                    {" - "}
                    {moment(order.createdAt).format("LL")}
                  </h5>
                  <h6 className="mb-1">
                    Tình trạng:{" "}
                    <span className="text-danger">
                      {order.orderStatus?.name}
                    </span>
                  </h6>
                </div>

                <div className="row row-cols-1 row-cols-lg-3 g-2">
                  <div className="col d-flex mb-3 overflow-wrap">
                    <div className="customer-icon me-2">
                      <i
                        class="fa-solid fa-user mt-1"
                        style={{ height: "30px" }}
                      ></i>
                    </div>

                    <div className="customer-info w-100">
                      <h6>Khách hàng</h6>

                      {order.customer.fullName ? (
                        <p className="mb-0">{order.customer.fullName}</p>
                      ) : null}

                      {order.customer.phone ? (
                        <p className="mb-0">
                          {formatPhoneNumber(order.customer.phone)}
                        </p>
                      ) : null}

                      {order.customer.email ? (
                        <p className="mb-0">{order.customer.email}</p>
                      ) : null}
                    </div>
                  </div>

                  <div className="col d-flex mb-3">
                    <div className="customer-icon me-2">
                      <i
                        class="fa-solid fa-truck mt-1"
                        style={{ height: "30px" }}
                      ></i>
                    </div>

                    <div className="customer-info">
                      <h6>Giao hàng</h6>
                      <p className="mb-0">
                        {order.shipment?.deliveryCompany?.name}
                      </p>
                      <p className="mb-0">{order.shipment?.trackingNumber}</p>
                      <p className="mb-0">{order.shipment?.address}</p>
                    </div>
                  </div>

                  <div className="col d-flex mb-3">
                    <div className="customer-icon me-2">
                      <i
                        class="fa-regular fa-credit-card mt-1"
                        style={{ height: "30px" }}
                      ></i>
                    </div>

                    <div className="customer-info">
                      <h6>Thanh toán</h6>
                      <p className="mb-0">
                        {order.payment?.paymentDestination.name}
                      </p>
                      <p className="mb-0">
                        {order.payment?.isPaid ? (
                          <span className="text-success">Đã thanh toán</span>
                        ) : (
                          <span className="text-danger">Chưa thanh toán</span>
                        )}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="table-responsive">
                  <table className="table table-border">
                    <thead>
                      <tr className="border-top">
                        <td className="fw-semibold" colSpan={2}>
                          Sản phẩm
                        </td>
                        <td className="fw-semibold text-center">SL</td>
                        <td className="fw-semibold text-end">Đơn giá</td>
                        <td className="fw-semibold text-end">Thành tiền</td>
                      </tr>
                    </thead>
                    <tbody>
                      {order?.orderItems
                        .sort((item1, item2) => {
                          return item1.id - item2.id;
                        })
                        .map((orderItem, index) => {
                          return (
                            <tr key={index}>
                              <td style={{ width: "70px" }}>
                                <Link
                                  to={`/products/${orderItem.product.id}`}
                                  target="_blank"
                                  rel="noopener"
                                >
                                  <img
                                    src={
                                      orderItem.product.productImages[0]
                                        ?.linkToImage
                                    }
                                    width="70"
                                    height="70"
                                    style={{ objectFit: "cover" }}
                                    className="rounded"
                                  />
                                </Link>
                              </td>

                              <td>
                                <Link
                                  to={`/products/${orderItem.product.id}`}
                                  target="_blank"
                                  rel="noopener"
                                >
                                  <p className="fw-medium">
                                    {orderItem.product.name}
                                  </p>
                                </Link>
                              </td>

                              <td className="text-center align-middle">
                                {orderItem.quantity}
                              </td>
                              <td className="text-end align-middle">
                                {toVND(orderItem.product.salePrice)}
                              </td>
                              <td className="text-end align-middle">
                                {toVND(
                                  orderItem.quantity *
                                    orderItem.product.salePrice
                                )}
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                    <tfoot className="">
                      <tr className="border-top">
                        <td className="fw-medium" colSpan={4}>
                          Tổng tiền
                        </td>
                        <td className="fw-semibold text-danger text-end">
                          {toVND(order.totalPrice)}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>

            <div className="col-12 col-xxl-4">
              <div className="card shadow p-4 mb-3">
                <h5 className="mb-3 text-gray-800">Tình trạng đơn hàng</h5>

                <OrderStatusForm order={order} getOrder={getOrder} />
              </div>

              <div className="card shadow p-4 mb-3">
                <h5 className="mb-3 text-gray-800">Đối tác giao hàng</h5>

                <DeliveryPartner order={order} getOrder={getOrder} />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default AdminUpsertOrder;