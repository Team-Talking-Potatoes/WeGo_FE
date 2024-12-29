'use client';

import { usePathname } from 'next/navigation';
import PCHeader from './PCHeader';
import HomeHeader from './HomeHeader';
import MobileHeader from './MobileHeader';

const Header = () => {
  const pathname = usePathname();
  if (pathname === '/') return <HomeHeader />;

  return (
    <header>
      <div className="xl:hidden">
        <MobileHeader />
      </div>
      <div className="hidden xl:block">
        <PCHeader />
      </div>
    </header>
  );
};

export default Header;
