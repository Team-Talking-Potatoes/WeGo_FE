import cn from '@/utils/cn';
import { cva, VariantProps } from 'class-variance-authority';

const ButtonRoundedVariants = cva(
  'body-2-m inline-block px-3 py-1 border border-label-normal bg-label-normal text-primary-white rounded-[44px] hover:bg-primary-normal hover:border-primary-normal',
  {
    variants: {
      color: {
        gray: 'py-1.5 border border-line-normal text-label-alternative bg-transparent hover:text-primary-normal hover:bg-transparent hover:border-primary-normal',
        blue: 'border-primary-normal border bg-white text-primary-normal hover:bg-blue-100',
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
  color,
  className,
  classNameCondition,
}: Props) => {
  return (
    <button
      type="button"
      className={cn(
        ButtonRoundedVariants({ color }),
        className,
        classNameCondition,
      )}
    >
      {label}
    </button>
  );
};

export default ButtonRounded;
