import React from 'react';
import styles from './Pagination.module.scss';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, setCurrentPage }) => {
  const pageNumbers = [];
  const maxPagesToShow = 10;
  const maxPagesBeforeCurrentPage = Math.floor(maxPagesToShow / 2);
  const maxPagesAfterCurrentPage = Math.ceil(maxPagesToShow / 2) - 1;

  let startPage = Math.max(currentPage - maxPagesBeforeCurrentPage, 1);
  let endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);

  if (endPage - startPage < maxPagesToShow - 1) {
    startPage = Math.max(endPage - maxPagesToShow + 1, 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  for (let i = 1; i <= totalPages; i++) {
    if (totalPages <= 10 || i === 1 || i === totalPages || Math.abs(currentPage - i) < 2) {
      pageNumbers.push(i);
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <ul className={styles.pagination}>
      <li className={currentPage === 1 ? styles.disabled : ''}>
        <button onClick={handlePrevPage}>
          <svg
            className={currentPage === 1 ? styles.arrow_disabled : styles.arrow}
            width="38"
            height="42"
            viewBox="0 0 38 42"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M23.12 31.5599L14.4267 22.8666C13.4 21.8399 13.4 20.1599 14.4267 19.1333L23.12 10.4399"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </li>
      {startPage > 1 && (
        <li>
          <span>...</span>
        </li>
      )}
      {pageNumbers.map((number) => (
        <li key={number} className={number === currentPage ? styles.active : ''}>
          <button
            onClick={() => setCurrentPage(number)}
            style={{ color: number === currentPage ? 'white' : 'inherit' }}
          >
            {number}
          </button>
        </li>
      ))}
      {endPage < totalPages && (
        <li>
          <span>...</span>
        </li>
      )}
      <li className={currentPage === totalPages ? styles.disabled : ''}>
        <button onClick={handleNextPage}>
          <svg
            className={currentPage === totalPages ? styles.arrow_disabled : styles.arrow}
            width="38"
            height="42"
            viewBox="0 0 38 42"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.88 31.5599L23.5733 22.8666C24.6 21.8399 24.6 20.1599 23.5733 19.1333L14.88 10.4399"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </li>
    </ul>
  );
};

export default Pagination;
