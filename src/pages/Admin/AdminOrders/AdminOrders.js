import moment from "moment";
import queryString from "query-string";
import { useEffect, useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import deliveryCompanyAPI from "~/apis/deliveryCompanyAPI/deliveryCompanyAPI";
import orderAPI from "~/apis/orderAPI/orderAPI";
import orderStatusAPI from "~/apis/orderStatusAPI/orderStatusAPI";
import FilterText from "~/components/Filter/FilterText";
import RemoveFilter from "~/components/Filter/RemoveFilter";
import Pagination from "~/components/Pagination/Pagination";
import adminRoutes from "~/routes/adminRoutes";
import { toVND } from "~/utils/NumberFormatter";
import orderSortData from "~/data/orderSortData.json";
import FilterDropdown from "~/components/Filter/FilterDropdown";

function AdminOrders() {
  const [ordersResponse, setOrdersResponse] = useState();
  const [orderStatuses, setOrderStatuses] = useState();
  const [deliveryCompanies, setDeliveryCompanies] = useState();
  const navigate = useNavigate();
  let location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);

  const PAGE_SIZE = 15;

  const getOrderStatuses = async () => {
    const res = await orderStatusAPI.getOrderStatuses();
    if (res.status === 200) setOrderStatuses(res.data.result);
  };

  const getDeliveryCompanies = async () => {
    const res = await deliveryCompanyAPI.getDeliveryCompanies();
    if (res.status === 200) setDeliveryCompanies(res.data.result);
  };

  useEffect(() => {
    getOrderStatuses();
    getDeliveryCompanies();
  }, []);

  useEffect(() => {
    const params = queryString.parse(location.search);

    const getOrders = async () => {
      setLoading(true);
      const res = await orderAPI.getAdminOrders(
        params,
        searchParams.get("page") ? parseInt(searchParams.get("page")) : 1,
        PAGE_SIZE
      );
      if (res.status === 200) {
        setOrdersResponse(res.data.result);
        setLoading(false);
      }
    };

    getOrders();
  }, [searchParams]);

  return (
    <>
      <div className="mt-1">
        <div class="toast-container position-fixed bottom-0 end-0 p-3">
          <div
            id="liveToast"
            class="toast"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
          >
            <div class="toast-header">
              <img src="..." class="rounded me-2" alt="..." />
              <strong class="me-auto">Bootstrap</strong>
              <small>11 mins ago</small>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="toast"
                aria-label="Close"
              ></button>
            </div>
            <div class="toast-body">Hello, world! This is a toast message.</div>
          </div>
        </div>

        <h3 className="mt-2 mb-4 text-gray-800">Danh sách đơn hàng</h3>

        <div className="mb-4">
          <div className="d-flex flex-wrap gap-2">
            <FilterText filterName={"Tìm kiếm đơn hàng"} filterKey={"kw"} />

            <FilterDropdown
              filterList={orderSortData}
              filterName={"Sắp xếp"}
              filterKey={"sort"}
              displayKey={"name"}
              valueKey={"value"}
            />

            <FilterDropdown
              filterList={orderStatuses}
              filterName={"Tình trạng"}
              filterKey={"orderStatusId"}
              displayKey={"name"}
              valueKey={"id"}
            />

            <FilterDropdown
              filterList={deliveryCompanies}
              filterName={"Đơn vị vận chuyển"}
              filterKey={"deliveryCompanyId"}
              displayKey={"name"}
              valueKey={"id"}
            />

            <RemoveFilter />

            {/* <div className="">
              <div className="btn-group">
                <div className="btn-group" role="group">
                  <Link
                    className="btn btn-primary"
                    style={{ width: "180px" }}
                    to={adminRoutes.adminad}
                  >
                    <i className="fa-solid fa-plus me-2"></i>
                    Action...
                  </Link>
                </div>
              </div>
            </div> */}
          </div>
        </div>

        <div className="card shadow mb-4">
          {ordersResponse?.content?.length != 0 ? (
            <>
              <div className="d-flex justify-content-end mt-3 mb-1 px-4">
                <Pagination pageData={ordersResponse} />
              </div>

              <div className="px-4 py-0">
                <table
                  className="table table-hover"
                  width="100%"
                  cellSpacing="0"
                >
                  <thead>
                    <tr>
                      <th style={{ width: "5%" }} className="">
                        ID
                      </th>
                      <th style={{ width: "10%" }} className="text-end">
                        Tổng tiền
                      </th>
                      <th style={{ width: "20%" }} className="ps-5">
                        Khách hàng
                      </th>
                      <th style={{ width: "20%" }}>Ngày đặt hàng</th>
                      <th style={{ width: "15%" }}>Trạng thái</th>
                      <th style={{ width: "15%" }}>Đối tác giao hàng</th>
                      <th style={{ width: "10%" }}>Mã vận đơn</th>
                      <th style={{ width: "5%" }}></th>
                    </tr>
                  </thead>

                  {ordersResponse ? (
                    <>
                      <tbody>
                        {ordersResponse?.content?.map((order) => (
                          <tr
                            key={order.id}
                            onDoubleClick={() => {
                              navigate(
                                `${adminRoutes.adminEditOrder}/${order.id}`
                              );
                            }}
                            style={{ cursor: "pointer" }}
                          >
                            <td className="fw-bolder py-3">
                              <Link
                                to={`${adminRoutes.adminEditOrder}/${order.id}`}
                                className="d-block"
                              >
                                #{order.id}
                              </Link>
                            </td>
                            <td className="align-middle text-end">
                              {toVND(order.totalPrice)}
                            </td>
                            <td className="align-middle ps-5">
                              {order.customer.fullName}
                            </td>
                            <td className="align-middle">
                              {moment(order.createdAt).format("LT")}
                              {" - "}
                              {moment(order.createdAt).format("ll")}
                            </td>
                            <td className="align-middle">
                              {order.orderStatus.name}
                            </td>
                            <td className="align-middle">
                              {order.shipment?.deliveryCompany?.name}
                            </td>
                            <td
                              className="align-middle"
                              onClick={() => {
                                if (order.shipment?.trackingNumber) {
                                  navigator.clipboard.writeText(
                                    order.shipment?.trackingNumber
                                  );
                                  alert("Đã sao chép mã vận đơn");
                                }
                              }}
                            >
                              {order.shipment?.trackingNumber ? (
                                <>
                                  <i className="fa-solid fa-copy me-2"></i>
                                  {order.shipment?.trackingNumber}
                                </>
                              ) : null}
                            </td>
                            <td className="align-middle">
                              <div className="d-flex flex-row justify-content-center">
                                <div className="btn-group">
                                  <a
                                    className="btn rounded border-0"
                                    style={{ cursor: "pointer" }}
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                  >
                                    <i className="fa-solid fa-ellipsis"></i>
                                  </a>
                                  <ul className="dropdown-menu">
                                    <li>
                                      <Link
                                        className="dropdown-item"
                                        to={`${adminRoutes.adminEditOrder}/${order.id}`}
                                      >
                                        Sửa
                                      </Link>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </>
                  ) : (
                    <>
                      <tbody>
                        <tr>
                          <td colSpan={8} className="text-center py-5">
                            <div
                              className="spinner-border"
                              style={{ width: "3rem", height: "3rem" }}
                              role="status"
                            ></div>
                          </td>
                        </tr>
                      </tbody>
                    </>
                  )}
                </table>
              </div>
            </>
          ) : (
            <div
              className="alert alert-danger d-flex align-items-center mt-3 mx-3"
              role="alert"
            >
              <i className="fa-solid fa-square-xmark me-2"></i>
              <div>Không có kết quả nào trùng khớp</div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default AdminOrders;
