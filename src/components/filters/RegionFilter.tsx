import React, { useState } from 'react';

interface RegionFilterProps {
  onFilterChange: (region: string) => void;
}

const regions = [
  { value: '', label: 'All Regions' },
  { value: 'Africa', label: 'Africa' },
  { value: 'Americas', label: 'Americas' },
  { value: 'Asia', label: 'Asia' },
  { value: 'Europe', label: 'Europe' },
  { value: 'Oceania', label: 'Oceania' },
];

const RegionFilter: React.FC<RegionFilterProps> = ({ onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState('');

  const handleRegionSelect = (region: string, label: string) => {
    setSelectedRegion(label);
    onFilterChange(region);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full sm:w-auto">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full sm:w-44 p-2.5 text-sm text-slate-900 dark:text-white 
                 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 
                 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <div className="flex items-center">
          {/* <Globe size={18} className="mr-2 text-slate-400" /> */}
          <span>{selectedRegion || 'Filter by Region'}</span>
        </div>
        <svg
          className={`w-4 h-4 ml-2 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div
          className="absolute z-10 w-full sm:w-44 mt-1 bg-white dark:bg-slate-800 border border-slate-200 
                   dark:border-slate-700 rounded-lg shadow-lg"
          role="listbox"
        >
          <ul className="py-1 text-sm text-slate-900 dark:text-white">
            {regions.map((region) => (
              <li
                key={region.value}
                className={`px-4 py-2 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors
                          ${selectedRegion === region.label ? 'bg-slate-100 dark:bg-slate-700' : ''}`}
                onClick={() => handleRegionSelect(region.value, region.label)}
              >
                {region.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default RegionFilter;