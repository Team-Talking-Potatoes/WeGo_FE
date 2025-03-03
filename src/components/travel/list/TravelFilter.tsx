'use client';

import FilterDomestic from './filter/FilterDomestic';
import FilterDate from './filter/FilterDate';
import FilterSort from './filter/FilterSort';

const TravelFilter = () => {
  return (
    <nav className="w-full pb-5">
      <div className="body-2-sb flex items-center justify-between">
        <div className="flex items-center justify-between gap-2">
          <FilterDomestic />
          <span className="h-3 w-[1px] border border-line-normal" />
          <FilterDate />
        </div>
        <FilterSort />
      </div>
    </nav>
  );
};

export default TravelFilter;
