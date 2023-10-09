import "./ProductCard.css";
import { Link } from "react-router-dom";
import { toVND } from "~/utils/NumberFormatter";
import { rewriteUrl } from "~/utils/UrlRewrite";

function ProductCard({ product }) {
  return (
    <div className="card shadow-sm h-100">
      <Link to={`/products/${rewriteUrl(product.name)}-${product.id}`}>
        <img
          src={product.productImages[0]?.linkToImage}
          alt={`${product.name} image`}
          width="100%"
          height="210"
          className="card-img-top object-fit-cover"
        />
        <div className="card-body">
          <h6
            className="card-title product-card-name mb-2"
            style={{ lineHeight: "1.5" }}
          >
            {product.name}
          </h6>
          {product.originalPrice ? (
            <p className="card-text mb-0">
              <del>{toVND(product.originalPrice)}</del>
            </p>
          ) : null}

          {product.salePrice ? (
            <h6 className="card-text text-danger">
              {toVND(product.salePrice)}
            </h6>
          ) : (
            <h6 className="card-text text-danger">Liên hệ</h6>
          )}
        </div>
      </Link>
    </div>
  );
}

export default ProductCard;
