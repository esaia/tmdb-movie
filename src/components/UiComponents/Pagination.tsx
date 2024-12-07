import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import React from 'react';

const Pagination = ({ total = 1 }: { total?: number }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const MAX_PAGES_DISPLAYED = () => {
    if (window.innerWidth < 768) {
      return 1;
    } else {
      return 5;
    }
  };

  // const MAX_PAGES_DISPLAYED = 1;

  return (
    <div>
      <nav aria-label="Page navigation example">
        <ul className="inline-flex space-x-3 text-sm">
          <li>
            <Link
              href={currentPage === 1 ? '#' : `${pathname}?page=${currentPage - 1}`}
              className="ms-0 flex h-8 items-center justify-center rounded-md bg-primary px-3 leading-tight text-gray-400 hover:bg-gray-700 hover:text-white"
            >
              უკან
            </Link>
          </li>

          {total > MAX_PAGES_DISPLAYED() && currentPage > Math.floor(MAX_PAGES_DISPLAYED() / 2) && (
            <li>
              <span className="hidden h-8 items-center justify-center rounded-md bg-primaryBlack px-3 leading-tight text-gray-400 md:flex">
                ...
              </span>
            </li>
          )}

          {new Array(total).fill(total).map((_, i) => {
            const pageNumber = i + 1;
            if (
              total > MAX_PAGES_DISPLAYED() &&
              (pageNumber < currentPage - Math.floor(MAX_PAGES_DISPLAYED() / 2) ||
                pageNumber > currentPage + Math.floor(MAX_PAGES_DISPLAYED() / 2))
            ) {
              return null;
            }
            return (
              <li key={i}>
                <Link
                  href={`${pathname}?page=${pageNumber}`}
                  className={`flex h-8 items-center justify-center rounded-md border-[1px] border-transparent px-3 leading-tight text-gray-400 hover:bg-gray-700 hover:text-white ${
                    currentPage === pageNumber ? 'border-secondary/5n0 bg-primaryBlack' : 'bg-primary'
                  }`}
                >
                  {pageNumber}
                </Link>
              </li>
            );
          })}

          {total > MAX_PAGES_DISPLAYED() && currentPage < total - Math.floor(MAX_PAGES_DISPLAYED() / 2) && (
            <li>
              <span className="hidden h-8 items-center justify-center rounded-md bg-primaryBlack px-3 leading-tight text-gray-400 md:flex">
                ...
              </span>
            </li>
          )}

          <li>
            <Link
              href={currentPage === total ? '#' : `${pathname}?page=${currentPage + 1}`}
              className="flex h-8 items-center justify-center rounded-md bg-primary px-3 leading-tight text-gray-400 hover:bg-gray-700 hover:text-white"
            >
              წინ
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
