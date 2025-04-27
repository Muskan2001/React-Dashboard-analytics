
import { UserData } from '../types/dataTypes';

export const mockUsers = [
  { id: 1, name: 'User One' },
  { id: 2, name: 'User Two' },
  { id: 3, name: 'User Three' },
  { id: 4, name: 'User Four' },
  { id: 5, name: 'User Five' },
];

export const mockData: UserData[] = [
  {
    country: "India",
    state: "Maharashtra",
    city: "Mumbai",
    sector: "Retail",
    category: "Juice",
    startDate: "2024-04-01",
    endDate: "2024-04-30",
    mySpend: { current: 120000, reference: 100000, absoluteChange: 20000, percentChange: 20 },
    sameStoreSpend: { current: 95000, reference: 90000, absoluteChange: 5000, percentChange: 5.56 },
    newStoreSpend: { current: 15000, reference: 10000, absoluteChange: 5000, percentChange: 50 },
    lostStoreSpend: { current: 10000, reference: 15000, absoluteChange: -5000, percentChange: -33.33 },
  },

];
const mockChartData = [
  {
    category: 'Juice',
    mySpend: 120000,
    sameStoreSpend: 95000,
    newStoreSpend: 15000,
    lostStoreSpend: 10000,
  },
  {
    category: 'Snacks',
    mySpend: 90000,
    sameStoreSpend: 70000,
    newStoreSpend: 10000,
    lostStoreSpend: 10000,
  },
  {
    category: 'Beverages',
    mySpend: 130000,
    sameStoreSpend: 100000,
    newStoreSpend: 20000,
    lostStoreSpend: 10000,
  },
  {
    category: 'Frozen Foods',
    mySpend: 80000,
    sameStoreSpend: 60000,
    newStoreSpend: 10000,
    lostStoreSpend: 10000,
  },
];
