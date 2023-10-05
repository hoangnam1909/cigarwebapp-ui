import { useState } from "react";
import { toast } from "react-toastify";
import brandAPI from "~/apis/brandAPI/brandAPI";

function AdminAddBrand() {
  const [brand, setBrand] = useState({
    name: "",
  });

  const initialValue = () => {
    setBrand({
      name: "",
    });
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    const res = await brandAPI.addBrand(brand);
    if (res.status === 200) {
      initialValue();
      toast.success("Thêm thương hiệu thành công");
    }
  };

  return (
    <>
      <div className="mt-1">
        <h3 className="mt-2 mb-4 text-gray-800">Thêm thương hiệu</h3>

        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmitForm}>
              <div className="mb-3">
                <label className="form-label">Tên thương hiệu</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Nhập tên thương hiệu..."
                  onChange={(e) =>
                    setBrand((brand) => {
                      return { ...brand, name: e.target.value };
                    })
                  }
                  value={brand.name}
                />
              </div>

              <div className="text-center">
                <button className="btn btn-secondary w-50 my-2" type="submit">
                  Xác nhận
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminAddBrand;
