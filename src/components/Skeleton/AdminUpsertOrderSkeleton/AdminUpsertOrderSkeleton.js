function AdminUpsertOrderSkeleton() {
  return (
    <>
      <div class="row row-cols-1 row-cols-xxl-2 g-3">
        <div class="col-12 col-xxl-8">
          <div class="card shadow p-3">
            <div class="d-flex justify-content-between border-bottom mb-4 pb-2 gap-2 loading-skeleton">
              <h5 class="mb-0">14:18:27 - 19 tháng 10 năm 2023</h5>
              <h6 class="mb-0">
                Tình trạng: <span class="">Đã xác nhận</span>
              </h6>
            </div>
            <div class="row row-cols-1 row-cols-lg-3 g-2">
              <div class="col d-flex mb-3 overflow-wrap">
                <div class="customer-icon me-2">
                  <i
                    class="fa-solid fa-user mt-1"
                    style={{ height: "30px" }}
                  ></i>
                </div>
                <div class="customer-info w-100 loading-skeleton">
                  <h6>Khách hàng</h6>
                  <p class="mb-0">Tao Thu 1 Don Hang</p>
                  <p class="mb-0">0534 985 345</p>
                  <p class="mb-0">nguyenhoangn023@gmail.com</p>
                </div>
              </div>
              <div class="col d-flex mb-3">
                <div class="shipment-icon me-2">
                  <i
                    class="fa-solid fa-truck mt-1"
                    style={{ height: "30px" }}
                  ></i>
                </div>
                <div class="shipment-info w-100 loading-skeleton">
                  <h6>Giao hàng</h6>
                  <p class="mb-0">Giao Hàng Nhanh</p>
                  <p class="mb-0"></p>
                  <p class="mb-0">
                    88 Đường Số 1, Phường 26, Quận Bình Thạnh, Thành Phố Hồ Chí
                    Minh
                  </p>
                </div>
              </div>
              <div class="col d-flex mb-3">
                <div class="payment-icon me-2">
                  <i
                    class="fa-regular fa-credit-card mt-1"
                    style={{ height: "30px" }}
                  ></i>
                </div>
                <div class="payment-info w-100 loading-skeleton">
                  <h6>Thanh toán</h6>
                  <p class="mb-0">Ví điện tử MoMo</p>
                  <p class="mb-0">Đã thanh toán</p>
                </div>
              </div>
            </div>
            <div class="table-responsive loading-skeleton">
              <table class="table table-border mb-0">
                <thead>
                  <tr class="border-top">
                    <td class="fw-semibold" colspan="2">
                      <p className="mb-0">Sản phẩm</p>
                    </td>
                    <td class="fw-semibold text-center">
                      <p className="mb-0">SL</p>
                    </td>
                    <td class="fw-semibold text-end">
                      <p className="mb-0">Đơn giá</p>
                    </td>
                    <td class="fw-semibold text-end">
                      <p className="mb-0">Thành tiền</p>
                    </td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ width: "70px" }}>
                      <a rel="noopener" href="/products/35" target="_blank">
                        <img
                          src="https://res.cloudinary.com/nhn1909/image/upload/v1692257566/ninvd5imxknqc5v61n50.jpg"
                          width="70"
                          height="70"
                          class="object-fit-cover rounded border"
                        />
                      </a>
                    </td>
                    <td>
                      <a rel="noopener" href="/products/35" target="_blank">
                        <p class="fw-medium">...</p>
                      </a>
                    </td>
                    <td class="text-center align-middle">
                      <p className="mb-0">1</p>
                    </td>
                    <td class="text-end align-middle">
                      <p className="mb-0">xxx VND</p>
                    </td>
                    <td class="text-end align-middle">
                      <p className="mb-0">xxx VND</p>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ width: "70px" }}>
                      <a rel="noopener" href="/products/35" target="_blank">
                        <img
                          src="https://res.cloudinary.com/nhn1909/image/upload/v1692257566/ninvd5imxknqc5v61n50.jpg"
                          width="70"
                          height="70"
                          class="object-fit-cover rounded border"
                        />
                      </a>
                    </td>
                    <td>
                      <a rel="noopener" href="/products/35" target="_blank">
                        <p class="fw-medium">Tên sản phẩm</p>
                      </a>
                    </td>
                    <td class="text-center align-middle">
                      <p className="mb-0">1</p>
                    </td>
                    <td class="text-end align-middle">
                      <p className="mb-0">xxx VND</p>
                    </td>
                    <td class="text-end align-middle">
                      <p className="mb-0">xxx VND</p>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ width: "70px" }}>
                      <a rel="noopener" href="/products/35" target="_blank">
                        <img
                          src="https://res.cloudinary.com/nhn1909/image/upload/v1692257566/ninvd5imxknqc5v61n50.jpg"
                          width="70"
                          height="70"
                          class="object-fit-cover rounded border"
                        />
                      </a>
                    </td>
                    <td>
                      <a rel="noopener" href="/products/35" target="_blank">
                        <p class="fw-medium">...</p>
                      </a>
                    </td>
                    <td class="text-center align-middle">
                      <p className="mb-0">1</p>
                    </td>
                    <td class="text-end align-middle">
                      <p className="mb-0">xxx VND</p>
                    </td>
                    <td class="text-end align-middle">
                      <p className="mb-0">xxx VND</p>
                    </td>
                  </tr>
                </tbody>
                <tfoot class="">
                  <tr class="border-top">
                    <td class="fw-medium" colspan="4">
                      <span>Tổng tiền</span>
                    </td>
                    <td class="fw-semibold text-danger text-end">
                      <span>1.331.000 VND</span>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
        <div class="col-12 col-xxl-4">
          <div class="row g-3">
            <div class="col-12 col-md-6 col-xxl-12">
              <div class="card shadow p-3 loading-skeleton">
                <h5 class="mb-3 text-gray-800">Tình trạng đơn hàng</h5>
                <p class="mb-3 text-gray-800">Tình trạng đơn hàng</p>
                <button class="btn btn-primary w-100 py-2" type="submit">
                  <span role="status">Lưu</span>
                </button>
              </div>
            </div>
            <div class="col-12 col-md-6 col-xxl-12">
              <div class="card shadow p-3 loading-skeleton">
                <h5 class="mb-3 text-gray-800">Tình trạng đơn hàng</h5>
                <p class="mb-3 text-gray-800">Tình trạng đơn hàng</p>
                <button class="btn btn-primary w-100 py-2" type="submit">
                  <span role="status">Lưu</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminUpsertOrderSkeleton;
