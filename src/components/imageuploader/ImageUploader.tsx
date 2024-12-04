'use client';

import { useState } from 'react';
import ImageUploadButton from './ImageUploadButton';
import ImagePreview from './ImagePreview';

const ImageUploader = () => {
  const [image, setImage] = useState<string | null>(null);

  const handleImageChange = (imageUrl: string) => {
    setImage(imageUrl);
  };

  const handleRemoveImage = () => {
    setImage(null);
  };

  const id = 'image';
  return (
    <div className="relative flex w-fit flex-col gap-1.5">
      <label
        htmlFor={id}
        className="w-fit cursor-pointer text-sm text-label-normal after:ml-0.5 after:text-status-infomative after:content-['*']"
      >
        사진 추가하기
      </label>
      {image ? (
        <>
          <span
            role="button"
            tabIndex={0}
            className="absolute right-0 top-0 text-sm text-label-alternative underline"
            onClick={handleRemoveImage}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') handleRemoveImage();
            }}
            aria-label="이미지 편집 버튼"
          >
            편집
          </span>
          <ImagePreview src={image} />
        </>
      ) : (
        <ImageUploadButton id={id} onImageChange={handleImageChange} />
      )}
    </div>
  );
};

export default ImageUploader;
