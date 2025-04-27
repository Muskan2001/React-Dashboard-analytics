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
        country: "India",
        state: "Maharashtra",
        city: "Mumbai",
        sector: "Retail",
        category: "Juice",
        startDate: "2024-04-01",
        endDate: "2024-04-30",
        mySpend: {
          current: 120000,
          reference: 100000,
          absoluteChange: 20000,
          percentChange: 20
        },
        sameStoreSpend: {
          current: 95000,
          reference: 90000,
          absoluteChange: 5000,
          percentChange: 5.56
        },
        newStoreSpend: {
          current: 15000,
          reference: 10000,
          absoluteChange: 5000,
          percentChange: 50
        },
        lostStoreSpend: {
          current: 10000,
          reference: 15000,
          absoluteChange: -5000,
          percentChange: -33.33
        }
      },
      {
        country: "India",
        state: "Karnataka",
        city: "Bengaluru",
        sector: "Retail",
        category: "Snacks",
        startDate: "2024-04-01",
        endDate: "2024-04-30",
        mySpend: {
          current: 90000,
          reference: 85000,
          absoluteChange: 5000,
          percentChange: 5.88
        },
        sameStoreSpend: {
          current: 70000,
          reference: 75000,
          absoluteChange: -5000,
          percentChange: -6.67
        },
        newStoreSpend: {
          current: 10000,
          reference: 5000,
          absoluteChange: 5000,
          percentChange: 100
        },
        lostStoreSpend: {
          current: 10000,
          reference: 5000,
          absoluteChange: 5000,
          percentChange: 100
        }
      },
      {
        country: "USA",
        state: "California",
        city: "San Francisco",
        sector: "Hospitality",
        category: "Beverages",
        startDate: "2024-04-01",
        endDate: "2024-04-30",
        mySpend: {
          current: 130000,
          reference: 110000,
          absoluteChange: 20000,
          percentChange: 18.18
        },
        sameStoreSpend: {
          current: 100000,
          reference: 95000,
          absoluteChange: 5000,
          percentChange: 5.26
        },
        newStoreSpend: {
          current: 20000,
          reference: 10000,
          absoluteChange: 10000,
          percentChange: 100
        },
        lostStoreSpend: {
          current: 10000,
          reference: 15000,
          absoluteChange: -5000,
          percentChange: -33.33
        }
      },
      {
        country: "USA",
        state: "Texas",
        city: "Austin",
        sector: "Retail",
        category: "Frozen Foods",
        startDate: "2024-04-01",
        endDate: "2024-04-30",
        mySpend: {
          current: 80000,
          reference: 70000,
          absoluteChange: 10000,
          percentChange: 14.29
        },
        sameStoreSpend: {
          current: 60000,
          reference: 55000,
          absoluteChange: 5000,
          percentChange: 9.09
        },
        newStoreSpend: {
          current: 10000,
          reference: 10000,
          absoluteChange: 0,
          percentChange: 0
        },
        lostStoreSpend: {
          current: 10000,
          reference: 5000,
          absoluteChange: 5000,
          percentChange: 100
        }
      }
];

function DashboardPage() {
  const [tab, setTab] = useState(0);
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [filters, setFilters] = useState<any>({});
  const [filteredData, setFilteredData] = useState<any[]>([]);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  const handleUserSelect = (userId: number) => {
    setSelectedUser(userId);
  };

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  useEffect(() => {
    let data = [...mockData];

    if (filters.startDate && filters.endDate) {
      data = data.filter(item => {
        const itemDate = new Date(item.startDate);
        return itemDate >= filters.startDate && itemDate <= filters.endDate;
      });
    }

    if (filters.sector) {
      data = data.filter(item => item.sector === filters.sector);
    }

    if (filters.category) {
      data = data.filter(item => item.category === filters.category);
    }

    setFilteredData(data);
  }, [filters, selectedUser]);

  const tableData = filteredData.map((item) => ({
    country: item.country,
    state:item.state,
    city: item.city,
    sector: item.sector,
    category: item.category,
    spend: item.mySpend.current,
    percentChange: item.mySpend.percentChange,
    absoluteChange: item.mySpend.absoluteChange,
    samestorespend:item.sameStoreSpend.current,
    newstorespend:item.newStoreSpend.current,
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
      <TopBar onUserSelect={handleUserSelect} />
      <Container maxWidth="lg" sx={{ paddingY: 4 }}>
        <Tabs value={tab} onChange={handleTabChange}>
          <Tab label="Metrics View" />
          <Tab label="Analytics View" />
        </Tabs>
        {tab === 0 && (
          <>
            <FilterPanel onFilterChange={handleFilterChange} />
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
                data={[
                  {
                    id: 'My Spend',
                    data: [
                      { x: 'Jan', y: 10000 },
                      { x: 'Feb', y: 15000 },
                      { x: 'Mar', y: 20000 },
                      { x: 'Apr', y: 25000 },
                    ],
                  },
                  {
                    id: 'New Store Spend',
                    data: [
                      { x: 'Jan', y: 5000 },
                      { x: 'Feb', y: 7000 },
                      { x: 'Mar', y: 10000 },
                      { x: 'Apr', y: 12000 },
                    ],
                  },
                ]}
              />
          
<PercentChangeBarChart
                data={[
                  { category: 'Juice', percentChange: 20 },
                  { category: 'Snacks', percentChange: 5.88 },
                  { category: 'Beverages', percentChange: 18.18 },
                  { category: 'Frozen Foods', percentChange: 14.29 },
                ]}
              />
            </>
          )}
          
=      </Container>
    </>
  );
}

export default DashboardPage;
