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
import activeProductFilterData from "~/data/activeProductFilter.json";
import productInStockFilterData from "~/data/productInStockFilterData.json";
import { toast } from "react-toastify";
import ArrowPagination from "~/components/Pagination/ArrowPagination";
import ReloadData from "~/components/Filter/ReloadData";
import Alert from "~/components/Alert/Alert";

function AdminProducts() {
  document.title = "Quản lý sản phẩm";

  let location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const [reloadFlag, setReloadFlag] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingActive, setLoadingActive] = useState(false);

  const [productsResponse, setProductsResponse] = useState();
  const [categories, setCategories] = useState();
  const [brands, setBrands] = useState();

  const PAGE_SIZE = 12;

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
      toast.success(
        `Thay đổi trạng thái sản phẩm #${id}: ${e.target.checked.toString()}.`
      );
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Bạn chắc chắn xoá sản phẩm này?");
    if (confirmDelete == true) {
      const res = await productAPI.deleteProduct(id);
      if (res.status === 200) {
        setReloadFlag(!reloadFlag);
        toast.success(`Xoá sản phẩm ${id} thành công.`);
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
    const getProducts = async () => {
      setIsLoading(true);
      const res = await productAPI.getAdminProducts(
        params,
        searchParams.get("page") ? parseInt(searchParams.get("page")) : 1,
        PAGE_SIZE
      );
      if (res.status === 200) {
        setProductsResponse(res.data.result);
      }

      setIsLoading(false);
    };

    getProducts();
  }, [searchParams, reloadFlag]);

  return (
    <>
      <div className="mt-1">
        <h3 className="mb-4 text-gray-800">Danh sách sản phẩm</h3>

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

            <FilterDropdown
              filterList={activeProductFilterData}
              filterName={"Kích hoạt"}
              filterKey={"active"}
              displayKey={"name"}
              valueKey={"value"}
            />

            <FilterDropdown
              filterList={productInStockFilterData}
              filterName={"Tình trạng hàng"}
              filterKey={"inStock"}
              displayKey={"name"}
              valueKey={"value"}
            />

            <RemoveFilter />

            <ReloadData reloadFlag={reloadFlag} setReloadFlag={setReloadFlag} />

            <div className="btn-group" role="group">
              <Link
                className="btn btn-primary px-3"
                style={{ width: "180px" }}
                to={adminRoutes.adminAddProduct}
              >
                <i className="fa-solid fa-plus me-2"></i>
                Thêm sản phẩm
              </Link>
            </div>
          </div>
        </div>

        <div className="card shadow mb-4">
          <div className="d-flex justify-content-end mt-3 px-4">
            <ArrowPagination pageData={productsResponse} />
          </div>
          <div className="px-4 py-0">
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
                  <th className="align-self-center" style={{ width: "8%" }}>
                    Số lượng còn
                  </th>
                  <th className="align-self-center" style={{ width: "14%" }}>
                    Danh mục
                  </th>
                  <th className="align-self-center" style={{ width: "14%" }}>
                    Thương hiệu
                  </th>
                  <th className="align-self-center" style={{ width: "15%" }}>
                    Ngày tạo
                  </th>
                  <th
                    className="align-self-center"
                    style={{ width: "10%" }}
                  ></th>
                </tr>
              </thead>

              {!isLoading ? (
                <>
                  <tbody>
                    {productsResponse?.numberOfElements != 0 ? (
                      <>
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
                            <td className="align-middle">{p.unitsInStock}</td>
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
                                      <a
                                        className="dropdown-item text-danger"
                                        onClick={(e) => {
                                          e.preventDefault();
                                          handleDelete(p.id);
                                        }}
                                      >
                                        Xoá
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </>
                    ) : (
                      <tr>
                        <td colSpan={9} className="text-center py-3">
                          <Alert type={"danger"} message={"Không có kết quả"} />
                        </td>
                      </tr>
                    )}
                  </tbody>
                </>
              ) : (
                <>
                  <tbody>
                    <tr>
                      <td colSpan={9} className="text-center py-5">
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

          <div className="pagination d-flex justify-content-center py-2">
            <Pagination pageData={productsResponse} />
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminProducts;
