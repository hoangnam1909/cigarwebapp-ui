export default function ModalContent({ type, content }) {
  if (type == "product") {
    return (
      <>
        <h5 className="text-center mb-4" style={{ color: "#46a74e" }}>
          <i className="fa-solid fa-check"></i>
          Sản phẩm đã được thêm vào giỏ hàng
        </h5>
        <div className="d-flex">
          <div className="modal-product-image w-25 me-3">
            <img
              src={content?.productImages[0]?.linkToImage}
              width="80"
              height="80"
              className="rounded object-fit-cover"
            />
          </div>
          <div className="modal-product-info">
            <h6>{content?.name}</h6>
            <h6>Số lượng: 1</h6>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <h1>n/a</h1>
    </>
  );
}
