import cn from '@/utils/cn';

interface Props {
  className?: string;
  classNameCondition?: string;
}

const Skeleton = ({ className, classNameCondition }: Props) => {
  return (
    <div className={cn('skeleton-style', className, classNameCondition)} />
  );
};

export default Skeleton;
