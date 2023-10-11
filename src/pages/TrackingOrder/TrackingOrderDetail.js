import moment from "moment";
import { Link } from "react-router-dom";
import { toVND } from "~/utils/NumberFormatter";
import { formatPhoneNumber } from "~/utils/StringFormatter";
import { rewriteUrl } from "~/utils/UrlRewrite";

function TrackingOrderDetail({ order, setOrder }) {
  document.title = `Tình trạng đơn hàng #${order.id}`;

  return (
    <>
      <div className="px-1">
        <div
          className="card px-4 py-4 mt-3 mx-auto d-flex align-items-center"
          style={{ maxWidth: "660px" }}
        >
          <div className="d-flex w-100">
            <a
              className="btn btn-outline-secondary cursor-pointer py-2"
              onClick={(e) => {
                e.preventDefault();
                setOrder();
              }}
            >
              <i className="fa-solid fa-arrow-left me-2"></i>
              Trở lại
            </a>
          </div>

          <div className="d-flex flex-column mt-3 border-bottom w-100">
            <div className="icon-container d-flex justify-content-center mb-4">
              <i
                className="fa-solid fa-heart"
                style={{ color: "#f0907f", fontSize: "4.2rem" }}
              ></i>
            </div>

            <h5
              className="mb-3"
              style={{ color: "#f0907f", textAlign: "center" }}
            >
              Cảm ơn bạn đã mua hàng
            </h5>

            <div className="mb-3"></div>
          </div>

          <div className="py-3 border-bottom w-100">
            <h4 className="mb-3">Thông tin khách hàng</h4>

            <div className="row mb-1">
              <div className="col-4">
                <strong>Mã đơn hàng</strong>
              </div>
              <div className="col">#{order.id}</div>
            </div>

            <div className="row mb-1">
              <div className="col-4">
                <strong>Ngày đặt hàng</strong>
              </div>
              <div className="col">
                {moment(order.createdAt).format("LTS")}
                {" - "}
                {moment(order.createdAt).format("ll")}
              </div>
            </div>

            <div className="row mb-1">
              <div className="col-4">
                <strong>Tên khách hàng</strong>
              </div>
              <div className="col">{order.customer?.fullName}</div>
            </div>

            <div className="row mb-1">
              <div className="col-4">
                <strong>Số điện thoại</strong>
              </div>
              <div className="col">
                {formatPhoneNumber(order.customer.phone)
                  ? formatPhoneNumber(order.customer.phone)
                  : order.customer.phone}
              </div>
            </div>

            <div className="row mb-1">
              <div className="col-4">
                <strong>Email</strong>
              </div>
              <div className="col">{order.customer?.email}</div>
            </div>
          </div>

          <div className="py-3 border-bottom w-100">
            <h4 className="mb-3">Thông tin thanh toán</h4>

            <div className="row mb-1">
              <div className="col-4">
                <strong>Phương thức thanh toán</strong>
              </div>
              <div className="col">
                {order.payment?.paymentDestination?.name}
              </div>
            </div>

            <div className="row mb-1">
              <div className="col-4">
                <strong>Kết quả thanh toán</strong>
              </div>
              <div className="col">
                {order.payment?.isPaid ? (
                  <span className="fw-medium text-success">Đã thanh toán</span>
                ) : (
                  <span className="fw-medium text-danger">Chưa thanh toán</span>
                )}
              </div>
            </div>

            {order.payment.isPaid == false ? (
              <div className="pt-2">
                <a
                  className="btn btn-outline-danger w-100 px-3 py-2"
                  href={order.payment.paymentUrl}
                  target="_blank"
                  rel="noopener"
                >
                  <i className="fa-solid fa-qrcode me-2"></i>
                  Thanh toán ngay
                </a>
              </div>
            ) : null}
          </div>

          <div className="py-3 border-bottom w-100">
            <h4 className="mb-3">Thông tin giao hàng</h4>

            <div className="row mb-1">
              <div className="col-4">
                <strong>Tình trạng đơn hàng</strong>
              </div>
              <div className="col">{order.orderStatus?.name}</div>
            </div>

            <div className="row mb-1">
              <div className="col-4">
                <strong>Đơn vị vận chuyển</strong>
              </div>
              <div className="col">{order.shipment?.deliveryCompany?.name}</div>
            </div>

            <div className="row mb-1">
              <div className="col-4">
                <strong>Mã vận đơn</strong>
              </div>
              <div className="col">{order.shipment?.trackingNumber}</div>
            </div>

            <div className="row mb-1">
              <div className="col-4">
                <strong>Địa chỉ giao hàng</strong>
              </div>
              <div className="col">{order.shipment?.address}</div>
            </div>

            <div className="row">
              <div className="col-4">
                <strong>Ghi chú</strong>
              </div>
              <div className="col">{order.note}</div>
            </div>
          </div>

          <div className="py-3 border-bottom w-100">
            <h5 className="mb-3">Các sản phẩm đã đặt</h5>
            {order.orderItems?.map((orderItem) => {
              return (
                <div
                  key={orderItem.id}
                  className="d-flex gap-3 mb-3 pb-3 border-bottom"
                >
                  <div className="mb-3 mb-sm-0 align-self-baseline">
                    <Link
                      to={`/products/${rewriteUrl(orderItem.product.name)}-${
                        orderItem.product.id
                      }`}
                    >
                      <img
                        width="100"
                        height="100"
                        src={orderItem.product.productImages[0]?.linkToImage}
                        className="rounded"
                        style={{ objectFit: "cover" }}
                      />
                    </Link>
                  </div>

                  <div className="w-100 mb-3 mb-sm-0">
                    <Link to={`/products/${orderItem.product.id}`}>
                      <h6>{orderItem.product.name}</h6>
                      <p className="form-text mt-0 mb-2">
                        {`Giá sản phẩm: ${
                          orderItem?.price === 0
                            ? "Liên hệ"
                            : toVND(orderItem?.price)
                        }`}
                      </p>
                      <p className="form-text mt-0 mb-2">
                        {`Số lượng: ${orderItem?.quantity}`}
                      </p>
                    </Link>
                  </div>
                </div>
              );
            })}

            <h6 className="text-end mt-3">
              Tổng thanh toán:{" "}
              <span className="text-danger">{toVND(order.totalPrice)}</span>
            </h6>
          </div>

          <div className="pt-4 text-center">
            <h6>Cảm ơn bạn đã mua sắm tại website cigarforboss.com</h6>

            <p className="mb-3">
              Nếu có thắc mắc gì về đơn hàng, vui lòng liên hệ với chúng tôi qua
              số điện thoại để được xử lý trong thời gian sớm nhất.
            </p>

            <h6 className="">
              Mọi thắc mắc vui lòng liên hệ:{" "}
              <span className="text-danger">
                {formatPhoneNumber(process.env.REACT_APP_HANOI_ZALO_NUMBER)}
              </span>
              {" hoặc "}
              <span className="text-danger">
                {formatPhoneNumber(process.env.REACT_APP_HCM_ZALO_NUMBER)}
              </span>
            </h6>
          </div>
        </div>
      </div>
    </>
  );
}

export default TrackingOrderDetail;
