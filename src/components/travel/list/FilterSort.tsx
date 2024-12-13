import RegulateIcon from '@/assets/regulate.svg';
import { useTravelStore } from '@/store/useTravelStore';
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react';

function FilterSort() {
  const sort = useTravelStore((state) => state.filters).sortOrder;
  const setFilters = useTravelStore((state) => state.setFilters);
  const handleSort = (value: 'popular' | 'registrationEnd' | null) => {
    setFilters({ sortOrder: value });
  };

  return (
    <Listbox onChange={handleSort}>
      <ListboxButton
        aria-label="여행 리스트 정렬 버튼"
        className="flex w-[69px] justify-end gap-1"
      >
        <RegulateIcon />
      </ListboxButton>
      <ListboxOptions
        anchor="bottom"
        transition
        className="body-2-m flex w-[90px] flex-col items-center justify-center rounded border-line-normal text-label-alternative shadow-custom transition duration-100 ease-in [--anchor-gap:4px] [--anchor-padding:20px]"
      >
        <ListboxOption
          value={null}
          className={`w-full cursor-pointer border-y border-line-normal py-2.5 text-center ${!sort && 'text-label-normal'}`}
        >
          최신순
        </ListboxOption>
        <ListboxOption
          value="popular"
          className={`cursor-pointer py-2.5 ${sort === 'popular' && 'text-label-normal'}`}
        >
          인기순
        </ListboxOption>
        <ListboxOption
          value="registrationEnd"
          className={`cursor-pointer py-2.5 ${sort === 'registrationEnd' && 'text-label-normal'}`}
        >
          마감임박
        </ListboxOption>
      </ListboxOptions>
    </Listbox>
  );
}

export default FilterSort;
