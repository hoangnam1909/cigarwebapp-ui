import { useSearchParams } from "react-router-dom";

function Pagination({ pageData }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = pageData?.number + 1;
  const totalPages = pageData?.totalPages;

  const liList = [];

  if (totalPages >= 5) {
    if (currentPage <= 3) {
      for (let i = 1; i <= 4; i++) {
        liList.push(
          <li
            key={i}
            className={`page-item ${currentPage == i ? "active" : ""}`}
          >
            <a
              className="page-link rounded cursor-pointer"
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

      liList.push(
        <>
          <li className="page-item">
            <a
              className="page-link rounded cursor-pointer disabled"
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              ...
            </a>
          </li>
          <li className="page-item">
            <a
              className="page-link rounded cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                searchParams.set("page", `${totalPages}`);
                setSearchParams(searchParams);
              }}
            >
              {totalPages}
            </a>
          </li>
        </>
      );
    } else if (currentPage > totalPages - 3) {
      liList.push(
        <>
          <li className="page-item">
            <a
              className="page-link rounded cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                searchParams.set("page", "1");
                setSearchParams(searchParams);
              }}
            >
              1
            </a>
          </li>
          <li className="page-item">
            <a
              className="page-link rounded cursor-pointer disabled"
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              ...
            </a>
          </li>
        </>
      );

      for (let i = totalPages - 3; i <= totalPages; i++) {
        liList.push(
          <li
            key={i}
            className={`page-item ${currentPage == i ? "active" : ""}`}
          >
            <a
              className="page-link rounded cursor-pointer"
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
    } else {
      liList.push(
        <>
          <li className="page-item">
            <a
              className="page-link rounded cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                searchParams.set("page", "1");
                setSearchParams(searchParams);
              }}
            >
              1
            </a>
          </li>
          <li className="page-item">
            <a
              className="page-link rounded cursor-pointer disabled"
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              ...
            </a>
          </li>
        </>
      );

      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        liList.push(
          <li
            key={i}
            className={`page-item ${currentPage == i ? "active" : ""}`}
          >
            <a
              className="page-link rounded cursor-pointer"
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

      liList.push(
        <>
          <li className="page-item">
            <a
              className="page-link rounded cursor-pointer disabled"
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              ...
            </a>
          </li>
          <li className="page-item">
            <a
              className="page-link rounded cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                searchParams.set("page", `${totalPages}`);
                setSearchParams(searchParams);
              }}
            >
              {totalPages}
            </a>
          </li>
        </>
      );
    }
  } else {
    for (let i = 1; i <= totalPages; i++) {
      liList.push(
        <li key={i} className={`page-item ${currentPage == i ? "active" : ""}`}>
          <a
            className="page-link rounded cursor-pointer"
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
  }

  return (
    <nav>
      <ul className="pagination">
        <li className="page-item me-2">
          <a
            className="btn btn-outline-primary rounded cursor-pointer px-3"
            onClick={(e) => {
              e.preventDefault();
              if (!pageData?.first) {
                searchParams.set("page", `${currentPage - 1}`);
                setSearchParams(searchParams);
              }
            }}
          >
            <i className="fa-solid fa-chevron-left"></i>
          </a>
        </li>

        <div className="bg-light d-flex justify-content-between gap-2 rounded">
          {liList}
        </div>

        <li className="page-item ms-2">
          <a
            className="btn btn-outline-primary rounded cursor-pointer px-3"
            onClick={(e) => {
              e.preventDefault();
              if (!pageData?.last) {
                searchParams.set("page", `${currentPage + 1}`);
                setSearchParams(searchParams);
              }
            }}
          >
            <i className="fa-solid fa-chevron-right"></i>
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
