import queryString from "query-string";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import brandAPI from "~/apis/brandAPI/brandAPI";
import categoryAPI from "~/apis/categoryAPI/categoryAPI";
import orderAPI from "~/apis/orderAPI/orderAPI";
import paymentDestinationAPI from "~/apis/paymentAPI/paymentDestinationAPI";
import productAPI from "~/apis/productAPI/productAPI";
import Alert from "~/components/Alert/Alert";
import FilterDropdown from "~/components/Filter/FilterDropdown";
import FilterText from "~/components/Filter/FilterText";
import RemoveFilter from "~/components/Filter/RemoveFilter";
import DeliveryConmpaniesSelect from "~/components/Form/DeliveryConmpaniesSelect";
import OrderStatusesSelect from "~/components/Form/OrderStatusesSelect";
import LocationSelectHookForm from "~/components/Input/LocationSelectHookForm";
import ArrowPagination from "~/components/Pagination/ArrowPagination";
import adminRoutes from "~/routes/adminRoutes";
import { toVND } from "~/utils/NumberFormatter";
import { nameNormalization } from "~/utils/StringFormatter";

function AdminAddOrder() {
  document.title = "Tạo đơn hàng";

  let location = useLocation();
  const [searchParams] = useSearchParams();

  const PAGE_SIZE = 10;
  const [productsResponse, setProductsResponse] = useState();
  const [categories, setCategories] = useState();
  const [brands, setBrands] = useState();
  const [paymentDestinations, setPaymentDestinations] = useState();
  const [cart, setCart] = useState([]);

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
      deliveryAddress: "",
      note: "",
      paymentDestinationId: "cod",
      orderStatusId: 2,
      deliveryCompanyId: 1,
    },
  });

  const initialValue = () => {
    reset();
    setCart([]);
  };

  const addToCart = (product) => {
    let existedIndex = -1;
    existedIndex = cart.findIndex((p) => p.id === product.id);

    if (existedIndex == -1) {
      let productAddingg = product;
      productAddingg.quantity = 1;
      let cartUpdating = [...cart, productAddingg];
      setCart(cartUpdating);
    } else {
      toast.info("Sản phẩm đã có trong giỏ hàng", {
        position: "bottom-center",
      });
    }
  };

  const updateQuantity = (product, quantity) => {
    let cartUpdating = [...cart];
    let existedIndex = -1;

    existedIndex = cartUpdating.findIndex((p) => p.id === product.id);

    if (existedIndex >= 0) {
      cartUpdating[existedIndex].quantity = quantity;
      setCart(cartUpdating);
    }
  };

  const deleteProduct = (productId) => {
    let cartUpdating = [...cart];
    let existedIndex = -1;

    existedIndex = cartUpdating.findIndex((p) => p.id === productId);

    if (existedIndex >= 0) {
      cartUpdating.splice(existedIndex, 1);
      setCart(cartUpdating);
    }
  };

  const getOrderItems = () => {
    let orderItems = [];
    cart.forEach((product) => {
      orderItems.push({
        productId: product.id,
        quantity: parseInt(product.quantity),
      });
    });
    return orderItems;
  };

  useEffect(() => {
    const params = queryString.parse(location.search);
    const getProducts = async () => {
      const res = await productAPI.getProducts(
        params,
        searchParams.get("page") ? parseInt(searchParams.get("page")) : 1,
        PAGE_SIZE
      );
      if (res.status === 200) {
        setProductsResponse(res.data.result);
      }
    };

    getProducts();
  }, [searchParams]);

  // get filter fields data
  const getPaymentDestinations = async () => {
    const res = await paymentDestinationAPI.getPaymentDestinations();
    if (res.status === 200) {
      setPaymentDestinations(res.data.result);
    }
  };

  const getCategories = async () => {
    const res = await categoryAPI.getAdminCategories({ page: 0 });
    setCategories(res.data.result.content);
  };

  const getBrands = async () => {
    const res = await brandAPI.getAdminBrands({ page: 0 });
    setBrands(res.data.result.content);
  };

  useEffect(() => {
    getCategories();
    getBrands();
    getPaymentDestinations();
  }, []);

  const onSubmit = async (data) => {
    let deliveryAddressDetail = `${data.addressDetail}, ${data.address}`;

    let requestBody = {
      ...data,
      fullName: nameNormalization(data.fullName),
      phone: data.phone,
      email: data.email.trim(),
      deliveryAddress: nameNormalization(deliveryAddressDetail),
      orderItems: getOrderItems(),
      orderStatusId: parseInt(data.orderStatusId),
      deliveryCompanyId: parseInt(data.deliveryCompanyId),
    };
    delete requestBody.address;
    delete requestBody.addressDetail;

    try {
      const res = await orderAPI.adminAddOrder(requestBody);
      if (res.status === 200) {
        initialValue();
        toast.success("Tạo đơn hàng thành công!", {
          position: "bottom-center",
        });
      }
    } catch (error) {
      toast.error(
        `Tạo đơn hàng không thành công! ${error.response.data.result}`,
        {
          position: "bottom-center",
        }
      );
    }
  };

  return (
    <>
      <div className="mt-1">
        <div className="d-flex justify-content-between pb-3">
          <h3 className="mb-0 text-gray-800">Tạo đơn hàng</h3>
          <button
            className="btn btn-primary px-4 py-2"
            type="submit"
            form="add-order-form"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span
                className="spinner-border spinner-border-sm me-2"
                aria-hidden="true"
              ></span>
            ) : (
              <i className="fa-solid fa-check me-2"></i>
            )}
            <span role="status">Xác nhận tạo đơn hàng</span>
          </button>
        </div>

        <div className="row g-3">
          <div className="col">
            <div className="row g-3">
              <div className="col-12">
                <div className="card">
                  <div className="card-body">
                    <h5 className="mb-3 text-gray-800">Thông tin mua hàng</h5>

                    <form id="add-order-form" onSubmit={handleSubmit(onSubmit)}>
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
                                required:
                                  "Số điện thoại người nhận là bắt buộc!",
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

                      <div className="form-floating mb-0">
                        <select
                          className="form-select"
                          {...register("paymentDestinationId")}
                        >
                          {paymentDestinations?.map((destination) => {
                            return (
                              <option
                                key={destination.id}
                                value={destination.id}
                              >
                                {destination.name}
                              </option>
                            );
                          })}
                        </select>
                        <label>Hình thức thanh toán</label>
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              <div className="col-12">
                <div className="card">
                  <div className="card-body">
                    <h5 className="mb-3 text-gray-800">
                      Thông tin khác về đơn hàng
                    </h5>
                    <form id="add-order-form" onSubmit={handleSubmit(onSubmit)}>
                      <div className="form-floating mb-3">
                        <OrderStatusesSelect register={register} />
                      </div>

                      <div className="form-floating mb-0">
                        <DeliveryConmpaniesSelect register={register} />
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              <div className="col-12">
                <div className="card">
                  <div className="card-body">
                    <h5 className="mb-0 text-gray-800">
                      Các sản phẩm được chọn
                    </h5>

                    {cart.length == 0 ? (
                      <>
                        <div className="pt-2">
                          <Alert
                            type={"danger"}
                            message={"Chưa có sản phẩm nào được chọn"}
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        {cart.map((product) => {
                          return (
                            <div
                              key={product.id}
                              className={`d-flex gap-3 pt-3 ${
                                product.unitsInStock == 0 ? "opacity-50" : ""
                              }`}
                            >
                              <div className="mb-3 mb-sm-0 align-self-baseline">
                                <img
                                  width="100"
                                  height="100"
                                  src={product.productImages[0]?.linkToImage}
                                  className="rounded"
                                  style={{ objectFit: "cover" }}
                                />
                              </div>

                              <div className="w-100 mb-3 mb-sm-0">
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
                              </div>

                              <div className="d-flex flex-column align-items-baseline">
                                <input
                                  type="text"
                                  className="form-control text-center mb-3"
                                  disabled={product.unitsInStock == 0}
                                  value={product.quantity}
                                  onChange={(e) => {
                                    let newValue =
                                      e.target.value <= 0 ? 1 : e.target.value;

                                    let quantity =
                                      newValue > product.unitsInStock
                                        ? product.unitsInStock
                                        : newValue;

                                    updateQuantity(product, quantity);
                                  }}
                                  onPaste={(e) => e.preventDefault()}
                                  onCopy={(e) => e.preventDefault()}
                                />
                                <a
                                  className="w-100 text-center cursor-pointer"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    deleteProduct(product.id);
                                  }}
                                >
                                  <i className="fa-solid fa-trash me-2"></i>Xoá
                                </a>
                              </div>
                            </div>
                          );
                        })}

                        <div className="row border-top pt-3 mt-3">
                          <div className="col">
                            <h6>Tổng tiền ({cart?.length} sản phẩm)</h6>
                          </div>
                          <div className="col">
                            <h6 className="text-danger text-end">
                              {toVND(
                                cart?.reduce(
                                  (accumulator, currentValue) =>
                                    accumulator +
                                    currentValue.salePrice *
                                      currentValue.quantity,
                                  0
                                )
                              )}
                            </h6>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-6">
            <div className="card h-100">
              <div
                className="card-body"
                style={{ height: "860px", overflow: "auto" }}
              >
                <div className="d-flex justify-content-between">
                  <h5 className="mb-0 text-gray-800">Danh sách sản phẩm</h5>
                  <ArrowPagination pageData={productsResponse} />
                </div>

                <div className="d-flex flex-wrap py-2 gap-2">
                  <FilterText
                    filterName={"Tìm kiếm sản phẩm"}
                    filterKey={"kw"}
                  />

                  <FilterDropdown
                    filterList={categories}
                    filterName={"Danh mục"}
                    filterKey={"categoryId"}
                    displayKey={"name"}
                    valueKey={"id"}
                  />

                  <FilterDropdown
                    filterList={brands}
                    filterName={"Thương hiệu"}
                    filterKey={"brandId"}
                    displayKey={"name"}
                    valueKey={"id"}
                  />

                  <RemoveFilter />
                </div>

                {productsResponse?.content?.map((product) => {
                  return (
                    <div
                      key={product.id}
                      className="d-flex justify-content-between gap-3 py-3 border-bottom"
                    >
                      <div className="d-flex gap-3">
                        <div className="mb-3 mb-sm-0 align-self-baseline">
                          <Link
                            to={`${adminRoutes.adminEditProduct}/${product?.id}`}
                            target="_blank"
                            rel="noopener"
                          >
                            <img
                              src={product?.productImages[0]?.linkToImage}
                              width="100"
                              height="100"
                              className="object-fit-cover rounded border"
                            />
                          </Link>
                        </div>

                        <div className="mb-3 mb-sm-0">
                          <Link
                            to={`${adminRoutes.adminEditProduct}/${product?.id}`}
                            target="_blank"
                            rel="noopener"
                          >
                            <h6>{product?.name}</h6>
                            <p className="form-text mt-0 mb-1">
                              {`Giá sản phẩm: ${
                                product?.salePrice === 0
                                  ? "Liên hệ"
                                  : toVND(product?.salePrice)
                              }`}
                            </p>
                            <p className="form-text mt-0 mb-1">
                              {`Số lượng: ${product?.unitsInStock}`}
                            </p>
                          </Link>
                        </div>
                      </div>

                      <div className="mb-3 mb-sm-0">
                        <button
                          className="btn btn-outline-secondary px-5 py-2"
                          onClick={() => {
                            addToCart(product);
                          }}
                          disabled={product?.unitsInStock == 0}
                        >
                          <i className="fa-solid fa-cart-plus"></i>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminAddOrder;
