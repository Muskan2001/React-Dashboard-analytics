import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import DashboardPage from '../pages/DashboardPage'; 
import '@testing-library/jest-dom';

jest.mock('../components/TopBar', () => (props: any) => (
  <div data-testid="topbar" onClick={() => props.onUserSelect(1)}>Mocked TopBar</div>
));
jest.mock('../components/FilterPanel', () => (props: any) => (
  <div data-testid="filterpanel" onClick={() => props.onFilterChange({ sector: 'Food' })}>Mocked FilterPanel</div>
));
jest.mock('../components/DataTable', () => (props: any) => (
  <div data-testid="datatable">Mocked DataTable with {props.data.length} rows</div>
));
jest.mock('../components/BarChart', () => () => (
  <div data-testid="barchart">Mocked BarChart</div>
));
jest.mock('../components/TimeSeriesChart', () => () => (
  <div data-testid="timeserieschart">Mocked TimeSeriesChart</div>
));
jest.mock('../components/PercentChangeChartBar', () => () => (
  <div data-testid="percentchangechart">Mocked PercentChangeChart</div>
));

describe('DashboardPage', () => {
  test('renders the DashboardPage with Metrics View by default', () => {
    render(<DashboardPage />);

    expect(screen.getByRole('tab', { name: 'Metrics View' })).toHaveAttribute('aria-selected', 'true');

    expect(screen.getByTestId('topbar')).toBeInTheDocument();
    expect(screen.getByTestId('filterpanel')).toBeInTheDocument();
    expect(screen.getByTestId('datatable')).toBeInTheDocument();
    expect(screen.getByTestId('barchart')).toBeInTheDocument();
  });

  test('switches to Analytics View when tab is clicked', async () => {
    render(<DashboardPage />);

    const analyticsTab = screen.getByRole('tab', { name: 'Analytics View' });
    fireEvent.click(analyticsTab);

    await waitFor(() => {
      expect(screen.getByTestId('timeserieschart')).toBeInTheDocument();
      expect(screen.getByTestId('percentchangechart')).toBeInTheDocument();
    });

    expect(screen.queryByTestId('topbar')).not.toBeInTheDocument();
    expect(screen.queryByTestId('datatable')).not.toBeInTheDocument();
  });

  test('applies user selection when TopBar is clicked', async () => {
    render(<DashboardPage />);

    fireEvent.click(screen.getByTestId('topbar'));

    await waitFor(() => {
      expect(screen.getByTestId('datatable')).toHaveTextContent('Mocked DataTable with');
    });
  });

  test('applies filters when FilterPanel is clicked', async () => {
    render(<DashboardPage />);

    fireEvent.click(screen.getByTestId('filterpanel'));

    await waitFor(() => {
      expect(screen.getByTestId('datatable')).toHaveTextContent('Mocked DataTable with');
    });
  });
});
