import React from 'react';

interface Props {
  label: string;
  click: (tag: string) => void;
  selected: boolean;
}

const HashTagButton: React.FC<Props> = ({ label, click, selected }) => {
  return (
    <button
      type="button"
      onClick={() => click(label)}
      className={`${selected ? 'bg-primary-normal text-primary-white' : 'bg-blue-50 text-primary-normal'} body-2-r rounded px-2 py-1`}
    >
      {label}
    </button>
  );
};

export default HashTagButton;
