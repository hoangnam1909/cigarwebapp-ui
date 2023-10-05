import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <div className="text-center">
        <h1 className="display-1 fw-bold">404</h1>
        <p className="fs-3">
          {" "}
          <span className="text-danger">Opps!</span> Trang này không tồn tại.
        </p>
        <p className="lead">Trang bạn tìm kiếm hiện không tồn tại.</p>
        <Link to={"/"} className="btn btn-primary px-4">
          Trở lại trang chủ
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
