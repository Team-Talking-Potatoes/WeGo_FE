import Image from 'next/image';
import IconCamera from '@/assets/icon/profile/icon_camera_45px.svg';
import IconCameraSmall from '@/assets/icon/profile/icon_camera_32px.svg';
import IconModify from '@/assets/icon/profile/profile_modify.svg';

interface Props {
  previewImage: string;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProfileImage = ({ previewImage, handleImageChange }: Props) => {
  return (
    <div className="relative mb-8 flex w-[80px] flex-col items-center">
      <div className="relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-slate-200">
        {previewImage ? (
          <>
            <Image
              src={previewImage}
              alt="프로필 이미지"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/50" />
            <IconCameraSmall className="absolute" />
          </>
        ) : (
          <IconCamera />
        )}

        <label
          htmlFor="profile-image"
          className="absolute top-0 h-full w-full cursor-pointer"
        >
          <span className="sr-only">이미지 업로드</span>
        </label>
        <input
          id="profile-image"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
      </div>
      <IconModify className="absolute -right-1 bottom-3.5" />
    </div>
  );
};

export default ProfileImage;
