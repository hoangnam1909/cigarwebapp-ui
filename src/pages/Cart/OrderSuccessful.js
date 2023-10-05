import moment from "moment";
import { Link } from "react-router-dom";
import { formatPhoneNumber } from "~/utils/StringFormatter";

function OrderSuccessful({ order }) {
  return (
    <div className="card px-4 py-4 mt-3 mx-auto d-flex align-items-center">
      <div className="d-flex flex-column my-3 border-bottom w-100">
        <div className="icon-container d-flex justify-content-center py-4 mb-4">
          <i
            className="fa-regular fa-circle-check fa-2xl"
            style={{
              color: "#58a624",
              fontSize: "4rem",
            }}
          ></i>
        </div>

        <h5 className="" style={{ color: "#58a624", textAlign: "center" }}>
          Mua hàng thành công
        </h5>
        <p className="text-center mb-0">
          Mã đơn hàng: <b>#{order.id}</b>
        </p>
        <p className="text-center">
          Ngày tạo đơn:{" "}
          <b>
            {moment(order.createdAt).format("LTS")}
            {" - "}
            {moment(order.createdAt).format("LL")}
          </b>
        </p>
      </div>

      <div className="d-flex flex-column justify-content-center w-75 border-bottom pb-3 mb-3">
        <p className="text-center mb-0">
          Cảm ơn bạn đã mua sắm tại website <strong>cigarforboss.com</strong>
        </p>
        <p className="text-center">
          Bạn đã đặt hàng thành công. Để kiểm tra thông tin về đơn hàng, vui
          lòng liên hệ với nhân viên cửa hàng hoặc kiểm tra email xác nhận đơn
          hàng.
        </p>
        <h6 className="text-center">
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

      <Link to={"/products"} className="btn btn-outline-success px-3 mx-2">
        <i className="fa-solid fa-cart-shopping me-2"></i>
        Tiếp tục mua hàng
      </Link>
    </div>
  );
}

export default OrderSuccessful;
