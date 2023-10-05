import { useSearchParams } from "react-router-dom";

function Pagination({ pageData }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const liList = [];
  for (let i = 1; i <= pageData?.totalPages; i++) {
    liList.push(
      <li
        key={i}
        className={`page-item ${pageData?.number + 1 == i ? "active" : ""}`}
      >
        <a
          className="page-link cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            searchParams.set("page", `${i}`);
            setSearchParams(searchParams);
          }}
        >
          {i}
        </a>
      </li>
    );
  }

  return (
    <nav>
      <ul className="pagination">
        <li className={`page-item ${pageData?.first ? "disabled" : ""} `}>
          <a
            className="page-link cursor-pointer px-3"
            onClick={(e) => {
              e.preventDefault();
              searchParams.set("page", `${pageData?.number}`);
              setSearchParams(searchParams);
            }}
          >
            Trước
          </a>
        </li>

        {liList}

        <li className={`page-item ${pageData?.last ? "disabled" : ""}`}>
          <a
            className="page-link cursor-pointer px-3"
            onClick={(e) => {
              e.preventDefault();
              searchParams.set("page", `${pageData?.number + 2}`);
              setSearchParams(searchParams);
            }}
          >
            Sau
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
