import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

interface CountryData {
  name: {
    common: string;
    official: string;
    nativeName?: Record<string, { official: string; common: string }>;
  };
  flags: {
    png: string;
    svg: string;
    alt?: string;
  };
  capital?: string[];
  region: string;
  subregion?: string;
  languages?: Record<string, string>;
  currencies?: Record<string, { name: string; symbol?: string }>;
  population: number;
  borders?: string[];
  area?: number;
  timezones?: string[];
}

const CountryDetail: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate();
  const [country, setCountry] = useState<CountryData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
      .then((response) => {
        if (response.data && response.data.length > 0) {
          setCountry(response.data[0]);
        } else {
          throw new Error('Country not found');
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching country details:', error);
        setError('Failed to load country details. Please try again later.');
        setLoading(false);
      });
  }, [name]);

  const goBack = () => {
    navigate(-1);
  };

  const formatPopulation = (population: number): string => {
    return new Intl.NumberFormat().format(population);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-32 w-48 bg-slate-200 dark:bg-slate-700 rounded mb-4"></div>
          <div className="h-8 w-64 bg-slate-200 dark:bg-slate-700 rounded mb-2"></div>
          <div className="h-4 w-48 bg-slate-200 dark:bg-slate-700 rounded"></div>
        </div>
      </div>
    );
  }

  if (error || !country) {
    return (
      <div className="text-center py-16">
        <p className="text-red-500 text-lg">{error || 'Country not found'}</p>
        <button 
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          onClick={goBack}
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={goBack}
        className="flex items-center gap-2 px-4 py-2 mb-8 bg-white dark:bg-slate-800 shadow-sm 
                 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
      >
        {/* <ArrowLeft size={16} /> */}
        <span>Back to Countries</span>
      </button>

      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md overflow-hidden">
        <div className="aspect-video overflow-hidden">
          <img
            src={country.flags.svg || country.flags.png}
            alt={country.flags.alt || `Flag of ${country.name.common}`}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-6">
          <h1 className="text-3xl font-bold mb-2">{country.name.common}</h1>
          <p className="text-slate-600 dark:text-slate-400 mb-6">{country.name.official}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                {/* <MapPin size={18} className="text-blue-600 dark:text-blue-400" /> */}
                <span className="font-semibold">Capital:</span>
                <span>{country.capital?.join(', ') || 'N/A'}</span>
              </div>
              
              <div className="flex items-center gap-2">
                {/* <Globe size={18} className="text-blue-600 dark:text-blue-400" /> */}
                <span className="font-semibold">Region:</span>
                <span>{country.region} {country.subregion ? `(${country.subregion})` : ''}</span>
              </div>
              
              <div className="flex items-start gap-2">
                {/* <Languages size={18} className="text-blue-600 dark:text-blue-400 mt-0.5" /> */}
                <span className="font-semibold">Languages:</span>
                <span>
                  {country.languages 
                    ? Object.values(country.languages).join(', ') 
                    : 'N/A'}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-2">
                {/* <Landmark size={18} className="text-blue-600 dark:text-blue-400 mt-0.5" /> */}
                <span className="font-semibold">Currencies:</span>
                <span>
                  {country.currencies
                    ? Object.values(country.currencies)
                        .map(currency => `${currency.name} ${currency.symbol ? `(${currency.symbol})` : ''}`)
                        .join(', ')
                    : 'N/A'}
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                {/* <Users size={18} className="text-blue-600 dark:text-blue-400" /> */}
                <span className="font-semibold">Population:</span>
                <span>{formatPopulation(country.population)}</span>
              </div>
              
              {country.area && (
                <div className="flex items-center gap-2">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="18" 
                    height="18" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="text-blue-600 dark:text-blue-400"
                  >
                    <path d="M3 6l6-3 6 3 6-3v12l-6 3-6-3-6 3V6z"></path>
                  </svg>
                  <span className="font-semibold">Area:</span>
                  <span>{new Intl.NumberFormat().format(country.area)} km²</span>
                </div>
              )}
            </div>
          </div>

          {country.borders && country.borders.length > 0 && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Neighboring Countries</h2>
              <div className="flex flex-wrap gap-2">
                {country.borders.map((border) => (
                  <span 
                    key={border} 
                    className="px-3 py-1 bg-slate-100 dark:bg-slate-700 rounded-full text-sm"
                  >
                    {border}
                  </span>
                ))}
              </div>
            </div>
          )}

          {country.timezones && country.timezones.length > 0 && (
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-4">Timezones</h2>
              <div className="flex flex-wrap gap-2">
                {country.timezones.map((timezone) => (
                  <span 
                    key={timezone} 
                    className="px-3 py-1 bg-slate-100 dark:bg-slate-700 rounded-full text-sm"
                  >
                    {timezone}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CountryDetail;