import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

function FilterText({ filterName, filterKey }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [displayValue, setDisplayValue] = useState("");

  useEffect(() => {
    if (searchParams.get(filterKey) == null) setDisplayValue("");
  }, [searchParams]);

  return (
    <div className="filter-text">
      <input
        type="text"
        className="form-control"
        placeholder={filterName}
        value={displayValue}
        onChange={(e) => {
          setDisplayValue(e.target.value);

          setTimeout(function () {
            searchParams.delete("page");
            if (e.target.value.length == 0) {
              searchParams.delete(filterKey);
              setSearchParams(searchParams);
            } else {
              searchParams.set(filterKey, `${e.target.value}`);
              setSearchParams(searchParams);
            }
          }, 400);
        }}
      />
    </div>
  );
}

export default FilterText;
