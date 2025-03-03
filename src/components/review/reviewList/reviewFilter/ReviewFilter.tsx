'use client';

import { useReviewStore } from '@/store/useReviewStore';
import cn from '@/utils/cn';

const ReviewFilter = () => {
  const sortOrder = useReviewStore((state) => state.filters.sortOrder);
  const setFilters = useReviewStore((state) => state.setFilters);

  const handleSortOrder = (value: 'LATEST' | 'POPULAR') => {
    setFilters({ sortOrder: value, pageParam: 0, size: 12 });
  };

  return (
    <nav>
      <ul className="flex items-center justify-start divide-x divide-line-normal">
        <li
          className={cn('body-2-r pr-2 text-label-alternative', {
            'body-2-sb text-label-normal': sortOrder === 'LATEST',
          })}
        >
          <button
            type="button"
            disabled={sortOrder === 'LATEST'}
            onClick={() => handleSortOrder('LATEST')}
          >
            최근
          </button>
        </li>
        <li
          className={cn('body-2-r pl-2 text-label-alternative', {
            'body-2-sb text-label-normal': sortOrder === 'POPULAR',
          })}
        >
          <button
            type="button"
            disabled={sortOrder === 'POPULAR'}
            onClick={() => handleSortOrder('POPULAR')}
          >
            인기
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default ReviewFilter;
