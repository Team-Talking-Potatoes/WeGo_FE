/* eslint-disable react/no-array-index-key */
import Skeleton from '@/components/common/skeleton/Skeleton';

const ChatRoomListSkeleton = () => {
  return (
    <ul className="static h-[calc(100vh-140px)] overflow-y-auto custom-scrollbar">
      {Array.from({ length: 4 }).map((_, index) => (
        <li key={index} className="relative border-b border-line-neutral p-5">
          <div className="flex w-full items-start">
            <Skeleton className="mr-2.5 h-[54px] w-[54px] shrink-0 overflow-hidden rounded-full" />
            <div className="mr-[60px] flex-1">
              <Skeleton className="mb-2 h-[22px] w-full truncate rounded" />
              <Skeleton className="h-[22px] w-full truncate rounded" />
            </div>
          </div>
          <Skeleton className="absolute right-10 top-[23px] h-4 w-8 rounded-[14px]" />
        </li>
      ))}
    </ul>
  );
};

export default ChatRoomListSkeleton;
