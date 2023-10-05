import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import brandAPI from "~/apis/brandAPI/brandAPI";
import categoryAPI from "~/apis/categoryAPI/categoryAPI";
import productAPI from "~/apis/productAPI/productAPI";
import ListImagePreview from "~/components/Image/ListImagePreview";
import ImagesUpload from "~/components/Input/ImagesUpload";
import RichTextEditor from "~/components/Input/RichTextEditor";
import { numberInputOnly } from "~/utils/InputUtils";

function AdminAddProduct() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  const [product, setProduct] = useState({
    name: "",
    description: "",
    originalPrice: 0,
    salePrice: 0,
    unitsInStock: 0,
    categoryId: 1,
    brandId: 1,
  });
  const [images, setImages] = useState([]);
  const [imageFiles, setImageFiles] = useState();

  const handleQuillEdit = (value) => {
    setProduct((prev) => {
      return {
        ...prev,
        description: value,
      };
    });
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append(
      "product",
      new Blob([JSON.stringify(product).toString()], {
        type: "application/json",
      })
    );

    if (imageFiles) {
      Array.from(imageFiles).forEach((file) => {
        formData.append("files", file);
      });
    } else {
      formData.append("files", []);
    }

    console.log(formData);

    if (productId == null) {
      console.log("add product");
      const res = await productAPI.addProduct(formData);
      if (res.status == 200) {
        navigate("/admin/products");
        setIsLoading(false);
      }
    } else {
      console.log("update product");
      const res = await productAPI.entireUpdateProduct(productId, formData);
      if (res.status == 200) {
        navigate("/admin/products");
        setIsLoading(false);
      }
    }
  };

  const getCategories = async () => {
    const res = await categoryAPI.getAdminCategories();
    if (res.status === 200) {
      setCategories(res.data.result.content);
    }
  };

  const getBrands = async () => {
    const res = await brandAPI.getAdminBrands();
    if (res.status === 200) {
      setBrands(res.data.result.content);
    }
  };

  const getProduct = async () => {
    const response = await productAPI.getAdminProductByID(productId);
    if (response.status === 200) {
      setImages(
        response?.data.result.productImages.map((img) => img.linkToImage)
      );

      setProduct({
        ...product,
        name: response?.data.result.name ? response?.data.result.name : "",
        description: response?.data.result.description
          ? response?.data.result.description
          : "",
        originalPrice: response?.data.result.originalPrice
          ? response?.data.result.originalPrice
          : 0,
        salePrice: response?.data.result.salePrice
          ? response?.data.result.salePrice
          : 0,
        unitsInStock: response?.data.result.unitsInStock
          ? response?.data.result.unitsInStock
          : 0,
        categoryId: response?.data.result.category.id
          ? response?.data.result.category.id
          : 0,
        brandId: response?.data.result.brand.id
          ? response?.data.result.brand.id
          : 0,
        productImages: response?.data.result.productImages
          ? response?.data.result.productImages.map((img) => img.linkToImage)
          : [],
      });
    }
  };

  useEffect(() => {
    getCategories();
    getBrands();
    if (productId != null) getProduct();
  }, []);

  return (
    <div className={`mt-1 ${isLoading ? "pe-none opacity-75" : ""}`}>
      <h3 className="mt-2 mb-4 text-gray-800">
        {productId == null ? "Thêm sản phẩm" : "Chỉnh sửa thông tin sản phẩm"}
      </h3>

      <div className="card mt-3">
        <div className="card-body">
          <form onSubmit={handleSubmitForm}>
            <div className="mb-3 form-floating">
              <select
                className="form-select"
                id="floatingSelectCategory"
                onChange={(e) =>
                  setProduct({
                    ...product,
                    categoryId: parseInt(e.target.value),
                  })
                }
              >
                {categories?.map((c) => {
                  return (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  );
                })}
              </select>
              <label htmlFor="floatingSelectCategory">Danh mục</label>
            </div>

            <div className="mb-3 form-floating">
              <select
                className="form-select"
                id="floatingSelectBrand"
                onChange={(e) =>
                  setProduct({
                    ...product,
                    brandId: parseInt(e.target.value),
                  })
                }
              >
                {brands?.map((b) => {
                  return (
                    <option key={b.id} value={b.id}>
                      {b.name}
                    </option>
                  );
                })}
              </select>
              <label htmlFor="floatingSelectBrand">Thương hiệu</label>
            </div>

            <div className="mb-3">
              <label className="form-label">Tên sản phẩm</label>
              <input
                className="form-control"
                id="name-input"
                type="text"
                onChange={(e) =>
                  setProduct({ ...product, name: e.target.value })
                }
                value={product?.name}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Mô tả sản phẩm</label>
              <RichTextEditor
                data={product?.description}
                onChange={handleQuillEdit}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Giá gốc</label>
              <div className="input-group">
                <input
                  className="form-control"
                  placeholder="Giá gốc"
                  aria-label="Giá gốc"
                  aria-describedby="basic-addon1"
                  pattern="^[0-9]*$"
                  value={parseInt(
                    product?.originalPrice ? product?.originalPrice : 0
                  )}
                  onChange={(e) => {
                    if (numberInputOnly(e.target.value)) {
                      setProduct({
                        ...product,
                        originalPrice: parseInt(e.target.value),
                      });
                    }
                  }}
                />
                <span className="input-group-text" id="basic-addon1">
                  VND
                </span>
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Giá sau khuyến mại</label>
              <div className="input-group">
                <input
                  className="form-control"
                  placeholder="Giá sau khuyến mại"
                  aria-label="Giá sau khuyến mại"
                  aria-describedby="basic-addon2"
                  value={parseInt(product?.salePrice ? product?.salePrice : 0)}
                  onChange={(e) => {
                    if (numberInputOnly(e.target.value)) {
                      setProduct({
                        ...product,
                        salePrice: parseInt(e.target.value),
                      });
                    }
                  }}
                />
                <span className="input-group-text" id="basic-addon2">
                  VND
                </span>
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Số lượng</label>
              <input
                className="form-control"
                value={parseInt(
                  product?.unitsInStock ? product?.unitsInStock : 0
                )}
                onChange={(e) => {
                  if (numberInputOnly(e.target.value)) {
                    setProduct({
                      ...product,
                      unitsInStock: parseInt(e.target.value),
                    });
                  }
                }}
              />
            </div>

            <div className="mb-3">
              <ImagesUpload
                setImages={setImages}
                setImageFiles={setImageFiles}
              />
              <ListImagePreview imageList={images} />
            </div>

            <button
              className="btn btn-dark btn-lg w-100 mb-2"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="spinner-border me-2" aria-hidden="true"></span>
              ) : (
                <span role="status">Thêm sản phẩm</span>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminAddProduct;
