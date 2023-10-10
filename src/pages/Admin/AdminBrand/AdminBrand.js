import queryString from "query-string";
import { useEffect, useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import brandAPI from "~/apis/brandAPI/brandAPI";
import FilterText from "~/components/Filter/FilterText";
import ReloadData from "~/components/Filter/ReloadData";
import RemoveFilter from "~/components/Filter/RemoveFilter";
import ArrowPagination from "~/components/Pagination/ArrowPagination";
import Pagination from "~/components/Pagination/Pagination";
import adminRoutes from "~/routes/adminRoutes";

function AdminBrand() {
  document.title = "Quản lý thương hiệu";

  let location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const [reloadFlag, setReloadFlag] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [brandsResponse, setBrandsResponse] = useState();

  const PAGE_SIZE = 12;

  useEffect(() => {
    const params = queryString.parse(location.search);
    params.size = params.size ? params.size : PAGE_SIZE;

    const getBrands = async () => {
      setIsLoading(true);
      const res = await brandAPI.getAdminBrands(params);
      if (res.status === 200) {
        setBrandsResponse(res.data.result);
      }
      setIsLoading(false);
    };

    getBrands();
  }, [searchParams]);

  return (
    <>
      <div className="mt-1">
        <h3 className="mb-4 text-gray-800">Danh sách thương hiệu</h3>

        <div className="mb-4">
          <div className="d-flex flex-wrap gap-2">
            <FilterText filterName={"Tìm kiếm thương hiệu"} filterKey={"kw"} />

            <RemoveFilter />

            <ReloadData reloadFlag={reloadFlag} setReloadFlag={setReloadFlag} />

            <div className="">
              <div className="btn-group">
                <div className="btn-group" role="group">
                  <Link
                    className="btn btn-primary"
                    style={{ width: "180px" }}
                    to={adminRoutes.adminAddBrand}
                  >
                    <i className="fa-solid fa-plus me-2"></i>
                    Thêm thương hiệu
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card shadow mb-4">
          <div className="d-flex justify-content-end mt-3 px-4">
            <ArrowPagination pageData={brandsResponse} />
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
                  <th className="">ID</th>
                  <th>Tên thương hiệu</th>
                  <th>Quốc gia</th>
                  <th></th>
                </tr>
              </thead>
              {!isLoading ? (
                <>
                  <tbody>
                    {brandsResponse?.numberOfElements != 0 ? (
                      <>
                        {brandsResponse?.content?.map((brand, index) => (
                          <tr key={index}>
                            <td className="align-middle fw-bolder">
                              #{brand.id}
                            </td>
                            <td className="align-middle">{brand.name}</td>
                            <td className="align-middle">{brand.country}</td>
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
                                        to={`${adminRoutes.adminEditBrand}/${brand.id}`}
                                      >
                                        Sửa
                                      </Link>
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
                        <td colSpan={4} className="text-center py-3">
                          <div
                            className="alert alert-danger d-flex align-items-center mt-3 mx-3 py-4"
                            role="alert"
                          >
                            <p className="text-center w-100 m-0">
                              <i className="fa-solid fa-square-xmark me-2"></i>
                              Không có kết quả nào trùng khớp
                            </p>
                          </div>
                        </td>
                      </tr>
                    )}
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

          <div className="pagination d-flex justify-content-center py-2">
            <Pagination pageData={brandsResponse} />
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminBrand;
