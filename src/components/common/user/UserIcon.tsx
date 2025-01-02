import Image, { StaticImageData } from 'next/image';
import { cva, VariantProps } from 'class-variance-authority';

const UserIconVariants = cva('rounded-full overflow-hidden', {
  variants: {
    size: {
      default: 'w-16 h-16', // 64px
      xs: 'w-6 h-6', // 24px
      sm: 'w-9 h-9', // 36px
      md: 'w-10 h-10', // 40px
      lg: 'w-20 h-20', // 80px
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

interface Props extends VariantProps<typeof UserIconVariants> {
  profileImage?: string | StaticImageData;
  nickname?: string;
  ariaLabel?: string;
}

const sizeMapping = {
  default: 64,
  xs: 24,
  sm: 36,
  md: 40,
  lg: 80,
};

const UserIcon = ({
  profileImage,
  ariaLabel,
  nickname,
  size = 'default',
}: Props) => {
  const sizeInPx = sizeMapping[size ?? 'default'];
  return (
    <div className={UserIconVariants({ size })} aria-label={ariaLabel}>
      <Image
        src={profileImage || '/icon/default_profile_round.svg'}
        alt={`${nickname ?? '유저'}의 프로필 이미지`}
        width={sizeInPx}
        height={sizeInPx}
        className="h-full w-full object-cover"
      />
    </div>
  );
};
export default UserIcon;
