import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import TrackingOrderDetail from "./TrackingOrderDetail";
import ReCAPTCHA from "react-google-recaptcha";
import orderAPI from "~/apis/orderAPI/orderAPI";
import Alert from "~/components/Alert/Alert";
import ScrollTop from "~/components/ScrollTop/ScrollTop";

function TrackingOrder() {
  document.title = "Kiểm tra đơn hàng";

  const [captchaValue, setCaptchaValue] = useState(-1);
  const [order, setOrder] = useState();
  const [isSuccess, setIsSuccess] = useState(0);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      orderId: "",
      phone: "",
    },
  });

  const onSubmit = (data) => {
    const getOrder = async () => {
      const res = await orderAPI.trackingOrder(data.orderId, data.phone);
      if (res.data.result != null) setOrder(res.data.result);
      else {
        setIsSuccess(-1);
      }
    };

    getOrder();
  };

  useEffect(() => {
    reset();
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
        <div
          className="card px-4 py-4 mt-3 mx-auto"
          style={{ maxWidth: "700px" }}
        >
          <h4 className="text-center">Kiểm tra tình trạng đơn hàng</h4>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="my-3">
              <label className="form-label">
                Mã đơn hàng <span className="text-danger">(*)</span>
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="123456"
                {...register("orderId", {
                  required: "Mã đơn hàng là bắt buộc!",
                })}
              />
              {errors.orderId && (
                <div className="form-text text-danger">
                  * {errors.orderId.message}
                </div>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label">
                Số điện thoại đặt hàng <span className="text-danger">(*)</span>
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="0123456789"
                {...register("phone", {
                  required: "Số điện thoại là bắt buộc!",
                })}
              />
              {errors.phone && (
                <div className="form-text text-danger">
                  * {errors.phone.message}
                </div>
              )}
            </div>

            {isSuccess == -1 ? (
              <Alert
                type="danger"
                message="Thông tin đơn hàng không chính xác!"
              />
            ) : null}

            {captchaValue == 0 ? (
              <Alert type="danger" message="Xác thực thất bại!" />
            ) : null}

            <div className="mb-3">
              <ReCAPTCHA
                sitekey={process.env.REACT_APP_CAPTCHA_SITE_KEY}
                onChange={(value) => setCaptchaValue(value.length)}
              />
            </div>

            <button
              className="btn btn-secondary py-2"
              type="submit"
              disabled={isSubmitting || captchaValue <= 0}
            >
              {isSubmitting && (
                <span
                  className="spinner-border spinner-border-sm me-2"
                  aria-hidden="true"
                ></span>
              )}
              <span role="status">Tra cứu đơn hàng</span>
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default TrackingOrder;
