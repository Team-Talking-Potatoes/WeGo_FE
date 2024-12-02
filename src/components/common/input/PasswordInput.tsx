import cn from '@/utils/cn';
import { cva, VariantProps } from 'class-variance-authority';

const TextInputVariants = cva(
  'mt-[6px] rounded-md border border-[#e0e0e2] p-2 mx-auto outline-none h-11 text-xs focus:border-[#222] p-4',
  {
    variants: {
      size: {
        default: 'w-[335px]',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  },
);

interface Props extends VariantProps<typeof TextInputVariants> {
  name: string;
  value: string;
  placeholder?: string;
  className?: string;
  classNameCondition?: Record<string, boolean>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextInput = ({
  name,
  value,
  placeholder,
  size,
  className,
  classNameCondition,
  onChange,
}: Props) => {
  return (
    <input
      type="password"
      name={name}
      value={value}
      spellCheck="false"
      maxLength={15}
      placeholder={placeholder}
      className={cn(TextInputVariants({ size, className }), classNameCondition)}
      onChange={onChange}
    />
  );
};

export default TextInput;
