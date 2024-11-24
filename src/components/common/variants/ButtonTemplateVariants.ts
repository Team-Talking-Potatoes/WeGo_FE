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

export { ButtonTemplateVariants };
