import queryString from "query-string";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import paymentAPI from "~/apis/paymentAPI/paymentAPI";

function PaymentReturnPage() {
  let location = useLocation();
  const navigate = useNavigate();

  const [paymentStatus, setPaymentStatus] = useState();

  useEffect(() => {
    const params = queryString.parse(location.search);
    console.log(params);
    const updatePaymentStatus = async () => {
      const res = await paymentAPI.updatePaymentStatus(
        params["requestId"],
        params["orderId"]
      );

      if (res.status === 200) {
        if (res.data.result == true) {
          setPaymentStatus(true);
          setTimeout(() => {
            navigate("/");
          }, 5000);
        } else {
          setPaymentStatus(false);
        }
      }
    };

    updatePaymentStatus();
  }, []);

  if (paymentStatus == null) {
    return (
      <div className="card text-center">
        <div className="card-body py-5">
          <h3 className="card-title mb-4">Đang xử lý kết quả thanh toán...</h3>
          <div
            className="spinner-border text-secondary"
            style={{ width: "3rem", height: "3rem" }}
            role="status"
          ></div>
        </div>
      </div>
    );
  } else if (paymentStatus == false) {
    return (
      <div className="card text-center">
        <div className="card-body py-5">
          <h3 className="card-title text-danger">
            Thanh toán không thành công!
          </h3>
        </div>
      </div>
    );
  } else if (paymentStatus == true) {
    return (
      <div className="card text-center py-5">
        <div className="card-body">
          <h3 className="card-title text-success">
            <i className="fa-regular fa-circle-check me-3"></i>
            Thanh toán thành công
          </h3>
        </div>

        <div className="card-body">
          <div
            className="spinner-border"
            style={{ width: "3rem", height: "3rem" }}
            role="status"
          ></div>
          <h5 className="mt-3">Đang chuyển hướng đến trang chủ</h5>
        </div>
      </div>
    );
  }
}

export default PaymentReturnPage;
