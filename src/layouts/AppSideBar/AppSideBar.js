import { removeAuthInfo } from "~/services/AuthService";
import "./AppSideBar.css";
import { Link, useLocation } from "react-router-dom";
import authAPI from "~/apis/authAPI/authAPI";
import { useEffect, useState } from "react";

function AppSideBar() {
  const location = useLocation();
  const [currentUser, setCurrentUser] = useState();

  const getCurrentUser = async () => {
    const res = await authAPI.currentUser();
    if (res.status === 200) {
      setCurrentUser(res.data.result);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <div
      className="d-flex flex-column flex-shrink-0 p-3 shadow bg-white vh-100"
      style={{ width: "260px" }}
    >
      <div className="sidebar-header text-center">
        <Link to={"/"} className="mb-3">
          <i className="fa-solid fa-shield-halved fa-xl me-2"></i>
          <span className="fs-4">Trang chủ</span>
        </Link>
      </div>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <Link
            to={"/admin"}
            className={`nav-link ${
              location.pathname == "/admin" ? "active" : "link-body-emphasis"
            }`}
            aria-current="page"
          >
            <i className="fa-solid fa-tachograph-digital me-2"></i>
            Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to={"/admin/brands"}
            className={`nav-link ${
              location.pathname.startsWith("/admin/brands")
                ? "active"
                : "link-body-emphasis"
            }`}
          >
            <i className="fa-solid fa-copyright me-2"></i>
            Thương hiệu
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to={"/admin/categories"}
            className={`nav-link ${
              location.pathname.startsWith("/admin/categories")
                ? "active"
                : "link-body-emphasis"
            }`}
          >
            <i className="fa-solid fa-list-ul me-2"></i>
            Danh mục
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to={"/admin/products"}
            className={`nav-link ${
              location.pathname.startsWith("/admin/products")
                ? "active"
                : "link-body-emphasis"
            }`}
          >
            <i className="fa-solid fa-border-all me-2"></i>
            Sản phẩm
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to={"/admin/orders"}
            className={`nav-link ${
              location.pathname.startsWith("/admin/orders")
                ? "active"
                : "link-body-emphasis"
            }`}
          >
            <i className="fa-solid fa-cart-shopping me-2"></i>
            Đơn hàng
          </Link>
        </li>
      </ul>
      <hr />
      <div className="dropdown dropup">
        <a
          href="#"
          className="d-flex align-items-center link-body-emphasis text-decoration-none dropdown-toggle"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <img
            src="https://github.com/mdo.png"
            alt=""
            width="32"
            height="32"
            className="rounded-circle me-2"
          />
          <strong>{`${currentUser?.firstName} ${currentUser?.lastName}`}</strong>
        </a>
        <ul className="dropdown-menu text-small shadow">
          <li>
            <a className="dropdown-item" href="#">
              Thông tin cá nhân
            </a>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li>
            <a
              className="dropdown-item cursor-pointer text-danger"
              onClick={(e) => {
                e.preventDefault();
                removeAuthInfo();
                window.location.href = "/";
              }}
            >
              Đăng xuất
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default AppSideBar;
