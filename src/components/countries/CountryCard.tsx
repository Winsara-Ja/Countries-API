import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRegHeart, FaMapPin, FaGlobeAmericas, FaLanguage, FaMoneyBillWaveAlt, FaUserCircle } from "react-icons/fa";
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';

interface CountryCardProps {
  country: {
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
  };
  isFavorite?: boolean;
  onFavoriteToggle?: () => void;
}

const CountryCard: React.FC<CountryCardProps> = ({ country, isFavorite = false, onFavoriteToggle }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleCountryClick = () => {
    navigate(`/country/${country.name.common}`);
  };

  const handleFavoriteClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!isAuthenticated) {
      toast.error('Please login to add favorites');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };
      
      if (!isFavorite) {
        await axios.post('http://localhost:5000/api/favorites', {
          countryName: country.name.common,
          flag: country.flags.png,
          capital: country.capital?.[0],
          region: country.region
        }, { headers });
        toast.success('Added to favorites');
      } else {
        await axios.delete(`http://localhost:5000/api/favorites/${country.name.common}`, { headers });
        toast.success('Removed from favorites');
      }
      
      if (onFavoriteToggle) {
        onFavoriteToggle();
      }
    } catch (error) {
      toast.error('Failed to update favorites');
      console.error('Error updating favorites:', error);
    }
  };

  const formatPopulation = (population: number): string => {
    return new Intl.NumberFormat().format(population);
  };

  return (
    <div 
      className="bg-white dark:bg-slate-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 flex flex-col h-full transform hover:-translate-y-1 cursor-pointer relative"
      onClick={handleCountryClick}
    >
      <button
        onClick={handleFavoriteClick}
        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 dark:bg-slate-800/80 
                 hover:bg-white dark:hover:bg-slate-700 transition-colors"
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      >
        <FaRegHeart
          className={`h-5 w-5 ${
            isFavorite 
              ? 'fill-red-500 text-red-500' 
              : 'text-slate-400 hover:text-red-500'
          }`}
        />
      </button>

      <div className="relative h-48 overflow-hidden">
        <img
          src={country.flags.png}
          alt={country.flags.alt || `Flag of ${country.name.common}`}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
          <h2 className="text-white font-bold text-xl p-4">{country.name.common}</h2>
        </div>
      </div>
      
      <div className="p-4 flex-grow flex flex-col gap-2 text-sm">
        <div className="flex items-center gap-2">
          <FaMapPin size={16} className="text-blue-600 dark:text-blue-400 shrink-0" />
          <span className="font-medium">Capital:</span>
          <span className="text-slate-600 dark:text-slate-300 truncate">
            {country.capital?.join(', ') || 'N/A'}
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <FaGlobeAmericas size={16} className="text-blue-600 dark:text-blue-400 shrink-0" />
          <span className="font-medium">Region:</span>
          <span className="text-slate-600 dark:text-slate-300">{country.region}</span>
        </div>
        
        <div className="flex items-start gap-2">
          <FaLanguage size={16} className="text-blue-600 dark:text-blue-400 mt-0.5" />
          <span className="font-medium">Languages:</span>
          <span className="text-slate-600 dark:text-slate-300 truncate">
            {country.languages 
              ? Object.values(country.languages).join(', ') 
              : 'N/A'}
          </span>
        </div>
        
        <div className="flex items-start gap-2">
          <FaMoneyBillWaveAlt size={16} className="text-blue-600 dark:text-blue-400 mt-0.5" />
          <span className="font-medium">Currencies:</span>
          <span className="text-slate-600 dark:text-slate-300 truncate">
            {country.currencies
              ? Object.values(country.currencies)
                  .map(currency => `${currency.name} ${currency.symbol ? `(${currency.symbol})` : ''}`)
                  .join(', ')
              : 'N/A'}
          </span>
        </div>
        
        <div className="flex items-center gap-2 mt-1">
          <FaUserCircle size={16} className="text-blue-600 dark:text-blue-400 shrink-0" />
          <span className="font-medium">Population:</span>
          <span className="text-slate-600 dark:text-slate-300">{formatPopulation(country.population)}</span>
        </div>
      </div>
    </div>
  );
};

export default CountryCard;