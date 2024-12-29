'use client';

import useLogout from '@/queries/auth/useLogout';
import { useRouter } from 'next/navigation';
import useModal from '@/hooks/useModal';
import SettingItem from '../settingItem/SettingItem';

const SettingList = () => {
  const router = useRouter();
  const { showModal } = useModal();
  const { mutate: logout } = useLogout(() => {
    router.push('/login');
  });

  const handleLogout = () => {
    showModal(
      '로그아웃',
      '로그아웃을 하시겠습니까?\n함께 즐기는 여행으로\n다시 돌아와 주세요!',
      {
        confirmText: '확인',
        cancelText: '취소',
        messageHighlight: {
          range: { start: 0, end: 4 },
          color: 'text-status-error',
        },
        onConfirm: () => {
          logout();
        },
        onCancel: () => {},
      },
    );
  };

  return (
    <ul className="mx-auto w-full max-w-[688px] xl:mt-4" aria-label="설정 목록">
      <SettingItem
        title="문의하기"
        description="궁금한 내용이 있으신가요?"
        destination="/preparing"
      />

      <SettingItem
        title="비밀번호 변경"
        description="비밀번호를 변경하시고 싶으신가요?"
        destination="/resetPassword/userPassword"
      />

      <SettingItem
        title="계정 탈퇴"
        description="이제 WE'GO를 사용할 수 없어요."
        destination="/deleteAccount"
      />

      <SettingItem
        title="로그아웃"
        description="로그아웃 하시겠어요?"
        handler={handleLogout}
      />
    </ul>
  );
};

export default SettingList;
