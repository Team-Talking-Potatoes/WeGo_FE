'use client';

import Script from 'next/script';

const KakaoShare = () => {
  const onKakaoLoad = () => {
    window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY);
  };

  return (
    <Script
      src="https://developers.kakao.com/sdk/js/kakao.min.js"
      strategy="lazyOnload"
      onLoad={onKakaoLoad}
    />
  );
};

export default KakaoShare;
