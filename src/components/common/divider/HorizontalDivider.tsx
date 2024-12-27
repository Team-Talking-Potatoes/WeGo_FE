import cn from '@/utils/cn';

interface Props {
  className?: string;
  classNameCondition?: Record<string, boolean>;
}

const HorizontalDivider = ({ className, classNameCondition }: Props) => {
  return (
    <div
      className={cn(
        'h-[1px] w-full max-w-[1400px] bg-line-normal',
        className,
        classNameCondition,
      )}
    />
  );
};

export default HorizontalDivider;
