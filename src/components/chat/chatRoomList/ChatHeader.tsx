'use client';

import { useState, useRef, useEffect } from 'react';
import Filter from '@/assets/filter.svg';
import cn from '@/utils/cn';
import { SortType } from '@/@types/chat';
import { CHAT_SORT_OPTIONS } from '@/constants/chat';

interface Props {
  onSortChange: (sort: SortType) => void;
  sortBy: SortType;
}

const ChatHeader = ({ onSortChange, sortBy }: Props) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="flex h-[60px] items-center justify-between border-b border-gray-300 px-5 pb-[13px] pt-3.5">
      <h1 className="title-3-b">채팅</h1>
      <div className="relative flex items-center" ref={dropdownRef}>
        <button
          type="button"
          className="text-gray-600 hover:text-black"
          onClick={() => setDropdownOpen(!isDropdownOpen)}
          aria-expanded={isDropdownOpen}
        >
          <Filter />
        </button>
        {isDropdownOpen && (
          <ul className="absolute right-0 top-[38px] z-50 mt-1.5 rounded bg-primary-white shadow-custom">
            {Object.keys(CHAT_SORT_OPTIONS).map((option) => (
              <li key={option}>
                <button
                  type="button"
                  className={cn(
                    'body-2-m flex w-[90px] cursor-pointer items-center justify-center border-b border-line-normal py-[9px] text-label-alternative transition-all duration-300 last:border-0 hover:bg-gray-100',
                    {
                      'body-2-sb text-label-normal': sortBy === option,
                    },
                  )}
                  onClick={() => {
                    onSortChange(option as SortType);
                    setDropdownOpen(false);
                  }}
                >
                  {CHAT_SORT_OPTIONS[option as SortType]}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </header>
  );
};
export default ChatHeader;
