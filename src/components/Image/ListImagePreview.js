function ListImagePreview({ imageList }) {
  return (
    <>
      <div className="d-flex flex-wrap">
        {imageList?.map((image, index) => {
          return (
            <img
              key={index}
              src={image}
              style={{ height: "200px", objectFit: "cover" }}
              className="m-1 border rounded"
            />
          );
        })}
      </div>
    </>
  );
}

export default ListImagePreview;
