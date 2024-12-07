const TravelTag = ({ label }: { label: string }) => {
  return (
    <div className="caption-1-sb inline-block rounded-[20px] py-[3px] pl-2 pr-1.5 text-slate-500">
      # {label}
    </div>
  );
};

export default TravelTag;
