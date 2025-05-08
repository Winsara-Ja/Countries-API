import '@testing-library/jest-dom';
import { afterAll, afterEach, beforeAll } from 'vitest';
import { setupServer } from 'msw/node';
import { HttpResponse, http } from 'msw';

const mockCountries = [
  {
    name: {
      common: 'Finland',
      official: 'Republic of Finland'
    },
    flags: {
      png: 'https://flagcdn.com/w320/fi.png',
      alt: 'The flag of Finland'
    },
    capital: ['Helsinki'],
    region: 'Europe',
    languages: { fin: 'Finnish', swe: 'Swedish' },
    currencies: { EUR: { name: 'Euro', symbol: '€' } },
    population: 5530719
  }
];

export const handlers = [
  http.get('https://restcountries.com/v3.1/all', () => {
    return HttpResponse.json(mockCountries);
  }),
  
  http.get('https://restcountries.com/v3.1/name/Finland', () => {
    return HttpResponse.json([mockCountries[0]]);
  })
];

const server = setupServer(...handlers);

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterAll(() => server.close());
afterEach(() => server.resetHandlers());