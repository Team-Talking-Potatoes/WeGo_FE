'use client';

import { useEffect } from 'react';

export const MswComponent = () => {
  useEffect(() => {
    if (
      process.env.NODE_ENV === 'development' &&
      process.env.NEXT_PUBLIC_MODE === 'mock'
    ) {
      if (typeof window === 'undefined') {
        (async () => {
          const { server } = await import('@/mocks/server');
          server.listen();
        })();
      } else {
        (async () => {
          const { worker } = await import('@/mocks/browser');
          worker.start();
        })();
      }
    }
  });

  return null;
};
