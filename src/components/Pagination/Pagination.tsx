import { Icon } from "@iconify/react/dist/iconify.js";

interface PaginationProp {
  currentPage: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  handlePageChange,
}: PaginationProp) => {
  return (
    <div className="pagination">
      <div className="button">
        <button
          className="pagination-btn"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <Icon icon="iconamoon:arrow-left-2-bold" />
        </button>
        <span>
          {currentPage} of {totalPages}
        </span>
        <button
          className="pagination-btn"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <Icon icon="iconamoon:arrow-right-2-bold" />
        </button>
      </div>
    </div>
  );
};
export default Pagination;
