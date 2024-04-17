import React from 'react';

const Pagination = ({ currentPage, setCurrentPage, itemsPerPage, setItemsPerPage, totalResults }) => {
  const totalPages = Math.ceil(totalResults / itemsPerPage);
  if (totalPages === 0) {
    return null;
  }
  return (
    <div>
      <div>
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Previous
        </button>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
      <div>
        <label>
          Items per page:
          <input
            type="number"
            value={itemsPerPage}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              if (value <= 10) {
                setItemsPerPage(value);
              } else {
                alert('You can only select up to 10 items per page.');
              }
            }}
            min={1}
            max={10}
          />
        </label>
      </div>
    </div>
  );
};

export default Pagination;
