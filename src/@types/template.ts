import { VariantProps } from 'class-variance-authority';
import { ButtonTemplateVariants } from '@/components/common/ButtonTemplate';

interface ButtonTemplateProps
  extends VariantProps<typeof ButtonTemplateVariants> {
  children?: React.ReactNode;
  label?: string;
  error?: boolean;
  handler?: () => void;
}

export type { ButtonTemplateProps };
