import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <div className="relative w-full sm:w-64">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        {/* <Search size={18} className="text-slate-400" /> */}
      </div>
      <input
        type="text"
        className="w-full p-2.5 pl-10 pr-4 text-sm text-slate-900 dark:text-white bg-white dark:bg-slate-800 
                 rounded-lg border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 
                 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 outline-none transition-all"
        placeholder="Search countries..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
    </div>
  );
};

export default SearchBar;