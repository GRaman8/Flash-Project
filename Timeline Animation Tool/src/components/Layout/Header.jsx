import React from 'react';

const Header = () => {
  return (
    <header className="bg-blue-700 text-white shadow-md">
      <div className="px-8 py-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold">
          Timeline Animation Tool
        </h1>
        <p className="text-sm text-blue-100">
          Canvas Editor + Timeline System + tailwindcss
        </p>
      </div>
    </header>
  );
};

export default Header;