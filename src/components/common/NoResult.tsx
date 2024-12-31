import BlankIcon from '@/assets/blank.svg';

const NoResult = ({ label, height }: { label: string; height?: string }) => {
  return (
    <div
      className={`heading-1-sb mx-auto flex w-full flex-col items-center justify-center gap-4 text-label-alternative ${height}`}
    >
      <BlankIcon />
      <div>{label}</div>
    </div>
  );
};

export default NoResult;
