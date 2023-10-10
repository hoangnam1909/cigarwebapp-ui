import { Link, useLocation } from "react-router-dom";
import { headerRoutes } from "~/routes/routes";
import { tokenUserRole, verifyToken } from "~/services/AuthService";

function AppHeader() {
  const location = useLocation();

  return (
    <nav
      className="navbar border-bottom navbar-expand-lg bg-white"
      data-bs-theme="light"
    >
      <div className="container">
        <Link to="/" className="navbar-brand">
          <img
            src="https://res.cloudinary.com/nhn1909/image/upload/v1690041731/ktypjs6ap3ykjv6eydqu.png"
            alt="Bootstrap"
            width="30"
            height="30"
            className="me-2"
          />
          Cigar For Boss
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            {headerRoutes.map((route, index) => {
              return (
                <li key={index} className="nav-item">
                  <Link
                    to={route.path}
                    className={`nav-link ${
                      route.path != "/" && location.pathname == route.path
                        ? "active"
                        : ""
                    }`}
                    aria-current="page"
                  >
                    {route.name}
                  </Link>
                </li>
              );
            })}
          </ul>

          {verifyToken() && tokenUserRole() === "ADMIN" ? (
            <div className="d-flex gap-2">
              <Link
                to={"/admin"}
                target="_blank"
                rel="noopener"
                className="btn btn-outline-dark px-3"
              >
                <i className="fa-solid fa-user-gear me-2"></i>
                Trang quản trị
              </Link>
            </div>
          ) : (
            <div className="d-flex gap-2">
              <Link to={"/login"} className="btn btn-outline-dark">
                Đăng nhập
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default AppHeader;
