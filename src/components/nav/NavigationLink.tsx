import Link from 'next/link';
import React from 'react';

interface Props {
  href: string;
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
}

const NavLink = ({ href, icon, label, isActive }: Props) => (
  <Link
    href={href}
    className="caption-1-r flex flex-col items-center px-[29px]"
  >
    <div
      className="flex h-9 w-9 items-center justify-center"
      aria-label={label}
    >
      {React.cloneElement(icon as React.ReactElement, {
        fill: isActive ? 'white' : 'none',
      })}
    </div>
    {label}
  </Link>
);

export default NavLink;
