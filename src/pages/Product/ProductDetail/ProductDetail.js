import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import productAPI from "~/apis/productAPI/productAPI";
import ProductCard from "~/components/Product/ProductCard/ProductCard";
import ProductNotAvailable from "~/components/Product/ProductNotAvailable/ProductNotAvailable";
import ProductCardSkeletonView from "~/components/Skeleton/ProductCardSkeletonView/ProductCardSkeletonView";
import ProductDetailSkeleton from "~/components/Skeleton/ProductDetailSkeleton/ProductDetailSkeleton";
import { addProductToCart } from "~/services/CartService";
import { toVND } from "~/utils/NumberFormatter";
import { formatPhoneNumber } from "~/utils/StringFormatter";
import { getIdInRewriteUrl } from "~/utils/UrlRewrite";

function ProductDetail() {
  const { productRewriteUrl } = useParams();
  const productId = getIdInRewriteUrl(productRewriteUrl);
  const [product, setProduct] = useState();
  const [productsSuggestion, setProductsSuggestion] = useState();
  const [isSuccess, setIsSuccess] = useState(false);
  const SUGGESTION_PAGE_SIZE = 6;

  document.title = product ? product.name : "Loading...";

  const changeProductImage = (link) => {
    if (isSuccess) {
      document.getElementById("main-product").src = link;
    }
  };

  const getProduct = async () => {
    const res = await productAPI.getProductByID(productId);
    if (res.status === 200) {
      setProduct(res.data.result);
      setIsSuccess(true);
    }
  };

  const getProductsSuggestion = async () => {
    const res = await productAPI.getProductsSuggestion(
      productId,
      SUGGESTION_PAGE_SIZE
    );
    if (res.status === 200) {
      setProductsSuggestion(res.data.result);
    }
  };

  useEffect(() => {
    getProduct();
    getProductsSuggestion();
  }, [productRewriteUrl]);

  if (product == null && isSuccess) return <ProductNotAvailable />;

  return (
    <>
      {product ? (
        <>
          <h4 className="border-bottom pb-2 mb-3">{product.name}</h4>
          <div className="card border-0 border-bottom mb-3">
            <div className="row g-0">
              <div className="col-12 col-md-7">
                <div className="d-flex flex-column h-100">
                  <div className="main_image px-0 py-3">
                    <img
                      src={product.productImages[0]?.linkToImage}
                      id="main-product"
                      width={"100%"}
                      height="500"
                      style={{
                        objectFit: "contain",
                        borderRadius: "4px",
                      }}
                      alt="main-product"
                    />
                  </div>

                  <div className="w-100 px-3 py-2">
                    <div className="d-flex flex-row flex-wrap justify-content-center align-items-center">
                      {product.productImages.map((image) => {
                        return (
                          <div
                            className="m-1"
                            key={image.id}
                            onClick={() =>
                              changeProductImage(image.linkToImage)
                            }
                          >
                            <img
                              src={image.linkToImage}
                              width="80"
                              height="80"
                              alt={`thumbnail-${image.id}`}
                              className="thumbnail-image rounded object-fit-cover"
                              style={{ cursor: "pointer" }}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-12 col-md-5 d-flex flex-column justify-content-between">
                <div className="d-flex flex-column justify-content-between h-100 px-3 py-3">
                  <div className="top-side">
                    {product.unitsInStock == 0 ? (
                      <div className="d-flex justify-content-between align-items-center">
                        <p className="fs-6 badge text-bg-warning my-1">
                          Hết hàng
                        </p>
                      </div>
                    ) : (
                      <div className="d-flex justify-content-between align-items-center">
                        <p className="fs-6 badge bg-success my-1">Còn hàng</p>
                      </div>
                    )}

                    {product.originalPrice != 0 || product.salePrice != 0 ? (
                      <h3 className="d-flex flex-row flex-wrap mt-1 align-items-baseline">
                        <span className="text-danger me-2">
                          {toVND(product?.salePrice)}
                        </span>
                        <span className="h6 text-decoration-line-through me-2">
                          {toVND(product?.originalPrice)}
                        </span>
                        <span className="h6 text-danger">
                          Tiết kiệm{" "}
                          {toVND(product?.originalPrice - product.salePrice)}
                        </span>
                      </h3>
                    ) : null}

                    <div className="mt-2 pr-3" style={{ textAlign: "justify" }}>
                      {product.description ? (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: product.description,
                          }}
                        />
                      ) : (
                        "Mô tả sản phẩm"
                      )}
                    </div>
                  </div>

                  <div className="bottom-side d-flex flex-column gap-2">
                    <h5 className="card-title text-start text-primary lh-base mb-0">
                      Gọi điện trực tiếp:
                      <br />
                      <a
                        href={`tel:${process.env.REACT_APP_HANOI_ZALO_NUMBER}`}
                      >
                        {formatPhoneNumber(
                          process.env.REACT_APP_HANOI_ZALO_NUMBER
                        )}
                      </a>{" "}
                      hoặc{" "}
                      <a href={`tel:${process.env.REACT_APP_HCM_ZALO_NUMBER}`}>
                        {formatPhoneNumber(
                          process.env.REACT_APP_HCM_ZALO_NUMBER
                        )}
                      </a>
                    </h5>

                    <div className="d-flex flex-row-reverse gap-2">
                      <div className="btn-group group w-50" role="group">
                        <button
                          type="button"
                          className="btn btn-primary py-2 rounded-3"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <i className="fa-solid fa-mobile-screen me-2"></i>
                          Zalo
                        </button>
                        <ul className="dropdown-menu w-100">
                          <li>
                            <a
                              className="dropdown-item"
                              target="_blank"
                              rel="noreferrer"
                              href={`https://zalo.me/${process.env.REACT_APP_HANOI_ZALO_NUMBER}`}
                            >
                              Hà Nội
                            </a>
                          </li>
                          <li>
                            <a
                              className="dropdown-item"
                              target="_blank"
                              rel="noreferrer"
                              href={`https://zalo.me/${process.env.REACT_APP_HCM_ZALO_NUMBER}`}
                            >
                              Thành phố Hồ Chí Minh
                            </a>
                          </li>
                        </ul>
                      </div>

                      <div className="cart-btn w-50">
                        <button
                          className="btn btn-outline-secondary py-2 w-100"
                          onClick={() => {
                            addProductToCart(product);
                            toast.success("Sản phẩm đã được thêm vào giỏ hàng");
                          }}
                          disabled={product.unitsInStock == 0}
                        >
                          <i className="fa-solid fa-cart-plus me-2"></i>
                          Thêm vào giỏ hàng
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <ProductDetailSkeleton />
        </>
      )}

      <div className="mb-3 pb-3">
        <h4 className="ps-1 mt-4 mb-3">Sản Phẩm Tương Tự</h4>
        {productsSuggestion ? (
          <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 row-cols-xxl-6 g-1">
            {productsSuggestion?.map((product) => {
              return (
                <div key={product.id} className="col">
                  <ProductCard product={product} />
                </div>
              );
            })}
          </div>
        ) : (
          <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 row-cols-xxl-6 g-1">
            <ProductCardSkeletonView count={SUGGESTION_PAGE_SIZE} />
          </div>
        )}
      </div>
    </>
  );
}

export default ProductDetail;
