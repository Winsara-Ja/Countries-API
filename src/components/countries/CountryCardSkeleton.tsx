import React from 'react';

const CountryCardSkeleton: React.FC = () => {
  return (
    <div 
      className="bg-white dark:bg-slate-800 rounded-lg overflow-hidden shadow-md flex flex-col h-full animate-pulse"
      data-testid="country-card-skeleton"
    >
      <div className="h-48 bg-slate-200 dark:bg-slate-700" />
      
      <div className="p-4 flex-grow flex flex-col gap-3">
        <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-3/4" />
        
        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full mt-2" />
        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full" />
        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full" />
        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full" />
        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-2/3" />
      </div>
    </div>
  );
};

export default CountryCardSkeleton;