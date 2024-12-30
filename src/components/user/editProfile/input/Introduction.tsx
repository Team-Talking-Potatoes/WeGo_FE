import TextInput from '@/components/common/input/TextInput';

interface Props {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const IntroductionInput = ({ value, onChange }: Props) => {
  return (
    <div className="mb-[212px] flex w-full max-w-[500px] flex-col items-center gap-1.5">
      <label
        htmlFor="introduction"
        className="body-2-m block w-full text-label-normal"
      >
        자기소개
      </label>

      <TextInput
        type="text"
        name="introduction"
        size="full"
        value={value}
        maxLength={20}
        onChange={onChange}
        placeholder="자기소개를 입력해주세요. (20자 이내)"
      />
    </div>
  );
};

export default IntroductionInput;
