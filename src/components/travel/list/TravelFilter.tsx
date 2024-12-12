'use client';

import FilterDomestic from './FilterDomestic';
import FilterDate from './FilterDate';
import FilterSort from './FilterSort';
import FilterSearch from './FilterSearch';

const TravelFilter = () => {
  return (
    <nav>
      <FilterSearch />
      <div className="body-2-sb flex items-center justify-between pb-3">
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
