import ProductCardSkeleton from "../ProductCardSkeleton/ProductCardSkeleton";

function ProductCardSkeletonView({ count }) {
  let elements = [];
  for (let i = 0; i < count; i++) {
    elements.push(
      <div key={i} className="col">
        <ProductCardSkeleton />
      </div>
    );
  }

  return <>{elements}</>;
}

export default ProductCardSkeletonView;
