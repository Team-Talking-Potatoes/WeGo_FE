import cn from '@/utils/cn';

interface Props {
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
  classNameCondition?: Record<string, boolean>;
  onClick?: () => void;
}

const PaginationButton = ({
  children,
  className,
  classNameCondition,
  disabled,
  onClick,
}: Props) => {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={cn(
        'flex h-10 w-10 items-center justify-center rounded border disabled:fill-label-alternative',
        className,
        classNameCondition,
      )}
    >
      {children}
    </button>
  );
};

export default PaginationButton;
