import queryString from "query-string";
import { useEffect, useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import categoryAPI from "~/apis/categoryAPI/categoryAPI";
import ArrowPagination from "~/components/Pagination/ArrowPagination";
import Pagination from "~/components/Pagination/Pagination";
import adminRoutes from "~/routes/adminRoutes";

function AdminCategories() {
  document.title = "Quản lý danh mục";

  const [dataImpact, setDataImpact] = useState(0);
  const [categoriesResponse, setCategoriesResponse] = useState();
  const [searchParams, setSearchParams] = useSearchParams();
  const [keyword, setKeyword] = useState();
  const [loading, setLoading] = useState(false);
  let location = useLocation();
  const PAGE_SIZE = 12;

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Bạn chắc chắn xoá danh mục này?");
    if (confirmDelete == true) {
      const res = await categoryAPI.deleteCategory(id);
      if (res.status === 200) {
        setDataImpact((dataImpact) => {
          return dataImpact + 1;
        });
      }
    }
  };

  useEffect(() => {
    const params = queryString.parse(location.search);
    params.size = params.size ? params.size : PAGE_SIZE;

    const getCategories = async () => {
      setLoading(true);
      const res = await categoryAPI.getAdminCategories(params);
      if (res.status === 200) {
        setCategoriesResponse(res.data.result);
        setLoading(false);
      }
    };

    getCategories();
  }, [dataImpact, searchParams]);

  return (
    <>
      <div className="mt-1">
        <h3 className="mb-4 text-gray-800">Danh sách danh mục</h3>

        <div className="mb-4">
          <div className="d-flex flex-wrap gap-2">
            <div
              className="search-box border rounded"
              style={{ width: "370px" }}
            >
              <div className="input-group flex-nowrap">
                <input
                  type="text"
                  className="form-control border-0 outline-none"
                  placeholder="Tìm kiếm danh mục"
                  value={keyword}
                  onChange={(e) => {
                    setKeyword(e.target.value);
                    setTimeout(() => {
                      searchParams.delete("page");
                      if (e.target.value.length == 0) {
                        searchParams.delete("kw");
                        setSearchParams(searchParams);
                      } else {
                        searchParams.set("kw", `${e.target.value}`);
                        setSearchParams(searchParams);
                      }
                    }, 800);
                  }}
                />
              </div>
            </div>

            <div className="filter-dropdown">
              <a
                type="button"
                className="btn btn-danger px-5"
                onClick={(e) => {
                  e.preventDefault();
                  setSearchParams();
                  setKeyword("");
                }}
              >
                <i className="fa-solid fa-filter-circle-xmark me-2"></i>
                Loại bỏ bộ lọc
              </a>
            </div>

            <div className="">
              <div className="btn-group">
                <div className="btn-group" role="group">
                  <Link
                    className="btn btn-primary"
                    style={{ width: "180px" }}
                    to={adminRoutes.adminAddCategory}
                  >
                    <i className="fa-solid fa-plus me-2"></i>
                    Thêm danh mục
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card shadow mb-4">
          <div className="d-flex justify-content-end mt-3 px-4">
            <ArrowPagination pageData={categoriesResponse} />
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
                  <th>Tên danh mục</th>
                  <th></th>
                </tr>
              </thead>
              {!loading ? (
                <>
                  <tbody>
                    {categoriesResponse?.content?.map((category, index) => (
                      <tr key={index}>
                        <td className="align-middle fw-bolder">
                          #{category.id}
                        </td>
                        <td className="align-middle">{category.name}</td>
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
                                    to={`${adminRoutes.adminEditCategory}/${category.id}`}
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
                                    onClick={() => handleDelete(category.id)}
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

          <div className="pagination d-flex justify-content-center py-2">
            <Pagination pageData={categoriesResponse} />
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminCategories;
