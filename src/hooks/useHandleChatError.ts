import { useRouter } from 'next/navigation';
import { QueryError } from '@/@types/query';

const useHandleChatError = () => {
  const router = useRouter();

  return (error: QueryError) => {
    switch (error.status) {
      case 400:
        console.error('잘못된 요청입니다.');
        break;
      case 401:
        console.error('로그인이 필요합니다.');
        router.push('/login');
        break;
      case 403:
        console.error('접근 권한이 없습니다.');
        router.push('/');
        break;
      case 500:
        console.error('네트워크를 확인해주세요.');
        break;
      default:
        console.error('알 수 없는 오류 발생했습니다.');
    }
  };
};

export default useHandleChatError;
