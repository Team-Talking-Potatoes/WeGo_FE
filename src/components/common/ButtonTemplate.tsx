import cn from '@/utils/cn';
import { ButtonTemplateVariants } from './variants/ButtonTemplateVariants';
import { ButtonTemplateProps } from '@/@types/template';

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

export default ButtonTemplate;
