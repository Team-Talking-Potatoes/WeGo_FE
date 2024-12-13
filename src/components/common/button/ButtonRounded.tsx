import cn from '@/utils/cn';
import { cva, VariantProps } from 'class-variance-authority';

const ButtonRoundedVariants = cva(
  ' inline-block px-3 py-1 body-2-m bg-label-normal text-primary-white rounded-[44px]',
  {
    variants: {
      type: {
        profileEdit:
          'py-1.5 border border-line-normal text-label-alternative bg-transparent',
      },
    },
  },
);

interface Props extends VariantProps<typeof ButtonRoundedVariants> {
  label: string;
  className?: string;
  classNameCondition?: Record<string, boolean>;
}

const ButtonRounded = ({
  label,
  type,
  className,
  classNameCondition,
}: Props) => {
  return (
    <button
      type="button"
      className={cn(
        ButtonRoundedVariants({ type }),
        className,
        classNameCondition,
      )}
    >
      {label}
    </button>
  );
};

export default ButtonRounded;
