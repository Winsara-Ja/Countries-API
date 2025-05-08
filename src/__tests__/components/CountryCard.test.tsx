import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CountryCard from '../../components/countries/CountryCard';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('CountryCard', () => {
  const mockCountry = {
    name: {
      common: 'Finland'
    },
    flags: {
      png: 'https://flagcdn.com/w320/fi.png',
      alt: 'Flag of Finland'
    },
    capital: ['Helsinki'],
    languages: { fin: 'Finnish', swe: 'Swedish' },
    region: 'Europe',
    currencies: { EUR: { name: 'Euro', symbol: '€' } },
    population: 5530719
  };

  const renderComponent = () => {
    return render(
      <BrowserRouter>
        <CountryCard country={mockCountry} />
      </BrowserRouter>
    );
  };

  it('displays country information correctly', () => {
    renderComponent();
    
    expect(screen.getByText('Finland')).toBeInTheDocument();
    expect(screen.getByText('Helsinki')).toBeInTheDocument();
    expect(screen.getByText('Europe')).toBeInTheDocument();
    expect(screen.getByText('Finnish, Swedish')).toBeInTheDocument();
    expect(screen.getByText('Euro (€)')).toBeInTheDocument();
    expect(screen.getByText('5,530,719')).toBeInTheDocument();
  });

  it('navigates to country detail page on click', () => {
    renderComponent();
    
    fireEvent.click(screen.getByText('Finland'));
    expect(mockNavigate).toHaveBeenCalledWith('/country/Finland');
  });

  it('displays flag image with correct alt text', () => {
    renderComponent();
    
    const flagImage = screen.getByAltText('Flag of Finland');
    expect(flagImage).toBeInTheDocument();
    expect(flagImage).toHaveAttribute('src', 'https://flagcdn.com/w320/fi.png');
  });
});