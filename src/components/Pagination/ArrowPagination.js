import { useSearchParams } from "react-router-dom";

function ArrowPagination({ pageData }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = pageData?.number + 1;
  const totalPages = pageData?.totalPages;

  return (
    <nav className="d-flex gap-4 mb-3">
      <h5 className="mb-0 align-self-center">
        <span className="text-primary">{currentPage}</span>
        {"/"}
        {totalPages}
      </h5>

      <ul className="pagination mb-0">
        <li className={`page-item ${pageData?.first ? "disabled" : ""} `}>
          <a
            className="page-link cursor-pointer px-3"
            onClick={(e) => {
              e.preventDefault();
              searchParams.set("page", `${pageData?.number}`);
              setSearchParams(searchParams);
            }}
          >
            <i className="fa-solid fa-chevron-left"></i>
          </a>
        </li>

        <li className={`page-item ${pageData?.last ? "disabled" : ""}`}>
          <a
            className="page-link cursor-pointer px-3"
            onClick={(e) => {
              e.preventDefault();
              searchParams.set("page", `${pageData?.number + 2}`);
              setSearchParams(searchParams);
            }}
          >
            <i className="fa-solid fa-chevron-right"></i>
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default ArrowPagination;
