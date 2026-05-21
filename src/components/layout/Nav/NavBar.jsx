import Search from './Search';
import RightNav from './RightNav.jsx';

export const NavBar = () => {
  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between
      border-b border-outline-variant
      bg-surface/85
      backdrop-blur-[20px]
      px-6"
    >
      <div className="flex items-center gap-6">
        <Search />
      </div>
      <RightNav />
    </header>
  );
};