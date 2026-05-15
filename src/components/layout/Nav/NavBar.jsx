import React from 'react';
import Search from './Search';
import RightNav from './RightNav.jsx'


export const NavBar = () => {
  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-[rgba(42,42,56,0.6)] bg-[rgba(9,9,11,0.85)] px-6 backdrop-blur-[20px]">
      <div className="flex items-center gap-6">
        <Search />
      </div>

      <RightNav />
    </header>
  );
};

