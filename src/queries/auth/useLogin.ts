import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { login } from '@/api/auth/login';
import { QueryError } from '@/@types/query';
import useToast from '@/hooks/useToast';

const useLogin = () => {
  const router = useRouter();
  const { showToast } = useToast();

  return useMutation({
    mutationFn: login,
    onError: (error: QueryError) => {
      switch (error.status) {
        case 401:
          showToast('잘못된 이메일 또는 비밀번호입니다.', 'error');
          break;
        case 500:
          showToast('네트워크를 확인해주세요.', 'error');
          break;
        default:
          showToast('알 수 없는 에러가 발생했습니다.', 'error');
      }
    },
    onSuccess: () => {
      router.push('/');
    },
  });
};

export default useLogin;
