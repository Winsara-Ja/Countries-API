import React, { useState } from 'react';
import CountriesList from '../components/countries/CountriesList';
import SearchBar from '../components/filters/SearchBar';
import RegionFilter from '../components/filters/RegionFilter';

const CountriesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-8">
        <div className="flex items-center space-x-3">
          {/* <Globe className="h-8 w-8 text-blue-600 dark:text-blue-400" /> */}
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Explore Countries</h1>
        </div>
        
        <div className="w-full md:w-auto flex flex-col sm:flex-row gap-4">
          <SearchBar onSearch={setSearchQuery} />
          <RegionFilter onFilterChange={setSelectedRegion} />
        </div>
      </div>
      
      <CountriesList searchQuery={searchQuery} regionFilter={selectedRegion} />
    </div>
  );
};

export default CountriesPage;