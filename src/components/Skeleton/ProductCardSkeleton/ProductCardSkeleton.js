import "../Skeleton.scss";
function ProductCardSkeleton() {
  return (
    <div className="card shadow-sm h-100 loading-skeleton">
      <a href="/products/xi-ga-caching-2-66">
        <img
          src="http://res.cloudinary.com/nhn1909/image/upload/v1695586229/166d6255-dea3-4ba8-bb91-8bea293a73b2.jpg"
          alt="Xì gà caching 2 image"
          width="100%"
          height="210"
          className="card-img-top object-fit-cover"
        />
        <div className="card-body">
          <h6
            className="card-title product-card-name mb-2"
            style={{ lineHeight: "1.5" }}
          >
            product name
          </h6>
          <p className="card-text mb-0">
            <del>VND</del>
          </p>
          <h6 className="">VND</h6>
        </div>
      </a>
    </div>
  );
}

export default ProductCardSkeleton;
