import { useEffect, useState } from "react";
import { nameNormalization } from "~/utils/StringFormatter";
import EmptyCart from "./EmptyCart";
import { toVND } from "~/utils/NumberFormatter";
import {
  deleteByProductId,
  getOrderItems,
  updateCart,
  updateQuantity,
} from "~/services/CartService";
import OrderSuccessful from "./OrderSuccessful";
import cartAPI from "~/apis/cartAPI/cartAPI";
import axios from "axios";
import orderAPI from "~/apis/orderAPI/orderAPI";
import { Link } from "react-router-dom";
import { rewriteUrl } from "~/utils/UrlRewrite";
import ScrollTop from "~/components/ScrollTop/ScrollTop";
import { toast } from "react-toastify";
import paymentDestinationAPI from "~/apis/paymentAPI/paymentDestinationAPI";

function Cart() {
  document.title = "Giỏ hàng";

  const [order, setOrder] = useState();

  const [paymentDestinations, setPaymentDestinations] = useState();

  const [provinces, setProvinces] = useState();
  const [districts, setDistricts] = useState();
  const [wards, setWards] = useState();

  const [province, setProvince] = useState();
  const [district, setDistrict] = useState();
  const [ward, setWard] = useState();

  const [cart, setCart] = useState();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [orderRequest, setOrderRequest] = useState({
    fullName: "",
    email: "",
    phone: "",
    deliveryAddress: "",
    note: "",
    paymentDestinationId: "cod",
  });

  const getProductsInCart = async () => {
    const res = await cartAPI.getProductsInCart();
    if (res.status === 200) {
      let result = res.data.result;
      updateCart(result);
      let currentCart = JSON.parse(localStorage.getItem("cart"));

      let cartData = {};

      cartData.products = result.map((r) => ({
        ...r,
        quantity: currentCart.find((c) => r.id === c.id).quantity,
      }));

      cartData.totalPrice = cartData.products?.reduce((a, product) => {
        return a + product.salePrice * product.quantity;
      }, 0);

      setCart(cartData);
    }
  };

  const getProvinces = async () => {
    const res = await axios.get("https://provinces.open-api.vn/api/p/");
    if (res.status === 200) setProvinces(res.data);
  };

  const getPaymentDestinations = async () => {
    const res = await paymentDestinationAPI.getPaymentDestinations();
    if (res.status === 200) {
      setPaymentDestinations(res.data.result);
    }
  };

  useEffect(() => {
    getProvinces();
    getPaymentDestinations();
    getProductsInCart();
  }, []);

  useEffect(() => {
    if (province) {
      const getDistricts = async () => {
        const res = await axios.get(
          `https://provinces.open-api.vn/api/p/${province.code}?depth=2`
        );
        if (res.status === 200) setDistricts(res.data.districts);
      };

      getDistricts();
    }

    setDistricts();
    setWards();
  }, [province]);

  useEffect(() => {
    if (district) {
      const getWards = async () => {
        const res = await axios.get(
          `https://provinces.open-api.vn/api/d/${district.code}?depth=2`
        );
        if (res.status === 200) setWards(res.data.wards);
      };

      getWards();
    }

    setWards();
  }, [district]);

  const handleSubmitForm = (e) => {
    e.preventDefault();

    let requestBody = { ...orderRequest };
    let address = "";

    if (requestBody.deliveryAddress.trim().length > 0)
      address += requestBody.deliveryAddress;
    if (ward) address += `, ${ward.name}`;
    if (district) address += `, ${district.name}`;
    if (province) address += `, ${province.name}`;

    requestBody = {
      ...requestBody,
      fullName: nameNormalization(requestBody.fullName),
      email: requestBody.email.trim(),
      deliveryAddress: nameNormalization(address),
      orderItems: getOrderItems(),
    };

    console.log("requestBody", requestBody);

    const addOrder = async () => {
      setIsSubmitting(true);

      const res = await orderAPI.addOrder(requestBody);
      if (res.status === 200) {
        let result = res.data.result;

        localStorage.setItem("cart", "[]");
        setOrder(result);
        toast.success("Đặt hàng thành công.");
      } else {
      }

      setIsSubmitting(false);
    };

    addOrder();
  };

  if (order != null) {
    <ScrollTop />;
    return <OrderSuccessful order={order} />;
  }

  if (cart?.products?.length == 0) {
    <ScrollTop />;
    return <EmptyCart />;
  }

  console.log(cart);
  return (
    <>
      {cart != null ? (
        <>
          <div className="cart-wrapper mb-3">
            <div className="row g-2 mb-3">
              <div className="col-sm-12 col-xl-7">
                <div className="card px-4 py-3 h-100">
                  <h5 className="mb-3">THÔNG TIN NGƯỜI MUA HÀNG</h5>
                  <form onSubmit={handleSubmitForm}>
                    <div className="row g-2">
                      <div className="col-md">
                        <div className="form-floating me-1 mb-3">
                          <input
                            type="text"
                            className="form-control"
                            value={orderRequest.fullName}
                            onChange={(e) => {
                              setOrderRequest({
                                ...orderRequest,
                                fullName: e.target.value,
                              });
                            }}
                            required
                          />
                          <label>Họ và tên (*)</label>
                        </div>
                      </div>

                      <div className="col-md">
                        <div className="form-floating mb-2">
                          <input
                            type="text"
                            className="form-control"
                            minLength="10"
                            maxLength="10"
                            value={orderRequest.phone}
                            onChange={(e) => {
                              setOrderRequest({
                                ...orderRequest,
                                phone: e.target.value,
                              });
                            }}
                            required
                          />
                          <label>Số điện thoại (*)</label>
                        </div>
                      </div>
                    </div>

                    <div className="form-floating mb-3 mt-3 mt-md-0">
                      <input
                        type="email"
                        className="form-control"
                        value={orderRequest.email}
                        onChange={(e) => {
                          setOrderRequest({
                            ...orderRequest,
                            email: e.target.value,
                          });
                        }}
                      />
                      <label>Email</label>
                    </div>

                    <div className="row g-2 mb-3">
                      <div className="col-md mt-md-2">
                        <select
                          className="form-select"
                          defaultValue={"0"}
                          onChange={(e) => {
                            let value = e.target.value;
                            setProvince({
                              code: value.split("|")[0],
                              name: value.split("|")[1],
                            });
                          }}
                        >
                          <option value="0">Chọn Tỉnh Thành</option>
                          {provinces?.map((province, index) => {
                            return (
                              <option
                                key={index}
                                value={`${province.code}|${province.name}`}
                              >
                                {province.name}
                              </option>
                            );
                          })}
                        </select>
                      </div>

                      <div className="col-md mt-3 mt-md-2">
                        <select
                          className="form-select"
                          defaultValue={"0"}
                          onChange={(e) => {
                            let value = e.target.value;
                            setDistrict({
                              code: value.split("|")[0],
                              name: value.split("|")[1],
                            });
                          }}
                        >
                          <option value="0">Chọn Quận Huyện</option>
                          {districts?.map((district, index) => {
                            return (
                              <option
                                key={index}
                                value={`${district.code}|${district.name}`}
                              >
                                {district.name}
                              </option>
                            );
                          })}
                        </select>
                      </div>

                      <div className="col-md mt-3 mt-md-2">
                        <select
                          className="form-select"
                          defaultValue={"0"}
                          onChange={(e) => {
                            let value = e.target.value;
                            setWard({
                              code: value.split("|")[0],
                              name: value.split("|")[1],
                            });
                          }}
                        >
                          <option value="0">Chọn Phường Xã</option>
                          {wards?.map((ward, index) => {
                            return (
                              <option
                                key={index}
                                value={`${ward.code}|${ward.name}`}
                              >
                                {ward.name}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </div>

                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        value={orderRequest.deliveryAddress}
                        onChange={(e) => {
                          setOrderRequest({
                            ...orderRequest,
                            deliveryAddress: e.target.value,
                          });
                        }}
                      />
                      <label>Địa chỉ (Nhập chính xác số nhà, ngõ,...)</label>
                    </div>

                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        value={orderRequest.note}
                        onChange={(e) => {
                          setOrderRequest({
                            ...orderRequest,
                            note: e.target.value,
                          });
                        }}
                      />
                      <label>Ghi chú cho đơn hàng</label>
                    </div>

                    <div className="form-floating mb-3">
                      <select
                        className="form-select"
                        value={orderRequest.paymentDestinationId}
                        onChange={(e) => {
                          let value = e.target.value;
                          setOrderRequest({
                            ...orderRequest,
                            paymentDestinationId: value,
                          });
                        }}
                      >
                        {paymentDestinations?.map((des, index) => {
                          return (
                            <option key={index} value={des.id}>
                              {des.name}
                            </option>
                          );
                        })}
                      </select>
                      <label>Hình thức thanh toán</label>
                    </div>

                    <div className="text-center my-4">
                      <button
                        className="btn btn-secondary w-75 py-2"
                        type="submit"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <span
                            className="spinner-border spinner-border-sm me-2"
                            aria-hidden="true"
                          ></span>
                        ) : (
                          <i className="fa-solid fa-paper-plane me-2"></i>
                        )}
                        <span role="status">Đặt hàng ngay</span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              <div className="col-sm-12 col-xl-5">
                <div className="card px-4 py-3 h-100">
                  <h5 className="mb-3">Giỏ hàng ({cart.products?.length})</h5>
                  {cart.products
                    ?.sort((c1, c2) => {
                      return c2.unitsInStock - c1.unitsInStock;
                    })
                    .map((product, index) => {
                      return (
                        <div
                          key={index}
                          className={`d-flex gap-3 mb-3 pb-3 border-bottom border-secondary-subtle ${
                            product.unitsInStock == 0 ? "opacity-50" : ""
                          }`}
                        >
                          <div className="mb-3 mb-sm-0 align-self-baseline">
                            <Link
                              to={`/products/${rewriteUrl(product.name)}-${
                                product.id
                              }`}
                            >
                              <img
                                width="100"
                                height="100"
                                src={product.image}
                                className="rounded"
                                style={{ objectFit: "cover" }}
                              />
                            </Link>
                          </div>

                          <div className="w-100 mb-3 mb-sm-0">
                            <Link to={`/products/${product.id}`}>
                              <h6>{product.name}</h6>
                              <p className="form-text my-1">
                                <span>
                                  {product.unitsInStock} sản phẩm có sẵn
                                </span>
                              </p>

                              <p className="form-text mb-2">
                                {`Giá bán: ${
                                  product.salePrice === 0
                                    ? "Liên hệ"
                                    : toVND(product.salePrice)
                                }`}
                              </p>
                            </Link>
                          </div>

                          <div className="d-flex flex-column align-items-baseline">
                            <input
                              type="text"
                              className="form-control text-center mb-3"
                              disabled={product.unitsInStock == 0}
                              value={product.quantity}
                              onChange={(e) => {
                                if (e.target.value < 1)
                                  updateQuantity(product.id, 1);
                                else if (e.target.value > product.unitsInStock)
                                  updateQuantity(
                                    product.id,
                                    product.unitsInStock
                                  );
                                else updateQuantity(product.id, e.target.value);
                                getProductsInCart();
                              }}
                            />
                            <a
                              className="w-100 text-center"
                              href=""
                              onClick={(e) => {
                                e.preventDefault();
                                deleteByProductId(product.id);
                                getProductsInCart();
                              }}
                            >
                              <i className="fa-solid fa-trash me-1"></i>Xoá
                            </a>
                          </div>
                        </div>
                      );
                    })}

                  <div className="row">
                    <div className="col">
                      <h6>Giá tạm tính ({cart.products?.length} sản phẩm)</h6>
                    </div>
                    <div className="col">
                      <h6 className="text-danger text-end">
                        {toVND(cart?.totalPrice)}
                      </h6>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col">
                      <h6 className="text-danger">
                        Chúng tôi sẽ liên hệ lại với bạn về phí vận chuyển.
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="card text-center">
            <div className="card-body py-5">
              <h3 className="card-title mb-4">Đang tải giỏ hàng...</h3>
              <div
                className="spinner-border text-secondary"
                style={{ width: "3rem", height: "3rem" }}
                role="status"
              ></div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Cart;
