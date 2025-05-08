import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CountryCard from './CountryCard';
import CountryCardSkeleton from './CountryCardSkeleton';
import { useAuth } from '../../context/AuthContext';

interface Country {
  name: {
    common: string;
  };
  flags: {
    png: string;
    alt?: string;
  };
  capital?: string[];
  languages?: Record<string, string>;
  region: string;
  currencies?: Record<string, { name: string; symbol?: string }>;
  population: number;
}

interface CountriesListProps {
  searchQuery: string;
  regionFilter: string;
}

const CountriesList: React.FC<CountriesListProps> = ({ searchQuery, regionFilter }) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    setLoading(true);
    axios
      .get('https://restcountries.com/v3.1/all')
      .then((response) => {
        const sortedCountries = response.data.sort((a: Country, b: Country) =>
          a.name.common.localeCompare(b.name.common)
        );
        setCountries(sortedCountries);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching countries:', error);
        setError('Failed to load countries. Please try again later.');
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      const token = localStorage.getItem('token');
      axios.get('https://countries-apinpm.onrender.com/api/favorites', {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(response => {
          setFavorites(response.data.map((fav: any) => fav.countryName));
        })
        .catch(error => {
          console.error('Error fetching favorites:', error);
        });
    } else {
      setFavorites([]);
    }
  }, [isAuthenticated]);

  const filteredCountries = countries.filter((country) => {
    const matchesSearch = country.name.common.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRegion = regionFilter ? country.region === regionFilter : true;
    return matchesSearch && matchesRegion;
  });

  const handleFavoriteToggle = () => {
    // Refresh favorites list
    if (isAuthenticated) {
      const token = localStorage.getItem('token');
      axios.get('https://countries-apinpm.onrender.com/api/favorites', {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(response => {
          setFavorites(response.data.map((fav: any) => fav.countryName));
        })
        .catch(error => {
          console.error('Error fetching favorites:', error);
        });
    }
  };

  if (error) {
    return (
      <div className="text-center py-16">
        <p className="text-red-500 text-lg">{error}</p>
        <button 
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div>
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <CountryCardSkeleton key={index} />
          ))}
        </div>
      ) : (
        <>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
            Showing {filteredCountries.length} of {countries.length} countries
          </p>
          
          {filteredCountries.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-lg text-slate-600 dark:text-slate-400">
                No countries match your search criteria. Try adjusting your filters.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredCountries.map((country) => (
                <CountryCard 
                  key={country.name.common} 
                  country={country}
                  isFavorite={favorites.includes(country.name.common)}
                  onFavoriteToggle={handleFavoriteToggle}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CountriesList;