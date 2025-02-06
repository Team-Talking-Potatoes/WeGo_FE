import PluseIcon from '@/assets/plus_21px.svg';
import XIcon from '@/assets/x.svg';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import useCreateReviewStore from '@/store/useCreateReview';
import { compressImage } from '@/utils/compressImage';

const MAX_FILE_COUNT = 5;
const MAX_FILE_SIZE_MB = 5;
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

const InputImage = () => {
  const {
    errorMessages,
    selectedFiles,
    prevImage,
    setPrevImage,
    setSelectedFiles,
  } = useCreateReviewStore();

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = event.target.files ? Array.from(event.target.files) : [];

    const filteredFiles = files.filter((file) => {
      if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        console.error('파일타입 에러');
        return false;
      }
      if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        console.error('파일크기 에러');
        return false;
      }
      return true;
    });

    const remainingSlots = MAX_FILE_COUNT - selectedFiles.length;
    if (filteredFiles.length > remainingSlots) {
      filteredFiles.splice(remainingSlots);
    }

    const urlFiles = filteredFiles.map((file) => URL.createObjectURL(file));
    setPrevImage([...prevImage, ...urlFiles]);

    const converted = await Promise.all(
      filteredFiles.map(async (file) => {
        const convertedFile = await compressImage(file);
        return convertedFile;
      }),
    );

    const validConvertedFiles = converted.filter(Boolean);
    setSelectedFiles([...selectedFiles, ...(validConvertedFiles as File[])]);
  };

  const handleDelete = (index: number) => {
    const newSelectedFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(newSelectedFiles);
    const newPreview = prevImage.filter((_, i) => i !== index);
    setPrevImage(newPreview);

    const fileInput = document.getElementById('file') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  return (
    <section className="flex w-full flex-col">
      <header
        className={`${(!errorMessages.selectedFiles || (errorMessages.selectedFiles && selectedFiles.length !== 0)) && 'pb-3'}`}
      >
        여행의 순간을 함께 보여주세요.
      </header>
      <main aria-label="여행 후기 이미지를 등록해주세요">
        {errorMessages.selectedFiles && selectedFiles.length === 0 && (
          <p className="body-3-r text-status-error">
            {errorMessages.selectedFiles}
          </p>
        )}
        <div className="flex items-start justify-start gap-3">
          <label
            htmlFor="file"
            className="relative flex h-20 w-20 flex-shrink-0 cursor-pointer items-center justify-center overflow-hidden bg-label-alternative"
            aria-label="이미지 등록하기, 이미지 하나당 5MB이내로 등록 가능 합니다"
          >
            <PluseIcon className="text-white" />
          </label>
          <input
            type="file"
            id="file"
            name="file"
            onChange={handleFileChange}
            multiple
            className="hidden"
            accept="image/*"
          />
          {selectedFiles.length > 0 && (
            <div className="flex overflow-hidden">
              <Swiper
                slidesPerView="auto"
                spaceBetween={12}
                grabCursor
                style={{ width: '100%', height: 'auto' }}
              >
                {selectedFiles.map((file, index) => (
                  <SwiperSlide
                    key={`${file.name}-${index}`} /* eslint-disable-line react/no-array-index-key */
                    style={{
                      width: '80px',
                      height: '80px',
                    }}
                  >
                    <div className="relative flex h-full w-full flex-col">
                      <Image
                        src={prevImage[index] as string}
                        alt={`미리보기-${file.name}`}
                        className="h-full w-full object-cover"
                        width={56}
                        height={56}
                      />
                      <button
                        type="button"
                        aria-label={`${file.name} 이미지 삭제`}
                        onClick={() => handleDelete(index)}
                        className="absolute right-0 z-30 flex h-[30px] w-[30px] items-center justify-center bg-black bg-opacity-40 text-white"
                      >
                        <XIcon />
                      </button>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}
        </div>

        <span className="body-3-r text-primary-normal">
          이미지는 최대 5개 등록 가능합니다.
        </span>
      </main>
    </section>
  );
};

export default InputImage;
