import { Container, Tab, Tabs } from '@mui/material';
import { useState, useEffect } from 'react';
import TopBar from '../components/TopBar';
import FilterPanel from '../components/FilterPanel';
import DataTable from '../components/DataTable';
import BarChart from '../components/BarChart';
import TimeSeriesChart from '../components/TimeSeriesChart';
import PercentChangeBarChart from '../components/PercentChangeChartBar';

const mockData = [
  {
    id: 1,
    country: "India",
    state: "Maharashtra",
    city: "Mumbai",
    sector: "Food",
    category: "Juice",
    startDate: "2025-04-01",
    endDate: "2025-04-03",
    mySpend: { current: 120000, reference: 100000, absoluteChange: 20000, percentChange: 20 },
    sameStoreSpend: { current: 95000, reference: 90000, absoluteChange: 5000, percentChange: 5.56 },
    newStoreSpend: { current: 15000, reference: 10000, absoluteChange: 5000, percentChange: 50 },
    lostStoreSpend: { current: 10000, reference: 15000, absoluteChange: -5000, percentChange: -33.33 }
  },
  {
    id: 1,
    country: "USA",
    state: "California",
    city: "San Francisco",
    sector: "Food",
    category: "Juice",
    startDate: "2025-04-03",
    endDate: "2025-04-03",
    mySpend: { current: 130000, reference: 110000, absoluteChange: 20000, percentChange: 18.18 },
    sameStoreSpend: { current: 100000, reference: 95000, absoluteChange: 5000, percentChange: 5.26 },
    newStoreSpend: { current: 20000, reference: 10000, absoluteChange: 10000, percentChange: 100 },
    lostStoreSpend: { current: 10000, reference: 15000, absoluteChange: -5000, percentChange: -33.33 }
  },
  {
    id: 2,
    country: "USA",
    state: "California",
    city: "San Francisco",
    sector: "Retail",
    category: "Electronics",
    startDate: "2025-04-05",
    endDate: "2025-04-05",
    mySpend: { current: 130000, reference: 110000, absoluteChange: 20000, percentChange: 18.18 },
    sameStoreSpend: { current: 100000, reference: 95000, absoluteChange: 5000, percentChange: 5.26 },
    newStoreSpend: { current: 20000, reference: 10000, absoluteChange: 10000, percentChange: 100 },
    lostStoreSpend: { current: 10000, reference: 15000, absoluteChange: -5000, percentChange: -33.33 }
  },
  
    {
      id: 2,
      country: "Canada",
      state: "Ontario",
      city: "Toronto",
      sector: "Retail",
      category: "Electronics",
      startDate: "2024-04-01",
      endDate: "2024-04-30",
      mySpend: { current: 200000, reference: 180000, absoluteChange: 20000, percentChange: 11.11 },
      sameStoreSpend: { current: 150000, reference: 145000, absoluteChange: 5000, percentChange: 3.45 },
      newStoreSpend: { current: 40000, reference: 25000, absoluteChange: 15000, percentChange: 60 },
      lostStoreSpend: { current: 10000, reference: 15000, absoluteChange: -5000, percentChange: -33.33 }
    },
    {
      id: 3,
      country: "Canada",
      state: "Ontario",
      city: "Toronto",
      sector: "Industrial",
      category: "Parts",
      startDate: "2024-04-01",
      endDate: "2024-04-30",
      mySpend: { current: 200000, reference: 180000, absoluteChange: 20000, percentChange: 11.11 },
      sameStoreSpend: { current: 150000, reference: 145000, absoluteChange: 5000, percentChange: 3.45 },
      newStoreSpend: { current: 40000, reference: 25000, absoluteChange: 15000, percentChange: 60 },
      lostStoreSpend: { current: 10000, reference: 15000, absoluteChange: -5000, percentChange: -33.33 }
    },
    {
      id: 4,
      country: "UK",
      state: "England",
      city: "London",
      sector: "Industrial",
      category: "Mobile Devices",
      startDate: "2024-04-01",
      endDate: "2024-04-30",
      mySpend: { current: 200000, reference: 180000, absoluteChange: 20000, percentChange: 11.11 },
      sameStoreSpend: { current: 150000, reference: 145000, absoluteChange: 5000, percentChange: 3.45 },
      newStoreSpend: { current: 40000, reference: 25000, absoluteChange: 15000, percentChange: 60 },
      lostStoreSpend: { current: 10000, reference: 15000, absoluteChange: -5000, percentChange: -33.33 }
    },
   
    {
      id: 4,
      country: "India",
      state: "Maharashtra",
      city: "Pune",
      sector: "Industrial",
      category: "Mobile Devices",
      startDate: "2024-04-01",
      endDate: "2024-04-30",
      mySpend: { current: 200000, reference: 180000, absoluteChange: 20000, percentChange: 11.11 },
      sameStoreSpend: { current: 150000, reference: 145000, absoluteChange: 5000, percentChange: 3.45 },
      newStoreSpend: { current: 40000, reference: 25000, absoluteChange: 15000, percentChange: 60 },
      lostStoreSpend: { current: 10000, reference: 15000, absoluteChange: -5000, percentChange: -33.33 }
    },
  
  
];

function DashboardPage() {
  const [tab, setTab] = useState(0);
  const [selectedUser, setSelectedUser] = useState<number | null>(null); 
 
  const [filters, setFilters] = useState<any>({
    startDate: null,
    endDate: null,
    sector: null,
    category: [],
    countries: []
  }); 

  const [filteredData, setFilteredData] = useState<any[]>([]);
  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  const handleUserSelect = (userId: number) => {
    setFilters({
      startDate: null,
      endDate: null,
      sector: null,
      category: [],
      countries: []
    });
  
    setSelectedUser(userId);
  };
  

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters); 
  };

  
  
  


  useEffect(() => {
    let data = [...mockData];
  
    if (filters.startDate && filters.endDate) {
      const startDate = new Date(filters.startDate);
      const endDate = new Date(filters.endDate);
      data = data.filter(item => {
        const itemStartDate = new Date(item.startDate);
        return itemStartDate >= startDate && itemStartDate <= endDate;
      });
    }
  
    if (filters.startDate && !filters.endDate) {
      const startDate = new Date(filters.startDate);
      data = data.filter(item => new Date(item.startDate) >= startDate);
    }
  
    if (!filters.startDate && filters.endDate) {
      const endDate = new Date(filters.endDate);
      data = data.filter(item => new Date(item.startDate) <= endDate);
    }
  
    if (filters.sector && filters.sector !== '') {
      data = data.filter(item => item.sector === filters.sector);
    }
  
    if (filters.category && filters.category.length > 0) {
      data = data.filter(item => filters.category.includes(item.category));
    }
  
    if (filters.countries && filters.countries.length > 0) {
      data = data.filter(item => filters.countries.includes(item.country));
    }
  
    if (selectedUser !== null) {
      data = data.filter(item => item.id === selectedUser);
    }
  
    setFilteredData(data);
  }, [filters, selectedUser]);  
  
  const tableData = filteredData.map((item) => ({
    country: item.country,
    state: item.state,
    city: item.city,
    sector: item.sector,
    category: item.category,
    spend: item.mySpend.current,
    percentChange: item.mySpend.percentChange,
    absoluteChange: item.mySpend.absoluteChange,
    samestorespend: item.sameStoreSpend.current,
    newstorespend: item.newStoreSpend.current,
    loststorespend: item.lostStoreSpend.current
  }));

  const barChartData = filteredData.map((item) => ({
    category: item.category,
    mySpend: item.mySpend.current,
    newStoreSpend: item.newStoreSpend.current,
    lostStoreSpend: item.lostStoreSpend.current,
    sameStoreSpend: item.sameStoreSpend.current,
  }));

  return (
    <>
      <Container maxWidth="lg" sx={{ paddingY: 4 }}>
        <Tabs value={tab} onChange={handleTabChange}>
          <Tab label="Metrics View" />
          <Tab label="Analytics View" />
        </Tabs>

        {tab === 0 && (
          <>
          
            <TopBar onUserSelect={handleUserSelect} /> {/* User selection in TopBar */}
            <FilterPanel onFilterChange={handleFilterChange} />
            {/* <FilterPanel filters={filters} onFilterChange={handleFilterChange} /> */}
            <DataTable data={tableData} />
            <BarChart
              data={barChartData}
              keys={['mySpend', 'newStoreSpend']}
              indexBy="category"
            />
          </>
        )}

        {tab === 1 && (
          <>
            <TimeSeriesChart
              data={[{ id: 'My Spend', data: [{ x: 'Jan', y: 10000 }, { x: 'Feb', y: 15000 }, { x: 'Mar', y: 20000 }, { x: 'Apr', y: 25000 }] }]}
            />
            <PercentChangeBarChart
              data={[{ category: 'Juice', percentChange: 20 }, { category: 'Snacks', percentChange: 5.88 }, { category: 'Beverages', percentChange: 18.18 }, { category: 'Frozen Foods', percentChange: 14.29 }]}
            />
          </>
        )}
      </Container>
    </>
  );
}

export default DashboardPage;
