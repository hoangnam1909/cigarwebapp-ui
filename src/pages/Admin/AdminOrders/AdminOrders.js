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
import ArrowPagination from "~/components/Pagination/ArrowPagination";
import ReloadData from "~/components/Filter/ReloadData";
import Alert from "~/components/Alert/Alert";
import paymentDestinationAPI from "~/apis/paymentAPI/paymentDestinationAPI";

function AdminOrders() {
  document.title = "Quản lý đơn đặt hàng";

  let location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [isLoading, setIsLoading] = useState(false);
  const [reloadFlag, setReloadFlag] = useState(false);

  const [ordersResponse, setOrdersResponse] = useState();
  const [orderStatuses, setOrderStatuses] = useState();
  const [deliveryCompanies, setDeliveryCompanies] = useState();
  const [paymentDestinations, setPaymentDestinations] = useState();

  const PAGE_SIZE = 12;

  const getOrderStatuses = async () => {
    const res = await orderStatusAPI.getOrderStatuses();
    if (res.status === 200) setOrderStatuses(res.data.result);
  };

  const getDeliveryCompanies = async () => {
    const res = await deliveryCompanyAPI.getDeliveryCompanies();
    if (res.status === 200) setDeliveryCompanies(res.data.result);
  };

  const getPaymentDestination = async () => {
    const res = await paymentDestinationAPI.getPaymentDestinations();
    if (res.status === 200) setPaymentDestinations(res.data.result);
  };

  useEffect(() => {
    getOrderStatuses();
    getDeliveryCompanies();
    getPaymentDestination();
  }, []);

  useEffect(() => {
    const params = queryString.parse(location.search);

    const getOrders = async () => {
      setIsLoading(true);
      const res = await orderAPI.getAdminOrders(
        params,
        searchParams.get("page") ? parseInt(searchParams.get("page")) : 1,
        PAGE_SIZE
      );
      if (res.status === 200) {
        setOrdersResponse(res.data.result);
      }

      setIsLoading(false);
    };

    getOrders();
  }, [searchParams, reloadFlag]);

  return (
    <>
      <div className="mt-1">
        <h3 className="mb-4 text-gray-800">Danh sách đơn hàng</h3>

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

            <FilterDropdown
              filterList={paymentDestinations}
              filterName={"Hình thức thanh toán"}
              filterKey={"paymentDestination"}
              displayKey={"name"}
              valueKey={"id"}
            />

            <RemoveFilter />

            <ReloadData reloadFlag={reloadFlag} setReloadFlag={setReloadFlag} />

            <Link
              className="btn btn-primary px-3"
              to={adminRoutes.adminAddOrder}
            >
              <i className="fa-solid fa-plus me-2"></i>
              Tạo đơn hàng
            </Link>
          </div>
        </div>

        <div className="card shadow mb-4 p-3">
          <div className="d-flex justify-content-end">
            <ArrowPagination pageData={ordersResponse} />
          </div>

          <div className="overflow-auto">
            <table className="table table-hover" width="100%" cellSpacing="0">
              <thead>
                <tr>
                  <th style={{ width: "5%" }} className="">
                    ID
                  </th>
                  <th style={{ width: "18%" }} className="">
                    Khách hàng
                  </th>
                  <th style={{ width: "10%" }} className="">
                    Tổng tiền
                  </th>
                  <th style={{ width: "16%" }}>Ngày đặt hàng</th>
                  <th style={{ width: "10%" }}>Trạng thái</th>
                  <th style={{ width: "15%" }}>Đối tác giao hàng</th>
                  <th style={{ width: "15%" }}>Thanh toán</th>
                  {/* <th style={{ width: "5%" }}></th> */}
                </tr>
              </thead>

              {!isLoading ? (
                <>
                  <tbody>
                    {ordersResponse?.content?.length != 0 ? (
                      <>
                        {ordersResponse?.content?.map((order) => (
                          <tr
                            key={order.id}
                            onClick={() => {
                              navigate(
                                `${adminRoutes.adminEditOrder}/${order.id}`
                              );
                            }}
                            style={{ cursor: "pointer" }}
                          >
                            <td className="align-middle fw-bolder fw-bolder py-3">
                              #{order.id}
                            </td>
                            <td className="align-middle">
                              {order.customer.fullName}
                            </td>
                            <td className="align-middle">
                              {toVND(order.totalPrice)}
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
                            <td className="align-middle">
                              {order.payment?.paymentDestination?.name}
                            </td>
                            {/* <td className="align-middle">
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
                            </td> */}
                          </tr>
                        ))}
                      </>
                    ) : (
                      <tr>
                        <td colSpan={8} className="text-center py-3">
                          <Alert type={"danger"} message={"Không có kết quả"} />
                        </td>
                      </tr>
                    )}
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

          <div className="pagination d-flex justify-content-center py-2">
            <Pagination pageData={ordersResponse} />
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminOrders;
