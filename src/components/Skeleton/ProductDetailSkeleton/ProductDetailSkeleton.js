import "../Skeleton.scss";

function ProductDetailSkeleton() {
  return (
    <div className="loading-skeleton">
      <h4 className="border-bottom pb-2 mb-3">product name</h4>
      <div className="card border-0 border-bottom mb-3">
        <div className="row g-0">
          <div className="col-12 col-md-7">
            <div className="d-flex flex-column h-100">
              <div className="main_image px-0 py-3">
                <img
                  src="https://st.depositphotos.com/2274151/4841/i/450/depositphotos_48410095-stock-photo-sample-blue-square-grungy-stamp.jpg"
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
                  <div className="m-1">
                    <img
                      src="https://st.depositphotos.com/2274151/4841/i/450/depositphotos_48410095-stock-photo-sample-blue-square-grungy-stamp.jpg"
                      width="80"
                      height="80"
                      alt="thumbnail-1"
                      className="thumbnail-image rounded object-fit-cover"
                      style={{ cursor: "pointer" }}
                    />
                  </div>

                  <div className="m-1">
                    <img
                      src="https://st.depositphotos.com/2274151/4841/i/450/depositphotos_48410095-stock-photo-sample-blue-square-grungy-stamp.jpg"
                      width="80"
                      height="80"
                      alt="thumbnail-1"
                      className="thumbnail-image rounded object-fit-cover"
                      style={{ cursor: "pointer" }}
                    />
                  </div>

                  <div className="m-1">
                    <img
                      src="https://st.depositphotos.com/2274151/4841/i/450/depositphotos_48410095-stock-photo-sample-blue-square-grungy-stamp.jpg"
                      width="80"
                      height="80"
                      alt="thumbnail-1"
                      className="thumbnail-image rounded object-fit-cover"
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-5 d-flex flex-column justify-content-between">
            <div className="d-flex flex-column justify-content-between h-100 px-3 py-3">
              <div className="top-side">
                <div className="d-flex justify-content-between align-items-center">
                  <p className="my-1 w-100">instock...</p>
                </div>

                <h3 className="d-flex flex-row flex-wrap mt-1 align-items-baseline">
                  <span className="me-2">000000 vnd</span>
                  <span className="h6 text-decoration-line-through me-2">
                    000000 vnd
                  </span>
                  <span className="">000000 vnd</span>
                </h3>

                <p
                  className="mt-2 pr-3"
                  style={{ textAlign: "justify", height: "300px" }}
                >
                  Mô tả sản phẩm
                </p>
              </div>

              <div className="bottom-side d-flex flex-column gap-2">
                <h5 className="mb-0">
                  Gọi điện trực tiếp:
                  <br />
                  <a href="#">phone number...</a>
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
                    <button className="btn btn-outline-secondary py-2 w-100">
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
    </div>
  );
}

export default ProductDetailSkeleton;
