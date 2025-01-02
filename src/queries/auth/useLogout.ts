import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logout } from '@/api/auth/logout';
import useToast from '@/hooks/useToast';
import { QueryError } from '@/@types/query';

const useLogout = (onSuccessCallback: () => void) => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  return useMutation({
    mutationFn: logout,
    onError: (error: QueryError) => {
      switch (error.status) {
        default:
          showToast('알 수 없는 에러가 발생했습니다.', 'error');
      }
    },
    onSuccess: () => {
      onSuccessCallback();
      queryClient.removeQueries({ queryKey: ['user'] });
      showToast('로그아웃 되었습니다.', 'success');
    },
  });
};

export default useLogout;
