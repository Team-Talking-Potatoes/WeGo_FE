'use client';

import { useState, FormEvent } from 'react';
import { Button } from '@/components/common/button/Button';
import { useRouter } from 'next/navigation';
import useEditProfile from '@/queries/user/useEditProfile';
import useGetUser from '@/queries/user/useGetUser';
import FormTitle from '@/components/common/form/FormTitle';
import Nickname from './input/Nickname';
import ProfileImage from './input/ProfileImage';
import DescriptionInput from './input/DescriptionInput';

interface ProfileFormData {
  profileImage: File | null;
  nickname: string;
  description: string;
}

const EditForm = () => {
  const router = useRouter();
  const { data: user } = useGetUser();

  const [formData, setFormData] = useState<ProfileFormData>({
    profileImage: null,
    nickname: '',
    description: '',
  });
  const [previewImage, setPreviewImage] = useState(user?.image || '');

  const { mutate: editProfile } = useEditProfile();

  const isValid = () => {
    return (
      !formData.profileImage && !formData.nickname && !formData.description
    );
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, profileImage: file }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleNicknameChange = (value: string) => {
    setFormData((prev) => ({ ...prev, nickname: value }));
  };

  const handleDescriptionChange = (value: string) => {
    setFormData((prev) => ({ ...prev, description: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    if (formData.profileImage) {
      formDataToSend.append('profileImage', formData.profileImage);
    }
    if (formData.nickname) {
      formDataToSend.append('nickname', formData.nickname);
    }
    if (formData.description) {
      formDataToSend.append('description', formData.description);
    }

    editProfile(formDataToSend);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-[100px] flex flex-col items-center px-5"
      aria-label="프로필 수정 폼"
    >
      <div className="mt-5 w-full max-w-[335px] md:max-w-[500px]">
        <FormTitle title="프로필 수정" />
      </div>

      <ProfileImage
        previewImage={previewImage}
        handleImageChange={handleImageChange}
      />

      <Nickname
        value={formData.nickname}
        onChange={(e) => {
          handleNicknameChange(e.target.value);
        }}
      />

      <DescriptionInput
        value={formData.description}
        onChange={(e) => {
          handleDescriptionChange(e.target.value);
        }}
      />

      <div className="flex w-full max-w-[500px] justify-center gap-4">
        <Button size="full" fill="white" handler={() => router.back()}>
          취소
        </Button>
        <Button type="submit" size="full" disabled={isValid()}>
          저장
        </Button>
      </div>
    </form>
  );
};

export default EditForm;
