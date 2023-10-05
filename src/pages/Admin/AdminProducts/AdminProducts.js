import moment from "moment";
import queryString from "query-string";
import { useEffect, useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import brandAPI from "~/apis/brandAPI/brandAPI";
import categoryAPI from "~/apis/categoryAPI/categoryAPI";
import productAPI from "~/apis/productAPI/productAPI";
import FilterDropdown from "~/components/Filter/FilterDropdown";
import FilterText from "~/components/Filter/FilterText";
import RemoveFilter from "~/components/Filter/RemoveFilter";
import Pagination from "~/components/Pagination/Pagination";
import adminRoutes from "~/routes/adminRoutes";

function AdminProducts() {
  const [dataImpact, setDataImpact] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const [loadingActive, setLoadingActive] = useState(false);
  const [productsResponse, setProductsResponse] = useState();
  const [categories, setCategories] = useState();
  const [brands, setBrands] = useState();
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  let location = useLocation();
  const [keyword, setKeyword] = useState();
  const PAGE_SIZE = 15;

  const handleChangeActive = async (e, id) => {
    setLoadingActive(true);
    const res = await productAPI.partialUpdateProduct(id, {
      active: e.target.checked.toString(),
    });
    if (res.status === 200) {
      setProductsResponse({
        ...productsResponse,
        content: productsResponse.content.map((p) =>
          p.id == id ? { ...p, active: !p.active } : p
        ),
      });
      setLoadingActive(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Bạn chắc chắn xoá sản phẩm này?");
    if (confirmDelete == true) {
      const res = await productAPI.deleteProduct(id);
      if (res.status === 200) {
        setDeleteSuccess(true);
        setDataImpact((dataImpact) => {
          return dataImpact + 1;
        });
      }
    }
  };

  const getCategories = async () => {
    const res = await categoryAPI.getAdminCategories();
    setCategories(res.data.result.content);
  };

  const getBrands = async () => {
    const res = await brandAPI.getAdminBrands();
    setBrands(res.data.result.content);
  };

  useEffect(() => {
    getCategories();
    getBrands();
  }, []);

  useEffect(() => {
    const params = queryString.parse(location.search);

    const config = {
      onUploadProgress: (progressEvent) => console.log(progressEvent.loaded),
    };

    const getProducts = async () => {
      const res = await productAPI.getAdminProducts(
        params,
        searchParams.get("page") ? parseInt(searchParams.get("page")) : 1,
        PAGE_SIZE
      );
      if (res.status === 200) {
        setProductsResponse(res.data.result);
      }
    };

    getProducts();
  }, [searchParams, dataImpact]);

  console.log(productsResponse);
  return (
    <>
      <div className="mt-1">
        <h3 className="mb-4 text-gray-800">Danh sách sản phẩm</h3>
        {deleteSuccess ? (
          <div
            className="alert alert-success alert-dismissible fade show"
            role="alert"
          >
            Xoá sản phẩm thành công
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
            ></button>
          </div>
        ) : null}

        <div className="mb-4">
          <div className="d-flex flex-wrap gap-2">
            <FilterText filterName={"Tìm kiếm sản phẩm"} filterKey={"kw"} />

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

            <div className="">
              <div className="btn-group">
                <div className="btn-group" role="group">
                  <Link
                    className="btn btn-primary"
                    style={{ width: "180px" }}
                    to={adminRoutes.adminAddProduct}
                  >
                    <i className="fa-solid fa-plus me-2"></i>
                    Thêm sản phẩm
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card shadow mb-4">
          {productsResponse?.content?.length != 0 &&
          productsResponse != null ? (
            <>
              <div className="d-flex justify-content-end mt-3 mb-1 px-4">
                <Pagination pageData={productsResponse} />
              </div>
              <div className="table-responsive rounded px-4 py-0">
                <table
                  className="table table-hover"
                  id="dataTable"
                  width="100%"
                  cellSpacing="0"
                >
                  <thead>
                    <tr>
                      <th
                        className="align-self-center"
                        style={{ width: "5%" }}
                      ></th>
                      <th className="align-self-center" style={{ width: "5%" }}>
                        Kích hoạt
                      </th>
                      <th className="align-self-center" style={{ width: "5%" }}>
                        ID
                      </th>
                      <th className="align-self-center" style={{ width: "" }}>
                        Tên sản phẩm
                      </th>
                      <th
                        className="align-self-center"
                        style={{ width: "14%" }}
                      >
                        Danh mục
                      </th>
                      <th
                        className="align-self-center"
                        style={{ width: "14%" }}
                      >
                        Thương hiệu
                      </th>
                      <th
                        className="align-self-center"
                        style={{ width: "15%" }}
                      >
                        Ngày tạo
                      </th>
                      <th
                        className="align-self-center"
                        style={{ width: "10%" }}
                      ></th>
                    </tr>
                  </thead>
                  {productsResponse ? (
                    <>
                      <tbody>
                        {productsResponse?.content?.map((p, index) => (
                          <tr key={index}>
                            <td className="align-middle">
                              <Link
                                to={`${adminRoutes.adminEditProduct}/${p.id}`}
                              >
                                <img
                                  src={p.productImages[0]?.linkToImage}
                                  width={53}
                                  height={53}
                                  className="object-fit-cover rounded"
                                />
                              </Link>
                            </td>
                            <td className="align-middle fw-bolder">
                              <div className="form-check form-switch">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  role="switch"
                                  checked={p.active}
                                  onChange={(e) => handleChangeActive(e, p.id)}
                                  disabled={loadingActive}
                                />
                              </div>
                            </td>
                            <td className="align-middle fw-bolder">#{p.id}</td>
                            <td className="align-middle">
                              <Link
                                to={`${adminRoutes.adminEditProduct}/${p.id}`}
                                className="text-primary"
                              >
                                {p.name}
                              </Link>
                            </td>
                            <td className="align-middle">{p.category.name}</td>
                            <td className="align-middle">{p.brand.name}</td>
                            <td className="align-middle">
                              {moment(p.createdDate).format("LT")}
                              {" - "}
                              {moment(p.createdDate).format("ll")}
                            </td>
                            <td className="align-middle">
                              <div className="d-flex flex-row justify-content-center">
                                <div className="btn-group">
                                  <a
                                    className="btn rounded border-0"
                                    style={{ cursor: "pointer" }}
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                  >
                                    <i className="fa-solid fa-ellipsis"></i>
                                  </a>
                                  <ul className="dropdown-menu">
                                    <li>
                                      <Link
                                        className="dropdown-item"
                                        to={`${adminRoutes.adminEditProduct}/${p.id}`}
                                      >
                                        Sửa
                                      </Link>
                                    </li>
                                    <li>
                                      <hr className="dropdown-divider" />
                                    </li>
                                    <li>
                                      <Link
                                        className="dropdown-item text-danger"
                                        onClick={() => handleDelete(p.id)}
                                      >
                                        Xoá
                                      </Link>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </>
                  ) : (
                    <>
                      <tbody>
                        <tr>
                          <td colSpan={8} className="text-center py-5">
                            <div
                              className="spinner-border"
                              style={{ width: "3rem", height: "3rem" }}
                              role="status"
                            ></div>
                          </td>
                        </tr>
                      </tbody>
                    </>
                  )}
                </table>
              </div>
            </>
          ) : (
            <>
              <div
                className="alert alert-danger d-flex align-items-center mt-3 mx-3"
                role="alert"
              >
                <i className="fa-solid fa-square-xmark me-2"></i>
                <div>Không có kết quả nào trùng khớp</div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default AdminProducts;
