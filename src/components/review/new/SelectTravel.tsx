'use client';

import { useEffect, useRef, useState } from 'react';
import ArrowIcon from '@/assets/arrow_down.svg';
import CheckIcon from '@/assets/icon/review/check_16px.svg';
import useCreateReviewSelectTravel from '@/queries/review/useCreateReviewSelectTravel';
import { useInView } from 'react-intersection-observer';
import SpinnerIcon from '@/assets/spinner_round.svg';
import useCreateReviewStore from '@/store/useCreateReview';

const SelectTravel = ({ id, title }: { id?: number; title?: string }) => {
  const { ref, inView } = useInView();
  const { setTravelId, errorMessages } = useCreateReviewStore();
  const buttonRef = useRef<HTMLDivElement>(null);
  const [isListOpen, setIsListOpen] = useState(false);
  const [selectedTravel, setSelectedTravel] = useState({
    travelId: id || 0,
    travelName: title || '작성할 리뷰를 선택해 주세요.',
  });

  const {
    data: travels,
    isLoading,
    isFetching,
    isError,
    error,
    hasNextPage,
    fetchNextPage,
  } = useCreateReviewSelectTravel();

  const handleListOpen = () => {
    setIsListOpen((prev) => !prev);
  };

  const handleSelect = (travelId: number, travelName: string) => {
    setSelectedTravel({ travelId, travelName });
    setTravelId(travelId);
    setIsListOpen(false);
  };

  useEffect(() => {
    if (id) setTravelId(id);
  }, [id, setTravelId]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        buttonRef.current &&
        buttonRef.current.contains(event.target as Node)
      ) {
        return;
      }
      setIsListOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (inView && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage, isFetching]);

  if (isLoading) {
    return (
      <div className="flex h-5 w-5 flex-col items-center justify-center gap-5 p-8">
        로딩중
      </div>
    );
  }

  if (isError) return <div>에러{error?.message}</div>;

  if (travels?.pages[0].content.length === 0) {
    return <div key="no-travel">다녀온 여행이 없어요</div>;
  }

  return (
    <div className="mt-4">
      {errorMessages.travelId && selectedTravel.travelId === 0 && (
        <p className="body-3-r text-status-error">{errorMessages.travelId}</p>
      )}
      <section
        ref={buttonRef}
        className={`body-2-r relative flex h-[46px] items-center rounded border border-line-normal px-4 py-3 text-interaction-inactive ${errorMessages.travelId && selectedTravel.travelId === 0 && 'border-status-error'}`}
      >
        <button
          type="button"
          aria-label="리뷰를 작성할 여행 선택하기"
          onClick={handleListOpen}
          className={`${selectedTravel.travelId !== 0 && 'text-label-normal'} flex w-full cursor-pointer items-center justify-between`}
        >
          <span className="w-full overflow-hidden truncate text-start">
            {selectedTravel.travelName}
          </span>

          <ArrowIcon
            className={`${isListOpen ? 'rotate-180' : ''}`}
            aria-hidden="true"
          />
        </button>
        {isListOpen && (
          <div
            style={{ backdropFilter: 'none' }}
            className="absolute left-0 top-[52px] z-[60] flex max-h-36 w-full flex-col items-start justify-between rounded border border-line-normal bg-white backdrop-blur-0"
          >
            <span className="w-full overflow-y-scroll custom-scrollbar">
              {travels &&
                travels.pages.map((page) =>
                  page.content.map((travel) => (
                    <button
                      key={travel.travelId}
                      type="button"
                      aria-label={`${travel.travelName} 선택하기`}
                      onClick={() =>
                        handleSelect(travel.travelId, travel.travelName)
                      }
                      className="group flex max-h-16 w-full cursor-pointer items-center gap-1.5 px-3 py-1.5 text-interaction-inactive"
                    >
                      <CheckIcon
                        className={`${selectedTravel.travelId === travel.travelId ? 'visible' : 'invisible'}`}
                        aria-hidden="true"
                      />
                      <span
                        className={`w-[95%] overflow-hidden truncate group-hover:text-label-neutral ${selectedTravel.travelId === travel.travelId ? 'text-label-neutral' : ''}`}
                      >
                        {travel.travelName}
                      </span>
                    </button>
                  )),
                )}
              {hasNextPage ? (
                <div
                  ref={ref}
                  className="flex h-16 w-full justify-center p-5"
                  aria-label="리뷰를 불러오는 중입니다."
                >
                  <SpinnerIcon className="animate-spin" />
                </div>
              ) : (
                <div aria-label="마지막 리스트 입니다" />
              )}
            </span>
          </div>
        )}
      </section>
    </div>
  );
};

export default SelectTravel;
