import CheckMark from '@/assets/icon/checkMark.svg';
import cn from '@/utils/cn';

interface Props {
  isChecked?: boolean;
  animate?: boolean;
  handler: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const CheckMarkButton = ({ isChecked, animate, handler }: Props) => {
  return (
    <button
      type="button"
      onClick={handler}
      className={cn('absolute left-0 top-0 z-10 p-2')}
    >
      <CheckMark
        className={cn('forwards transition-all duration-100', {
          'animate-check-shake': animate && isChecked,
          'animate-check-shake-reverse': animate && !isChecked,
        })}
        fill={isChecked ? '#fff' : 'transparent'}
        stroke={isChecked ? 'transparent' : '#fff'}
      />
    </button>
  );
};

export default CheckMarkButton;
