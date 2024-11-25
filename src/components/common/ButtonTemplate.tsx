import cn from '@/utils/cn';
import { ButtonTemplateProps } from '@/@types/template';
import { cva } from 'class-variance-authority';

const ButtonTemplateVariants = cva('rounded-md px-4 py-2 hover:bg-blue-600', {
  variants: {
    variant: {
      default: 'bg-blue-500 text-white',
    },
    size: {
      default: 'text-sm',
      sm: 'text-xs',
      lg: 'text-md',
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
});

const ButtonTemplate = ({
  variant,
  size,
  children,
  label,
  error,
  handler,
}: ButtonTemplateProps) => {
  return (
    <button
      className={cn(ButtonTemplateVariants({ variant, size }), {
        'bg-slate-400 hover:bg-slate-400': error,
      })}
      onClick={handler}
      disabled={error}
    >
      {children && children}
      {label && label}
    </button>
  );
};

export { ButtonTemplate, ButtonTemplateVariants };
