import { render, screen, fireEvent } from '@testing-library/react';
import RegionFilter from '../../components/filters/RegionFilter';

describe('RegionFilter', () => {
  const mockOnFilterChange = vi.fn();

  beforeEach(() => {
    mockOnFilterChange.mockClear();
  });

  it('renders filter button with default text', () => {
    render(<RegionFilter onFilterChange={mockOnFilterChange} />);
    expect(screen.getByText('Filter by Region')).toBeInTheDocument();
  });

  it('shows region options when clicked', () => {
    render(<RegionFilter onFilterChange={mockOnFilterChange} />);
    
    fireEvent.click(screen.getByText('Filter by Region'));
    
    expect(screen.getByText('All Regions')).toBeInTheDocument();
    expect(screen.getByText('Europe')).toBeInTheDocument();
    expect(screen.getByText('Asia')).toBeInTheDocument();
    expect(screen.getByText('Africa')).toBeInTheDocument();
    expect(screen.getByText('Americas')).toBeInTheDocument();
    expect(screen.getByText('Oceania')).toBeInTheDocument();
  });

  it('calls onFilterChange when region is selected', () => {
    render(<RegionFilter onFilterChange={mockOnFilterChange} />);
    
    fireEvent.click(screen.getByText('Filter by Region'));
    fireEvent.click(screen.getByText('Europe'));
    
    expect(mockOnFilterChange).toHaveBeenCalledWith('Europe');
  });

  it('updates selected region text when region is selected', () => {
    render(<RegionFilter onFilterChange={mockOnFilterChange} />);
    
    fireEvent.click(screen.getByText('Filter by Region'));
    fireEvent.click(screen.getByText('Europe'));
    
    expect(screen.getByText('Europe')).toBeInTheDocument();
    expect(screen.queryByText('Filter by Region')).not.toBeInTheDocument();
  });

  it('closes dropdown after selection', () => {
    render(<RegionFilter onFilterChange={mockOnFilterChange} />);
    
    fireEvent.click(screen.getByText('Filter by Region'));
    fireEvent.click(screen.getByText('Europe'));
    
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });
});