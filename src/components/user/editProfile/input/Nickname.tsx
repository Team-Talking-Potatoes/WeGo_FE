import TextInput from '@/components/common/input/TextInput';

interface Props {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function NicknameInput({ value, onChange }: Props) {
  return (
    <div className="mb-6 flex w-full max-w-[500px] flex-col items-center gap-1.5">
      <label
        htmlFor="nickname"
        className="body-2-m block w-full text-label-normal"
      >
        닉네임
      </label>

      <TextInput
        type="text"
        name="nickname"
        size="full"
        value={value}
        onChange={onChange}
        placeholder="닉네임을 입력해 주세요."
      />
    </div>
  );
}
