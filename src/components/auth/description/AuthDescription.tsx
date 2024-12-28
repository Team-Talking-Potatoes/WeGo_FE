import cn from '@/utils/cn';

interface Props {
  text: string;
  className?: string;
}

const AuthDescription = ({ text, className }: Props) => {
  return <div className={cn('title-5-sb mb-6', className)}>{text}</div>;
};

export default AuthDescription;
