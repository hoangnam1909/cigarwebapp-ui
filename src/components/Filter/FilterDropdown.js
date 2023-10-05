import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

function FilterDropdown({
  filterList,
  filterName,
  displayKey,
  filterKey,
  valueKey,
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentValue, setCurrentValue] = useState(filterName);

  useEffect(() => {
    if (searchParams.get(filterKey) == null) setCurrentValue(filterName);
  }, [searchParams]);

  return (
    <div className="dropdown">
      <button
        className="btn btn-outline-dark dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {currentValue}
      </button>
      <ul className="dropdown-menu">
        <li
          className="dropdown-item cursor-pointer"
          onClick={() => {
            searchParams.delete("page");
            searchParams.delete(filterKey);
            setSearchParams(searchParams);
            setCurrentValue(currentValue);
          }}
        >
          Không chọn
        </li>

        <li>
          <hr className="dropdown-divider" />
        </li>

        {filterList?.map((filter, index) => {
          return (
            <li
              key={index}
              className="dropdown-item cursor-pointer"
              onClick={() => {
                searchParams.delete("page");
                searchParams.set(`${filterKey}`, `${filter[valueKey]}`);
                setSearchParams(searchParams);
                setCurrentValue(filter[displayKey]);
              }}
            >
              {filter[displayKey]}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default FilterDropdown;
