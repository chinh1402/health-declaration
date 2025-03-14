import React from "react";

type PageNavProps = {
  pagination: {
    active: number;
    itemPerPage: number;
    totalPage: number;
  };
  setPagination: React.Dispatch<React.SetStateAction<any>>;
};

const PageNavigation = ({ pagination, setPagination }: PageNavProps) => {
  const { active, totalPage } = pagination;

  const handlePageClick = (page: number) => {
    setPagination({
      ...pagination,
      active: page,
    });
  };

  const handlePrevous = () => {
    setPagination({
      ...pagination,
      active: pagination.active - 1 < 1 ? 1 : pagination.active - 1,
    });
  };

  const handleNext = () => {
    setPagination({
      ...pagination,
      active:
        pagination.active + 1 > pagination.totalPage
          ? pagination.totalPage
          : pagination.active + 1,
    });
  };

  const generatePageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPage <= 7) {
      for (let i = 1; i <= totalPage; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (active > 4) {
        pages.push("...");
      }

      const start = Math.max(2, active - 1);
      const end = Math.min(totalPage - 1, active + 1);
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (active < totalPage - 3) {
        pages.push("...");
      }

      pages.push(totalPage);
    }

    return pages;
  };

  const pages = generatePageNumbers();

  return (
    <nav aria-label="Page navigation">
      <ul className="pagination justify-content-end m-0" style={{ cursor: "pointer" }}>
        <li key={0} className={`page-item ${pagination.active === 1 ? "disabled" : ""}`}>
          <div className="page-link" aria-disabled="true" onClick={handlePrevous}>
            Previous
          </div>
        </li>
        {pages.map((page, index) =>
          page === "..." ? (
            <li key={`ellipsis-${index}`} className="page-item disabled">
              <span className="page-link">...</span>
            </li>
          ) : (
            <li
              key={page}
              className={`page-item ${active === page ? "active" : ""}`}
            >
              <div
                className="page-link"
                onClick={() => typeof page === "number" && handlePageClick(page)}
              >
                {page}
              </div>
            </li>
          )
        )}
        <li key={pagination.totalPage + 1} className={`page-item ${pagination.active === pagination.totalPage ? "disabled" : ""}`}>
          <div className="page-link" onClick={handleNext}>Next</div>
        </li>
      </ul>
    </nav>
  );
};

export default PageNavigation;
