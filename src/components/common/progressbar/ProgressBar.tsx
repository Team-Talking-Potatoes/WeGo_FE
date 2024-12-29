const ProgressBar = ({ progressRate }: { progressRate: number }) => {
  return (
    <div className="caption-1-sb flex items-center gap-2.5 text-primary-normal">
      <div className="relative h-[6px] w-full overflow-hidden rounded-[10px] bg-slate-200">
        <div
          className="absolute bottom-0 left-0 top-0 rounded-full bg-primary-normal"
          style={{ width: `${progressRate}%` }}
        />
      </div>
      <span>{progressRate}%</span>
    </div>
  );
};
export default ProgressBar;
