'use client';

import ArrowLeft from '@/assets/icon/arrow/arrow_left_24px.svg';
import ArrowRight from '@/assets/icon/arrow/arrow_right_24px.svg';
import { useState, useEffect } from 'react';
import PaginationButton from './button/PaginationButton';

interface Props {
  totalPages: number;
  currentPage: number;
  paginate: (pageNumber: number) => void;
}

const Pagination = ({ totalPages, currentPage, paginate }: Props) => {
  function getGroupSize() {
    const md = document.querySelector('.md\\:block');
    const xl = document.querySelector('.xl\\:block');

    if ((xl as HTMLElement)?.offsetParent) return 10;
    if ((md as HTMLElement)?.offsetParent) return 6;
    return 4;
  }

  const [groupSize, setGroupSize] = useState(getGroupSize());

  useEffect(() => {
    const handleResize = () => {
      setGroupSize(getGroupSize());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getVisiblePageNumbers = () => {
    const currentGroup = Math.floor((currentPage - 1) / groupSize);
    const start = currentGroup * groupSize + 1;
    const end = Math.min(start + groupSize - 1, totalPages);

    const pageNumbers = [];
    for (let i = start; i <= end; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  const handleNext = () => {
    const currentGroup = Math.floor((currentPage - 1) / 4);
    const currentGroupLastPage = (currentGroup + 1) * 4;

    if (currentPage === currentGroupLastPage && currentPage < totalPages) {
      // 현재 그룹의 마지막 페이지일 경우 다음 그룹의 첫 페이지로
      paginate(currentPage + 1);
    } else if (currentPage < totalPages) {
      // 그 외의 경우 다음 페이지로
      paginate(currentPage + 1);
    }
  };

  const handlePrev = () => {
    const currentGroup = Math.floor((currentPage - 1) / 4);
    const currentGroupFirstPage = currentGroup * 4 + 1;

    if (currentPage === currentGroupFirstPage && currentPage > 1) {
      // 현재 그룹의 첫 페이지일 경우 이전 그룹의 마지막 페이지로
      paginate(currentPage - 1);
    } else if (currentPage > 1) {
      // 그 외의 경우 이전 페이지로
      paginate(currentPage - 1);
    }
  };

  return (
    <nav
      className="mt-8 flex w-full justify-center xl:mt-14"
      data-testid="mypage-pagination"
    >
      <div className="hidden md:block" />
      <div className="hidden xl:block" />

      <PaginationButton
        className="mr-4"
        disabled={currentPage === 1}
        onClick={handlePrev}
      >
        <ArrowLeft fill="label-normal" />
      </PaginationButton>

      <ul className="body-2-sb inline-flex gap-4 -space-x-px">
        {getVisiblePageNumbers().map((number) => (
          <li key={number}>
            <PaginationButton
              className="border-line-neutral text-label-alternative"
              classNameCondition={{
                'border-primary-normal bg-blue-100 text-primary-normal':
                  number === currentPage,
              }}
              onClick={() => paginate(number)}
            >
              {number}
            </PaginationButton>
          </li>
        ))}
      </ul>

      <PaginationButton
        className="ml-4"
        disabled={currentPage === totalPages}
        onClick={handleNext}
      >
        <ArrowRight fill="label-normal" />
      </PaginationButton>
    </nav>
  );
};

export default Pagination;
