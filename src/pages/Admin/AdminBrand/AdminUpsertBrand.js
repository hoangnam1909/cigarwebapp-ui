import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import brandAPI from "~/apis/brandAPI/brandAPI";
import RichTextEditor from "~/components/Input/RichTextEditor";

function AdminUpsertBrand() {
  const { brandId } = useParams();

  document.title = `${
    brandId == null ? "Thêm thương hiệu" : "Chỉnh sửa thương hiệu"
  }`;

  const [reloadFlag, setReloadFlag] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [brand, setBrand] = useState({
    name: "",
  });

  const initialValue = () => {
    setBrand({
      ...brand,
      name: "",
      description: "",
      link: "",
      image: "",
      country: "",
    });
    setReloadFlag(false);
    setIsLoading(false);
  };

  const handleQuillEdit = (value) => {
    setBrand((prev) => {
      return {
        ...prev,
        description: value,
      };
    });
  };

  const getBrand = async () => {
    const res = await brandAPI.getAdminBrand(brandId);
    if (res.status === 200) {
      const brandData = res.data.result;
      setBrand({
        ...brand,
        name: brandData.name,
        description: brandData.description,
        link: brandData.link,
        image: brandData.image,
        country: brandData.country,
      });
    }
  };

  useEffect(() => {
    if (brandId != null) getBrand();
  }, [reloadFlag]);

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (brandId == null) {
      const res = await brandAPI.addBrand(brand);
      if (res.status == 200) {
        toast.success("Thêm thương hiệu thành công.");
        initialValue();
      }
    } else {
      const res = await brandAPI.updateBrand(brandId, brand);
      if (res.status == 200) {
        setReloadFlag(!reloadFlag);
        toast.success("Chỉnh sửa thương hiệu thành công.");
        getBrand();
      }
    }

    setIsLoading(false);
  };

  return (
    <>
      <div className="mt-1">
        <h3 className="mb-4 text-gray-800">
          {brandId == null ? "Thêm thương hiệu" : "Chỉnh sửa thương hiệu"}
        </h3>

        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmitForm}>
              <div className="mb-3">
                <label className="form-label">Tên thương hiệu</label>
                <input
                  className="form-control"
                  type="text"
                  onChange={(e) =>
                    setBrand((brand) => {
                      return { ...brand, name: e.target.value };
                    })
                  }
                  value={brand.name}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Mô tả</label>
                <RichTextEditor
                  data={brand.description}
                  onChange={handleQuillEdit}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Trang web</label>
                <input
                  className="form-control"
                  type="text"
                  onChange={(e) =>
                    setBrand((brand) => {
                      return { ...brand, link: e.target.value };
                    })
                  }
                  value={brand.link}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Đường dẫn ảnh</label>
                <input
                  className="form-control"
                  type="text"
                  onChange={(e) =>
                    setBrand((brand) => {
                      return { ...brand, image: e.target.value };
                    })
                  }
                  value={brand.image}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Quốc gia</label>
                <input
                  className="form-control"
                  type="text"
                  onChange={(e) =>
                    setBrand((brand) => {
                      return { ...brand, country: e.target.value };
                    })
                  }
                  value={brand.country}
                />
              </div>

              <button
                className="btn btn-secondary py-2 px-3"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span
                    className="spinner-border me-2"
                    aria-hidden="true"
                  ></span>
                ) : (
                  <span role="status">
                    {brandId ? "Lưu các thay đổi" : "Thêm thương hiệu"}
                  </span>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminUpsertBrand;
