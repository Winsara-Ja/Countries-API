import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../SearchBar';

describe('SearchBar', () => {
  const mockOnSearch = vi.fn();

  beforeEach(() => {
    mockOnSearch.mockClear();
  });

  it('renders search input', () => {
    render(<SearchBar onSearch={mockOnSearch} />);
    expect(screen.getByPlaceholderText('Search countries...')).toBeInTheDocument();
  });

  it('calls onSearch when input value changes', () => {
    render(<SearchBar onSearch={mockOnSearch} />);
    
    const input = screen.getByPlaceholderText('Search countries...');
    fireEvent.change(input, { target: { value: 'fin' } });
    
    expect(mockOnSearch).toHaveBeenCalledWith('fin');
  });

  it('updates input value when typing', () => {
    render(<SearchBar onSearch={mockOnSearch} />);
    
    const input = screen.getByPlaceholderText('Search countries...');
    fireEvent.change(input, { target: { value: 'finland' } });
    
    expect(input).toHaveValue('finland');
  });
});