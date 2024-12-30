const TravelCardBigSkeleton = () => {
  return (
    <div className="flex w-[335px] flex-col justify-center gap-5 rounded border">
      <div className="h-[140px] w-full bg-gray-200" />
      <div className="flex flex-col gap-1.5 px-4 pb-4">
        <div className="h-[22px] w-[47px] rounded-[20px] bg-gray-200" />
        <div className="h-[24px] w-full rounded bg-gray-200" />
        <div className="flex w-full flex-col gap-[18px]">
          <div className="h-[20px] rounded bg-gray-200" />
          <div className="h-1.5 rounded-[10px] bg-gray-200" />
        </div>
      </div>
    </div>
  );
};

export default TravelCardBigSkeleton;
