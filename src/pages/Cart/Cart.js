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
import orderAPI from "~/apis/orderAPI/orderAPI";
import { Link } from "react-router-dom";
import { rewriteUrl } from "~/utils/UrlRewrite";
import { toast } from "react-toastify";
import paymentDestinationAPI from "~/apis/paymentAPI/paymentDestinationAPI";
import { useForm } from "react-hook-form";
import LocationSelectHookForm from "~/components/Input/LocationSelectHookForm";

function Cart() {
  document.title = "Giỏ hàng";

  const [order, setOrder] = useState();
  const [paymentDestinations, setPaymentDestinations] = useState();
  const [cart, setCart] = useState();
  const [reloadFlag, setReloadFlag] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      addressDetail: "",
      note: "",
      paymentDestinationId: "cod",
    },
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

  const getPaymentDestinations = async () => {
    const res = await paymentDestinationAPI.getPaymentDestinations();
    if (res.status === 200) {
      setPaymentDestinations(res.data.result);
    }
  };

  useEffect(() => {
    getPaymentDestinations();
    getProductsInCart();
  }, [reloadFlag]);

  const onSubmit = async (data) => {
    let deliveryAddressDetail = `${data.addressDetail}, ${data.address}`;

    let requestBody = {
      ...data,
      fullName: nameNormalization(data.fullName),
      email: data.email.trim(),
      deliveryAddress: nameNormalization(deliveryAddressDetail),
      orderItems: getOrderItems(),
    };
    delete requestBody.address;
    delete requestBody.addressDetail;

    const addOrder = async () => {
      try {
        const res = await orderAPI.addOrder(requestBody);
        if (res.status === 200) {
          let result = res.data.result;
          if (result != null) {
            localStorage.setItem("cart", "[]");
            setOrder(result);
            toast.success("Đặt hàng thành công.");
          } else {
            toast.error("Đặt hàng không thành công.");
            setReloadFlag(!reloadFlag);
          }
          reset();
        }
      } catch (error) {
        toast.error("Sản phẩm bạn đặt đã hết hàng hoặc không còn khả dụng");
        setReloadFlag(!reloadFlag);
      }
    };

    addOrder();
  };

  if (order != null) {
    return <OrderSuccessful order={order} />;
  }

  if (cart?.products?.length == 0) {
    return <EmptyCart />;
  }

  return (
    <>
      {cart != null ? (
        <>
          <div className="cart-wrapper mb-3">
            <div className="row g-2 mb-3">
              <div className="col-sm-12 col-xl-7">
                <div className="card p-3 h-100">
                  <h5 className="mb-3">THÔNG TIN MUA HÀNG</h5>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row g-2">
                      <div className="col-md">
                        <div className="form-floating me-1 mb-3">
                          <input
                            type="text"
                            className="form-control"
                            {...register("fullName", {
                              required: "Tên người nhận là bắt buộc!",
                            })}
                          />
                          <label>
                            Người nhận hàng{" "}
                            <span className="text-danger">(*)</span>
                          </label>
                          {errors.fullName && (
                            <div className="form-text text-danger">
                              * {errors.fullName.message}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="col-md">
                        <div className="form-floating mb-2">
                          <input
                            type="text"
                            className="form-control"
                            {...register("phone", {
                              required: "Số điện thoại người nhận là bắt buộc!",
                              pattern: {
                                value: /0\d{9}/,
                                message: "Số điện thoại không đúng định dạng",
                              },
                              minLength: {
                                value: 10,
                                message: "Số điện thoại là dãy 10 số",
                              },
                              maxLength: {
                                value: 10,
                                message: "Số điện thoại là dãy 10 số",
                              },
                            })}
                            maxLength="10"
                          />
                          <label>
                            Số điện thoại{" "}
                            <span className="text-danger">(*)</span>
                          </label>
                          {errors.phone && (
                            <div className="form-text text-danger">
                              * {errors.phone.message}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="form-floating mb-3 mt-3 mt-md-0">
                      <input
                        type="email"
                        className="form-control"
                        {...register("email")}
                      />
                      <label>Email</label>
                    </div>

                    <LocationSelectHookForm setValue={setValue} />

                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        {...register("addressDetail", {
                          required: "Địa chỉ chi tiết là bắt buộc!",
                        })}
                      />
                      <label>
                        Địa chỉ (Nhập chính xác số nhà, ngõ,...){" "}
                        <span className="text-danger">(*)</span>
                      </label>
                      {errors.addressDetail && (
                        <div className="form-text text-danger">
                          * {errors.addressDetail.message}
                        </div>
                      )}
                    </div>

                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        {...register("note")}
                      />
                      <label>Ghi chú</label>
                    </div>

                    <div className="form-floating mb-3">
                      <select
                        className="form-select"
                        {...register("paymentDestinationId")}
                      >
                        {paymentDestinations?.map((destination) => {
                          return (
                            <option key={destination.id} value={destination.id}>
                              {destination.name}
                            </option>
                          );
                        })}
                      </select>
                      <label>Hình thức thanh toán</label>
                    </div>

                    <div className="text-center mb-0">
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
                <div className="card p-3 h-100">
                  <h5 className="mb-3">Giỏ hàng ({cart.products?.length})</h5>
                  {cart.products
                    ?.sort((p1, p2) => {
                      return p2.unitsInStock - p1.unitsInStock;
                    })
                    .map((product) => {
                      return (
                        <div
                          key={product.id}
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
                            <Link
                              to={`/products/${rewriteUrl(product.name)}-${
                                product.id
                              }`}
                            >
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
                                updateQuantity(
                                  product.id,
                                  e.target.value.trim().length == 0 ||
                                    e.target.value.trim() == 0
                                    ? 1
                                    : e.target.value
                                );
                                getProductsInCart();
                              }}
                              onPaste={(e) => e.preventDefault()}
                              onCopy={(e) => e.preventDefault()}
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
