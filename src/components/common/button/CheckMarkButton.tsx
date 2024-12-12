import CheckMark from '@/assets/icon/checkMark.svg';

interface Props {
  isChecked?: boolean;
  handler: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const CheckMarkButton = ({ isChecked, handler }: Props) => {
  return (
    <button
      type="button"
      onClick={handler}
      className="absolute left-0 top-0 z-[100] p-2"
    >
      <CheckMark
        className="transition-all duration-500"
        fill={isChecked ? '#fff' : 'transparent'}
        stroke={isChecked ? 'transparent' : '#fff'}
      />
    </button>
  );
};

export default CheckMarkButton;
