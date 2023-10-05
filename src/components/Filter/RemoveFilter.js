import { useSearchParams } from "react-router-dom";

function RemoveFilter() {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <div className="remove-filter">
      <a
        type="button"
        className="btn btn-danger px-4"
        onClick={(e) => {
          e.preventDefault();
          setSearchParams();
        }}
      >
        <i className="fa-solid fa-filter-circle-xmark me-2"></i>
        Loại bỏ bộ lọc
      </a>
    </div>
  );
}

export default RemoveFilter;
