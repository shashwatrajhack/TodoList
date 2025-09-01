import React from "react";

const Pagination = ({ total, page, setPage, perPage, setPerPage }) => {
  const pages = Math.ceil(total / perPage);
  return (
    <div className="pagination">
      <button disabled={page === 1} onClick={() => setPage(page - 1)}>Prev</button>
      <span>Page {page} of {pages}</span>
      <button disabled={page === pages} onClick={() => setPage(page + 1)}>Next</button>
      <select value={perPage} onChange={e => { setPerPage(Number(e.target.value)); setPage(1); }}>
        <option value={3}>3</option>
        <option value={5}>5</option>
        <option value={10}>10</option>
      </select>
    </div>
  );
};

export default Pagination;
