import queryString from "query-string";
import { useEffect, useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import categoryAPI from "~/apis/categoryAPI/categoryAPI";
import Alert from "~/components/Alert/Alert";
import FilterText from "~/components/Filter/FilterText";
import ReloadData from "~/components/Filter/ReloadData";
import RemoveFilter from "~/components/Filter/RemoveFilter";
import ArrowPagination from "~/components/Pagination/ArrowPagination";
import Pagination from "~/components/Pagination/Pagination";
import adminRoutes from "~/routes/adminRoutes";

function AdminCategories() {
  document.title = "Quản lý danh mục";

  let location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const [reloadFlag, setReloadFlag] = useState(false);
  const [loading, setLoading] = useState(false);

  const [categoriesResponse, setCategoriesResponse] = useState();
  const [keyword, setKeyword] = useState();
  const PAGE_SIZE = 12;

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Bạn chắc chắn xoá danh mục này?");
    if (confirmDelete == true) {
      const res = await categoryAPI.deleteCategory(id);
      if (res.status === 200) {
        setReloadFlag(!reloadFlag);
        toast.success("Xoá thành công danh mục");
      } else {
        toast.error("Xoá không thành công danh mục");
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
      }

      setLoading(false);
    };

    getCategories();
  }, [searchParams, reloadFlag]);

  return (
    <>
      <div className="mt-1">
        <h3 className="mb-4 text-gray-800">Danh sách danh mục</h3>

        <div className="mb-4">
          <div className="d-flex flex-wrap gap-2">
            <FilterText filterName={"Tìm kiếm danh mục"} filterKey={"kw"} />

            <RemoveFilter />

            <ReloadData reloadFlag={reloadFlag} setReloadFlag={setReloadFlag} />

            <Link
              className="btn btn-primary px-3"
              to={adminRoutes.adminAddCategory}
            >
              <i className="fa-solid fa-plus me-2"></i>
              Thêm danh mục
            </Link>
          </div>
        </div>

        <div className="card shadow mb-4 p-3">
          <div className="d-flex justify-content-end">
            <ArrowPagination pageData={categoriesResponse} />
          </div>

          <div className="">
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
                    {categoriesResponse?.numberOfElements != 0 ? (
                      <>
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
                                        className="dropdown-item text-danger cursor-pointer"
                                        onClick={(e) => {
                                          e.preventDefault();
                                          handleDelete(category.id);
                                        }}
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
