import { useEffect, useState } from "react";
import TrackingOrderDetail from "./TrackingOrderDetail";
import ReCAPTCHA from "react-google-recaptcha";
import orderAPI from "~/apis/orderAPI/orderAPI";
import Alert from "~/components/Alert/Alert";
import ScrollTop from "~/components/ScrollTop/ScrollTop";

function TrackingOrder() {
  document.title = "Kiểm tra đơn hàng";

  const [orderId, setOrderId] = useState("");
  const [phone, setPhone] = useState("");
  const [order, setOrder] = useState();
  const [captchaVerified, setCaptchaVerified] = useState(0);

  const [isSuccess, setIsSuccess] = useState(0);

  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (captchaVerified != 1) {
      setCaptchaVerified(-1);
      return;
    }

    const getOrder = async () => {
      const res = await orderAPI.trackingOrder(orderId, phone);
      if (res.data.result != null) setOrder(res.data.result);
      else {
        setCaptchaVerified(0);
        window.grecaptcha.reset();
        setIsSuccess(-1);
      }
    };

    getOrder();
  };

  useEffect(() => {
    setOrderId("");
    setPhone("");
  }, [order]);

  if (order != null)
    return (
      <>
        <ScrollTop />
        <TrackingOrderDetail order={order} setOrder={setOrder} />
      </>
    );

  return (
    <>
      <div className="px-1">
        <div className="card mx-auto px-4 py-3 mt-3">
          <h4>Kiểm tra tình trạng đơn hàng</h4>
          <form onSubmit={handleSubmitForm}>
            <div className="my-3">
              <label className="form-label">Mã đơn hàng</label>
              <input
                type="text"
                className="form-control"
                placeholder="123456"
                value={orderId}
                onChange={(e) => {
                  setIsSuccess(0);
                  setOrderId(e.target.value);
                }}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Số điện thoại đặt hàng</label>
              <input
                type="text"
                className="form-control"
                placeholder="0123456789"
                value={phone}
                onChange={(e) => {
                  setIsSuccess(0);
                  setPhone(e.target.value);
                }}
                required
              />
            </div>

            {isSuccess == -1 ? (
              <Alert
                type="danger"
                message="Thông tin đơn hàng không chính xác!"
              />
            ) : null}

            {captchaVerified == -1 ? (
              <Alert type="danger" message="Xác thực thất bại!" />
            ) : null}

            <div className="mb-3">
              <ReCAPTCHA
                sitekey={process.env.REACT_APP_CAPTCHA_SITE_KEY}
                onChange={() => {
                  setCaptchaVerified(1);
                }}
              />
            </div>

            <button type="submit" className="btn btn-secondary">
              Tra cứu đơn hàng
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default TrackingOrder;
