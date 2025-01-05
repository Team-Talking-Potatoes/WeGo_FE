'use client';

import React, { useState, useEffect } from 'react';

const ProgressBar = ({ progressRate }: { progressRate: number }) => {
  const [animatedProgress, setAnimatedProgress] = useState(0);
  const [displayedPercent, setDisplayedPercent] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = progressRate;
    const duration = 500; // 애니메이션 지속 시간 (밀리초)
    const increment = end / (duration / 5); // 10ms마다 증가할 값

    const progressInterval = setInterval(() => {
      start += increment;
      if (start >= end) {
        start = end;
        clearInterval(progressInterval);
      }
      setAnimatedProgress(start);
      setDisplayedPercent(Math.round(start));
    }, 10);

    return () => clearInterval(progressInterval);
  }, [progressRate]);

  return (
    <div className="caption-1-sb flex items-center gap-2.5 text-primary-normal">
      <div className="relative h-[6px] w-full overflow-hidden rounded-[10px] bg-slate-200">
        <div
          className="absolute bottom-0 left-0 top-0 rounded-full bg-primary-normal transition-all duration-500"
          style={{
            width: `${animatedProgress}%`,
            transitionTimingFunction: 'cubic-bezier(.01,.98,1,1)',
          }}
        />
      </div>
      <span>{displayedPercent}%</span>
    </div>
  );
};

export default ProgressBar;
