function ProductNotAvailable() {
  return (
    <div className="card text-center py-4">
      <div className="card-body">
        <h3 className="card-title text-danger">
          <i className="fa-regular fa-circle-xmark me-3"></i>
          Sản phẩm không khả dụng
        </h3>
      </div>
    </div>
  );
}

export default ProductNotAvailable;
