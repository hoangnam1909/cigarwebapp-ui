import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import categoryAPI from "~/apis/categoryAPI/categoryAPI";

function AdminUpsertCategory() {
  const { categoryId } = useParams();

  document.title = `${
    categoryId == null ? "Thêm danh mục" : "Chỉnh sửa danh mục"
  }`;

  const [reloadFlag, setReloadFlag] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [category, setCategory] = useState({
    name: "",
  });

  const initialValue = () => {
    setCategory({
      ...category,
      name: "",
    });
  };

  const getCategory = async () => {
    const res = await categoryAPI.getCategory(categoryId);
    if (res.status === 200) {
      const categoryData = res.data.result;
      setCategory({
        ...category,
        name: categoryData.name,
      });
    }
  };

  useEffect(() => {
    if (categoryId != null) getCategory();
  }, [reloadFlag]);

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (categoryId == null) {
      const res = await categoryAPI.addCategory(category);
      if (res.status == 200) {
        toast.success("Thêm danh mục thành công.");
        initialValue();
      }
    } else {
      const res = await categoryAPI.updateCategory(categoryId, category);
      if (res.status == 200) {
        setReloadFlag(!reloadFlag);
        toast.success("Chỉnh sửa thông tin danh mục thành công.");
        getCategory();
      }
    }

    setIsLoading(false);
  };

  return (
    <>
      <div className="mt-1">
        <h3 className="mb-4 text-gray-800">
          {categoryId == null
            ? "Thêm danh mục"
            : "Chỉnh sửa thông tin danh mục"}
        </h3>

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
                    {categoryId ? "Lưu các thay đổi" : "Thêm danh mục"}
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

export default AdminUpsertCategory;
