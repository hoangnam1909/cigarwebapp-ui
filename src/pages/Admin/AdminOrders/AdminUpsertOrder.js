import moment from "moment";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import orderAPI from "~/apis/orderAPI/orderAPI";
import paymentAPI from "~/apis/paymentAPI/paymentAPI";
import DeliveryPartner from "~/components/Order/DeliveryPartner";
import OrderStatusForm from "~/components/Order/OrderStatusForm";
import { toVND } from "~/utils/NumberFormatter";
import { formatPhoneNumber } from "~/utils/StringFormatter";
import "react-loading-skeleton/dist/skeleton.css";

function AdminUpsertOrder() {
  const { orderId } = useParams();

  const [reloadFlag, setReloadFlag] = useState(false);

  document.title = `${
    orderId == null ? "Thêm đơn hàng" : `Chỉnh sửa đơn hàng #${orderId}`
  }`;

  const [order, setOrder] = useState();

  const getOrder = async () => {
    const res = await orderAPI.getAdminOrder(orderId);
    if (res.status === 200) setOrder(res.data.result);
  };

  const recreatePaymentUrl = async () => {
    try {
      const res = await paymentAPI.adminRecreatePaymentUrl(orderId);
      if (res.status === 200) {
        toast.success("Đã tạo mới thông tin thanh toán");
        setReloadFlag(!reloadFlag);
      }
    } catch (error) {
      toast.error(error.response.data.result);
    }
  };

  const updatePayment = async () => {
    try {
      const res = await paymentAPI.adminUpdatePaymentStatus(orderId);
      if (res.status === 200) {
        toast.success("Đã cập nhật kết quả thanh toán");
        setReloadFlag(!reloadFlag);
      }
    } catch (error) {
      toast.error(error.response.data.result);
    }
  };

  useEffect(() => {
    getOrder();
  }, [reloadFlag]);

  return (
    <>
      <div className="mt-1">
        {order ? (
          <h3 className="mb-4 text-gray-800">Đơn hàng #{orderId}</h3>
        ) : (
          <h3 className="mb-4 text-gray-800">
            <Skeleton />
          </h3>
        )}

        <div className="row row-cols-1 row-cols-xxl-2 g-3">
          <div className="col-12 col-xxl-8">
            <div className="card shadow p-3">
              <div className="d-flex justify-content-between border-bottom mb-4 pb-3 gap-2">
                <h5 className="mb-0">
                  {order ? (
                    <>
                      {moment(order?.createdAt).format("LTS")}
                      {" - "}
                      {moment(order?.createdAt).format("LL")}
                    </>
                  ) : (
                    <Skeleton width={300} />
                  )}
                </h5>

                <h6 className="mb-0">
                  {order ? (
                    <>
                      Tình trạng:{" "}
                      <span className="text-primary">
                        {order.orderStatus?.name}
                      </span>
                    </>
                  ) : (
                    <Skeleton width={200} />
                  )}
                </h6>
              </div>

              <div className="row row-cols-1 row-cols-lg-3 g-2">
                <div className="col d-flex mb-3 overflow-wrap">
                  <div className="customer-icon me-2">
                    <i
                      className="fa-solid fa-user mt-1"
                      style={{ height: "30px" }}
                    ></i>
                  </div>

                  <div className="customer-info w-100">
                    <h6>Khách hàng</h6>

                    {order ? (
                      <>
                        {order?.customer.fullName ? (
                          <p className="mb-0">{order?.customer.fullName}</p>
                        ) : null}

                        {order?.customer.phone ? (
                          <p className="mb-0">
                            {formatPhoneNumber(order?.customer.phone)}
                          </p>
                        ) : null}

                        {order?.customer.email ? (
                          <p className="mb-0">{order?.customer.email}</p>
                        ) : null}
                      </>
                    ) : (
                      <Skeleton count={3} />
                    )}
                  </div>
                </div>

                <div className="col d-flex mb-3">
                  <div className="shipment-icon me-2">
                    <i
                      className="fa-solid fa-truck mt-1"
                      style={{ height: "30px" }}
                    ></i>
                  </div>

                  <div className="shipment-info w-100">
                    <h6>Giao hàng</h6>

                    {order ? (
                      <>
                        <p className="mb-0">
                          {order?.shipment?.deliveryCompany?.name}
                        </p>
                        <p className="mb-0">
                          {order?.shipment?.trackingNumber}
                        </p>
                        <p className="mb-0">{order?.shipment?.address}</p>
                      </>
                    ) : (
                      <Skeleton count={3} />
                    )}
                  </div>
                </div>

                <div className="col d-flex mb-3">
                  <div className="payment-icon me-2">
                    <i
                      className="fa-regular fa-credit-card mt-1"
                      style={{ height: "30px" }}
                    ></i>
                  </div>

                  <div className="payment-info w-100">
                    <h6>Thanh toán</h6>
                    {order ? (
                      <>
                        <p className="mb-0">
                          {order?.payment?.paymentDestination.name}
                        </p>

                        {order?.payment?.isPaid ? (
                          <>
                            <p className="text-success mb-0">Đã thanh toán</p>
                          </>
                        ) : (
                          <>
                            <a
                              href={order?.payment.paymentUrl}
                              target="_blank"
                              rel="noopener"
                              className="text-danger mb-0"
                            >
                              Chưa thanh toán
                            </a>
                            {order?.payment?.paymentDestination?.id != "cod" ? (
                              <>
                                <a
                                  className="btn btn-outline-success w-100 px-3 mt-1"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    recreatePaymentUrl();
                                  }}
                                >
                                  <i className="fa-solid fa-rotate me-2"></i>
                                  Tạo mới thanh toán
                                </a>

                                <a
                                  className="btn btn-outline-danger w-100 px-3 mt-1"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    updatePayment();
                                  }}
                                >
                                  <i className="fa-solid fa-rotate-right me-2"></i>
                                  Cập nhật kết quả
                                </a>
                              </>
                            ) : null}
                          </>
                        )}
                      </>
                    ) : (
                      <Skeleton count={3} />
                    )}
                  </div>
                </div>
              </div>

              <div className="table-responsive">
                <table className="table table-border mb-0">
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
                    {order ? (
                      <>
                        {order?.orderItems
                          .sort((item1, item2) => {
                            return item1.id - item2.id;
                          })
                          .map((orderItem) => {
                            return (
                              <tr key={orderItem.id}>
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
                                      className="object-fit-cover rounded border"
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
                                  {toVND(orderItem?.price)}
                                </td>
                                <td className="text-end align-middle">
                                  {toVND(orderItem.quantity * orderItem?.price)}
                                </td>
                              </tr>
                            );
                          })}
                      </>
                    ) : (
                      <>
                        {Array.from(Array(3), (e, i) => {
                          return (
                            <tr key={i}>
                              <td colSpan={2} style={{ width: "150px" }}>
                                <Skeleton />
                              </td>

                              <td className="text-center align-middle">
                                <Skeleton />
                              </td>
                              <td className="text-end align-middle">
                                <Skeleton />
                              </td>
                              <td className="text-end align-middle">
                                <Skeleton />
                              </td>
                            </tr>
                          );
                        })}
                      </>
                    )}
                  </tbody>
                  <tfoot className="">
                    <tr className="border-top">
                      <td className="fw-medium" colSpan={4}>
                        Tổng tiền
                      </td>
                      <td className="fw-semibold text-danger text-end">
                        {order ? <>{toVND(order?.totalPrice)}</> : <Skeleton />}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>

          <div className="col-12 col-xxl-4">
            <div className="row g-3">
              <div className="col-12 col-md-6 col-xxl-12">
                <div className="card shadow p-3">
                  <h5 className="mb-3 text-gray-800">Tình trạng đơn hàng</h5>
                  <OrderStatusForm order={order} getOrder={getOrder} />
                </div>
              </div>
              <div className="col-12 col-md-6 col-xxl-12">
                <div className="card shadow p-3">
                  <h5 className="mb-3 text-gray-800">Đối tác giao hàng</h5>
                  <DeliveryPartner order={order} getOrder={getOrder} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminUpsertOrder;
