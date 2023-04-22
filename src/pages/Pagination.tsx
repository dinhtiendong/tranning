import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useMemo, useState } from "react";
function Pagination({
  currentPage,
  totalPage,
  setCurrentPage,
  onChangePage,
}: {
  currentPage: number;
  totalPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  handlePageChange: Function;
}) {
  // const [index, setIndex] = useState(currentPage);

  const handleClickPaginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <a
              href="#"
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <ChevronLeftIcon
                className={`h-5 w-5 ${
                  currentPage === 1
                    ? "opacity-20 cursor-not-allowed"
                    : "opacity-1"
                }`}
                aria-hidden="true"
                onClick={(e) => {
                  if (currentPage !== 1) {
                    setCurrentPage(currentPage - 1);
                    onChangePage(currentPage - 2);
                  } else {
                    e.preventDefault;
                  }
                }}
              />
            </a>

            {Array.from(new Array(totalPage)).map((item: number, i: number) => (
              <a
                key={i}
                href="#"
                aria-current="page"
                className={`relative z-10 inline-flex items-center ${
                  i + 1 === currentPage ? "bg-indigo-600" : "bg-black"
                }  px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                onClick={() => {
                  handleClickPaginate(i + 1);
                  onChangePage(i);
                }}
              >
                {i + 1}
              </a>
            ))}

            <a
              href="#"
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <ChevronRightIcon
                className={`h-5 w-5 ${
                  currentPage === totalPage
                    ? "opacity-20 cursor-not-allowed"
                    : "opacity-1"
                }`}
                aria-hidden="true"
                onClick={(e) => {
                  if (currentPage !== totalPage) {
                    setCurrentPage(currentPage + 1);
                    onChangePage(currentPage);
                  } else {
                    e.preventDefault;
                  }
                }}
              />
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Pagination;
