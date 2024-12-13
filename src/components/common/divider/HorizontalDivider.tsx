import cn from '@/utils/cn';

interface Props {
  className?: string;
}

const HorizontalDivider = ({ className }: Props) => {
  return <div className={cn('h-[1px] w-full bg-line-normal', className)} />;
};

export default HorizontalDivider;
