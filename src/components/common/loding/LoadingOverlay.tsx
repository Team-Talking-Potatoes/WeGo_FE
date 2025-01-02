import SpinnerIcon from '@/assets/spinner_round.svg';

const LoadingOverlay = () => {
  return (
    <div className="fixed left-0 top-0 z-10 flex h-screen w-screen items-center justify-center overflow-hidden bg-black/10">
      <SpinnerIcon className="animate-spin" />
    </div>
  );
};

export default LoadingOverlay;
