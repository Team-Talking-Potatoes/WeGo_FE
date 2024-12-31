import { forwardRef } from 'react';
import cn from '@/utils/cn';
import { cva, VariantProps } from 'class-variance-authority';

const ButtonVariants = cva(
  'body-1-m rounded disabled:border disabled:border-line-normal disabled:bg-background-alternative disabled:text-label-alternative ',
  {
    variants: {
      fill: {
        default: 'bg-label-normal text-white',
        white: 'bg-white border border-line-strong ',
        blue: 'bg-primary-normal text-white hover:text-primary-normal hover:bg-blue-100',
      },
      size: {
        default: 'w-[335px] h-[52px]',
        full: 'w-full h-[52px]',
        addon: 'w-[101px] h-[46px]',
        modal: 'w-[120px] h-[38px]',
        modal_sm: 'w-[90px] h-[38px]',
        modal_md: 'w-[202px] h-[38px]',
        half: 'w-[160px] h-[52px]',
      },
      font: {
        default: 'body-1-m',
        body_2_m: 'body-2-m',
      },
      // fill default 때 사용
      hover: {
        default: 'hover:bg-primary-normal',
        error: 'hover:bg-status-error',
      },
      // fill white일 때 사용
      hoverBorder: {
        default: 'hover:border-primary-normal text-primary-normal',
        error: 'hover:border-status-error text-status-error',
      },
    },
    defaultVariants: {
      fill: 'default',
      size: 'default',
      font: 'default',
      hover: 'default',
      hoverBorder: 'default',
    },
  },
);

interface Props extends VariantProps<typeof ButtonVariants> {
  label?: string;
  type?: 'submit' | 'button';
  children?: React.ReactNode;
  className?: string;
  classNameCondition?: Record<string, boolean>;
  handler?: () => void;
  disabled?: boolean;
}

const Button = forwardRef<HTMLButtonElement, Props>(
  (
    {
      fill,
      size,
      font,
      label,
      type,
      hover,
      hoverBorder,
      disabled,
      children,
      className,
      classNameCondition,
      handler,
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        type={type === 'submit' ? 'submit' : 'button'}
        disabled={disabled}
        className={cn(
          ButtonVariants({ fill, size, font, hover, hoverBorder }),
          className,
          classNameCondition,
        )}
        onClick={handler}
      >
        {label && label}
        {children && children}
      </button>
    );
  },
);
Button.displayName = 'Button';
export { Button, ButtonVariants };
