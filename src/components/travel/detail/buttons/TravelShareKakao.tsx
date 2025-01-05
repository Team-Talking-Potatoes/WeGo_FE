'use client';

import KakaoIcon from '@/assets/icon/KakaoTalk_logo.svg';
import { useQueryClient } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';

interface TravelData {
  data: {
    image: string;
    travelName: string;
    description: string;
  };
}

const TravelShareKakao = () => {
  const pathname = usePathname();
  const travelId = pathname.split('/').pop();
  const queryClient = useQueryClient();
  const travelData = queryClient.getQueryData<TravelData>([
    'travels',
    travelId,
  ]);

  const handleShareKakao = () => {
    const { Kakao, location } = window;
    Kakao.Share.sendCustom({
      templateId: 115961,
      templateArgs: {
        image: travelData?.data?.image,
        title: travelData?.data?.travelName,
        description: travelData?.data?.description,
        url: location.origin + pathname,
      },
    });
  };

  return (
    <div className="flex flex-col items-center justify-center gap-1.5">
      <button
        type="button"
        onClick={handleShareKakao}
        className="h-9 w-9 overflow-hidden rounded-lg bg-gray-100"
      >
        <KakaoIcon className="h-9 w-9" />
      </button>
      <span>카카오톡</span>
    </div>
  );
};

export default TravelShareKakao;
