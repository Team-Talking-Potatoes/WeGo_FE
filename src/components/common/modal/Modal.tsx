'use client';

import { Button } from '@/components/common/button/Button';
import useModalHistory from '@/hooks/useModalHistory';
import { useModalStore, type TextHighlight } from '@/store/useModalStore';

const HighlightedText = ({
  text,
  highlight,
}: {
  text: string;
  highlight?: TextHighlight;
}) => {
  if (!highlight) return <span className="whitespace-pre-line">{text}</span>;

  return (
    <span className="whitespace-pre-line">
      {text.slice(0, highlight.range.start)}
      <span className={highlight.color}>
        {text.slice(highlight.range.start, highlight.range.end)}
      </span>
      {text.slice(highlight.range.end)}
    </span>
  );
};

const Modal = () => {
  const { modal, closeModal } = useModalStore();
  const {
    isOpen,
    icon: Icon,
    title,
    titleHighlight,
    message,
    messageHighlight,
    confirmText = '확인',
    cancelText = '취소',
    onConfirm,
    onCancel,
    type,
  } = modal;

  const handleConfirm = () => {
    if (onConfirm) onConfirm();
    closeModal();
  };

  const handleCancel = () => {
    if (onCancel) onCancel();
    closeModal();
  };

  useModalHistory({ isOpen, closeModal });

  if (!isOpen) return null;
  const isError = type === 'error';

  return (
    <div className="fixed inset-0 z-50 flex animate-fade-in items-center justify-center bg-black/40 pb-[80px]">
      <div className="min-w-[298px] animate-slide-up rounded-lg bg-white p-8 md:min-w-[380px]">
        {Icon && (
          <div className="mb-4 flex justify-center">
            <div className="bg-primary-light flex h-12 w-12 items-center justify-center rounded-full">
              <Icon />
            </div>
          </div>
        )}

        <div className="text-center">
          <h2 className="title-5-b">
            <HighlightedText text={title} highlight={titleHighlight} />
          </h2>
          <p className="body-2-r mt-2 whitespace-pre-line text-label-neutral">
            <HighlightedText text={message} highlight={messageHighlight} />
          </p>
        </div>

        <div className="mt-6 flex w-full justify-center">
          {onCancel ? (
            <div className="flex w-[250px] gap-2">
              <Button
                label={cancelText}
                size="full"
                handler={handleCancel}
                fill="white"
                font="body_2_m"
                hoverBorder={isError ? 'error' : 'default'}
                className="h-[38px] w-[120px]"
              />
              <Button
                label={confirmText}
                size="full"
                handler={handleConfirm}
                font="body_2_m"
                hover={isError ? 'error' : 'default'}
                className="h-[38px] w-[120px]"
              />
            </div>
          ) : (
            <Button
              label={confirmText}
              size="modal"
              handler={handleConfirm}
              font="body_2_m"
              hover={isError ? 'error' : 'default'}
              className="h-[38px] w-[120px] md:w-[210px]"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
