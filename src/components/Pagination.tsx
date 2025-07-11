import React from "react";
import {
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight,
} from "react-icons/fi";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const MAX_PAGE = 250;

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const effectiveTotal = Math.min(totalPages, MAX_PAGE);

  const getPageItems = () => {
    const pages: (number | "...")[] = [];
    if (effectiveTotal <= 5) {
      for (let i = 1; i <= effectiveTotal; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", effectiveTotal);
      } else if (currentPage >= effectiveTotal - 2) {
        pages.push(
          1,
          "...",
          effectiveTotal - 3,
          effectiveTotal - 2,
          effectiveTotal - 1,
          effectiveTotal
        );
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          effectiveTotal
        );
      }
    }
    return pages;
  };

  const pageItems = getPageItems();
  const btnBase =
    "p-2 rounded-full transition focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:opacity-50 disabled:cursor-not-allowed";

  return (
    <nav
      aria-label="Paginación"
      className="mt-6 flex justify-end items-center space-x-2"
    >
      <button
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className={`${btnBase} bg-gray-100 text-gray-600 hover:bg-blue-100`}
        aria-label="Primera página"
      >
        <FiChevronsLeft size={18} />
      </button>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`${btnBase} bg-gray-100 text-gray-600 hover:bg-blue-100`}
        aria-label="Página anterior"
      >
        <FiChevronLeft size={18} />
      </button>
      <ul className="flex items-center space-x-1">
        {pageItems.map((item, idx) =>
          item === "..." ? (
            <li key={idx} className="px-2 text-gray-500 select-none">
              …
            </li>
          ) : (
            <li key={item}>
              <button
                onClick={() => onPageChange(item as number)}
                className={`w-8 h-8 flex items-center justify-center text-sm font-medium rounded-full transition focus:outline-none focus:ring-2 focus:ring-blue-300 ${
                  item === currentPage
                    ? "bg-blue-500 text-white"
                    : "bg-gray-50 text-gray-700 hover:bg-blue-50"
                }`}
                aria-current={item === currentPage ? "page" : undefined}
              >
                {item}
              </button>
            </li>
          )
        )}
      </ul>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === effectiveTotal}
        className={`${btnBase} bg-gray-100 text-gray-600 hover:bg-blue-100`}
        aria-label="Página siguiente"
      >
        <FiChevronRight size={18} />
      </button>
      <button
        onClick={() => onPageChange(effectiveTotal)}
        disabled={currentPage === effectiveTotal}
        className={`${btnBase} bg-gray-100 text-gray-600 hover:bg-blue-100`}
        aria-label="Última página"
      >
        <FiChevronsRight size={18} />
      </button>
    </nav>
  );
};

export default Pagination;
