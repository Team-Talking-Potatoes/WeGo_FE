import { useToastStore, ToastType } from '@/store/toast';

const useToast = () => {
  const { addToast } = useToastStore();

  const showToast = (
    message: string,
    type: ToastType = 'info',
    duration = 3000,
  ) => {
    addToast(message, type, duration);
  };

  return { showToast };
};

export default useToast;
