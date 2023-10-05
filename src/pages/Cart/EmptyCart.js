import { Link } from "react-router-dom";

function EmptyCart() {
  return (
    <div className="card text-center">
      <div className="card-body py-5">
        <h3 className="card-title mb-4">Giỏ hàng của bạn đang trống</h3>
        <Link to={"/products"} className="btn btn-outline-secondary px-3">
          <i className="fa-solid fa-cart-shopping me-2"></i>
          Mua sắm ngay
        </Link>
      </div>
    </div>
  );
}

export default EmptyCart;
