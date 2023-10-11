function ListImagePreview({ imageList }) {
  return (
    <>
      <div className="d-flex flex-wrap py-2 gap-1 ">
        {imageList?.map((image, index) => {
          return (
            <img
              key={index}
              src={image}
              style={{ height: "200px" }}
              className="border rounded object-fit-cover"
            />
          );
        })}
      </div>
    </>
  );
}

export default ListImagePreview;
