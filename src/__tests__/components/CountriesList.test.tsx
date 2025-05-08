import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CountriesList from '../../components/countries/CountriesList';

describe('CountriesList', () => {
  const renderComponent = (props = {}) => {
    return render(
      <BrowserRouter>
        <CountriesList searchQuery="" regionFilter="" {...props} />
      </BrowserRouter>
    );
  };

  it('displays loading state initially', () => {
    renderComponent();
    expect(screen.getAllByTestId('country-card-skeleton')).toHaveLength(8);
  });

  it('displays countries after loading', async () => {
    renderComponent();
    
    await waitFor(() => {
      expect(screen.getByText('Finland')).toBeInTheDocument();
    });
    
    expect(screen.getByText('Helsinki')).toBeInTheDocument();
    expect(screen.getByText('5,530,719')).toBeInTheDocument();
  });

  it('filters countries by search query', async () => {
    renderComponent({ searchQuery: 'fin' });
    
    await waitFor(() => {
      expect(screen.getByText('Finland')).toBeInTheDocument();
    });
  });

  it('filters countries by region', async () => {
    renderComponent({ regionFilter: 'Europe' });
    
    await waitFor(() => {
      expect(screen.getByText('Finland')).toBeInTheDocument();
    });
  });

  it('shows no results message when no countries match filters', async () => {
    renderComponent({ searchQuery: 'xyz' });
    
    await waitFor(() => {
      expect(screen.getByText(/No countries match your search criteria/)).toBeInTheDocument();
    });
  });
});