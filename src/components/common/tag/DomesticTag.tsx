const DomesticTag = ({ isDomestic }: { isDomestic: boolean }) => {
  return (
    <div className="caption-1-sb w-fit rounded-[20px] bg-blue-100 px-[6px] py-[3px] text-primary-normal">
      {isDomestic ? '국내여행' : '해외여행'}
    </div>
  );
};

export default DomesticTag;
