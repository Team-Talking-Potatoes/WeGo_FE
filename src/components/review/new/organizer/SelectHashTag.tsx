import HashTagButton from '@/components/common/button/HashTagButton';
import { HASH_TAGS } from '@/constants/hashTag';
import useCreateReviewStore from '@/store/useCreateReview';

const SelectHashTag = () => {
  const { hashTags, setHashTags } = useCreateReviewStore();
  const handleClick = (tag: string) => {
    setHashTags(tag);
  };
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <header className="heading-1-sb">
          모임장에 대한 후기를 알려주세요
        </header>
        <span className="body-3-r">(복수선택)</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {Object.entries(HASH_TAGS).map(([key, value]) => (
          <HashTagButton
            key={key}
            label={value}
            click={handleClick}
            selected={hashTags.has(value)}
          />
        ))}
      </div>
    </div>
  );
};

export default SelectHashTag;
