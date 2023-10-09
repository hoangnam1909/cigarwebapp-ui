function ImagesUpload({ setImages, setImageFiles }) {
  const handleChooseImage = (e) => {
    setImageFiles(e.target.files);
    setImages(
      Array.from(e.target.files).map((image) => {
        return URL.createObjectURL(image);
      })
    );
  };

  return (
    <>
      <label className="form-label">Ảnh sản phẩm</label>
      <input
        className="form-control"
        type="file"
        accept=""
        multiple
        onChange={handleChooseImage}
      />
    </>
  );
}

export default ImagesUpload;
