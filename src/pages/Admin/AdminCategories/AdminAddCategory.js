import { useState } from "react";
import { toast } from "react-toastify";
import categoryAPI from "~/apis/categoryAPI/categoryAPI";

function AdminAddCategory() {
  const [category, setCategory] = useState({
    name: "",
  });

  const initialValue = () => {
    setCategory({
      name: "",
    });
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    const res = await categoryAPI.addCategory(category);
    if (res.status === 200) {
      initialValue();
      toast.success("Thêm danh mục thành công");
    }
  };

  return (
    <>
      <div className="mt-1">
        <h3 className="mt-2 mb-4 text-gray-800">Thêm danh mục</h3>
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmitForm}>
              <div className="mb-3">
                <label className="form-label">Tên danh mục</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Nhập tên danh mục..."
                  onChange={(e) =>
                    setCategory((category) => {
                      return { ...category, name: e.target.value };
                    })
                  }
                  value={category.name}
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

export default AdminAddCategory;
