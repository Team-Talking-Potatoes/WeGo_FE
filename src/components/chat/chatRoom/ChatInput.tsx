/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import Camera from '@/assets/camera.svg';
import Send from '@/assets/send.svg';
import Close from '@/assets/close_8px.svg';
import Image from 'next/image';
import Photo from '@/assets/modal/modal_photo.svg';
import { Button } from '@/components/common/button/Button';
import { useChatInput } from '@/hooks/useChatInput';

interface Props {
  chatId: string;
  onSendMessage: (message: string, images: string[]) => void;
  onHeightChange: (height: number) => void;
}

const ChatInput = ({ chatId, onSendMessage, onHeightChange }: Props) => {
  const {
    message,
    textareaRef,
    fileInputRef,
    modalData,
    imageUrls,
    isOpen,
    setMessage,
    closeModal,
    handleSend,
    handleFileChange,
    handleImageRemove,
  } = useChatInput({ chatId, onSendMessage, onHeightChange });

  return (
    <>
      <div className="absolute bottom-0 flex h-auto w-full flex-col border-t border-line-neutral bg-primary-white px-4 pb-4 pt-[15px] custom-scrollbar md:bottom-20 xl:bottom-0">
        <div
          className={`flex ${textareaRef.current && (imageUrls.length || textareaRef.current.offsetHeight > 22) ? 'items-end' : 'items-center'}`}
        >
          <label htmlFor="이미지 업로드 버튼" className="cursor-pointer">
            <Camera />
            <input
              id="이미지 업로드 버튼"
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="hidden"
            />
          </label>

          <div className="ml-2.5 flex max-w-full flex-1 flex-col gap-2.5 overflow-x-hidden rounded-3xl bg-gray-100 px-4 py-2">
            {imageUrls.length > 0 && (
              <div className="flex gap-4 overflow-x-auto custom-scrollbar">
                {imageUrls.map(({ file, url }, index) => (
                  <div
                    key={url}
                    className="relative mt-[6px] h-[56px] w-[56px] flex-shrink-0"
                  >
                    <Image
                      src={url}
                      alt={`업로드된 이미지 미리보기 ${index + 1}`}
                      fill
                      className="rounded object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => handleImageRemove(file)}
                      className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-black/60"
                    >
                      <Close />
                    </button>
                  </div>
                ))}
              </div>
            )}
            <div className="flex items-end">
              <textarea
                ref={textareaRef}
                rows={1}
                className="body-2-r max-h-32 flex-1 resize-none overflow-y-auto bg-transparent text-label-alternative outline-none custom-scrollbar"
                placeholder="메시지 보내기"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
              />
              <button
                type="button"
                onClick={handleSend}
                aria-label="메시지 전송"
              >
                <Send />
              </button>
            </div>
          </div>
        </div>
      </div>
      {isOpen && (
        <div
          className="absolute inset-0 z-50 flex animate-fade-in items-center justify-center bg-label-strong/40 md:bottom-20 xl:bottom-0"
          onClick={closeModal}
        >
          <div
            className="w-full max-w-[335px] animate-slide-up rounded-2xl bg-white p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex justify-center">
              <div className="bg-primary-light flex h-16 w-16 items-center justify-center rounded-full">
                <Photo />
              </div>
            </div>
            <div className="text-center">
              <h2 className="title-5-b mb-2">{modalData.title}</h2>
              <p className="body-2-r text-label-neutral">
                {modalData.description}
              </p>
            </div>
            <div className="mt-9 flex justify-center">
              <Button
                handler={() => {
                  closeModal();
                }}
                className="h-[38px] w-[120px]"
              >
                확인
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatInput;
