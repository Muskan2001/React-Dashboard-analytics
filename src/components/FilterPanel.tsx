import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  OutlinedInput,
  Checkbox,
  ListItemText,
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useState } from 'react';

const sectors = ['Retail', 'Food', 'Industrial'];
const categories = ['Juice', 'Mobile Devices', 'Electronics', 'Parts', 'Beverages'];
const attributes = ['Country', 'State', 'City', 'Sector', 'Category'];
const countries = ['India', 'USA', 'Canada', 'UK', 'Australia'];
const metrics = ['My Spend', 'Same Store Spend', 'New Store Spend', 'Lost Store Spend'];

interface FilterPanelProps {
  onFilterChange: (filters: any) => void;
}

const FilterPanel = ({ onFilterChange }: FilterPanelProps) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [selectedSector, setSelectedSector] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [groupingAttributes, setGroupingAttributes] = useState<string[]>([]);
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);

  const handleFilterChange = () => {
    onFilterChange({
      startDate,
      endDate,
      sector: selectedSector,
      categories: selectedCategories,
      groupingAttributes,
      selectedMetrics,
      countries: selectedCountries,
    });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box display="flex" flexWrap="wrap" gap={2} my={3}>
        <DatePicker
          label="Start Date"
          value={startDate}
          maxDate={new Date()}
          onChange={(newValue) => {
            setStartDate(newValue);
            handleFilterChange();
          }}
          slotProps={{ textField: { fullWidth: true } }}
        />
        <DatePicker
          label="End Date"
          value={endDate}
          minDate={startDate || undefined}
          maxDate={new Date()}
          onChange={(newValue) => {
            setEndDate(newValue);
            handleFilterChange();
          }}
          slotProps={{ textField: { fullWidth: true } }}
        />

        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Country</InputLabel>
          <Select
            multiple
            value={selectedCountries}
            onChange={(e) => {
              const value = e.target.value as string[];
              setSelectedCountries(value);
              handleFilterChange();
            }}
            input={<OutlinedInput label="Country" />}
            renderValue={(selected) => selected.join(', ')}
          >
            {countries.map((country) => (
              <MenuItem key={country} value={country}>
                <Checkbox checked={selectedCountries.includes(country)} />
                <ListItemText primary={country} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Sector</InputLabel>
          <Select
            value={selectedSector}
            label="Sector"
            onChange={(e) => {
              setSelectedSector(e.target.value);
              handleFilterChange();
            }}
          >
            {sectors.map((sector) => (
              <MenuItem key={sector} value={sector}>
                {sector}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Category</InputLabel>
          <Select
            multiple
            value={selectedCategories}
            onChange={(e) => {
              const value = e.target.value as string[];
              setSelectedCategories(value);
              handleFilterChange();
            }}
            input={<OutlinedInput label="Category" />}
            renderValue={(selected) => selected.join(', ')}
          >
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat}>
                <Checkbox checked={selectedCategories.includes(cat)} />
                <ListItemText primary={cat} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Grouping Attributes</InputLabel>
          <Select
            multiple
            value={groupingAttributes}
            onChange={(e) => {
              const value = typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value;
              setGroupingAttributes(value);
              handleFilterChange();
            }}
            input={<OutlinedInput label="Grouping Attributes" />}
            renderValue={(selected) => selected.join(', ')}
          >
            {attributes.map((attr) => (
              <MenuItem key={attr} value={attr}>
                <Checkbox checked={groupingAttributes.includes(attr)} />
                <ListItemText primary={attr} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Metrics</InputLabel>
          <Select
            multiple
            value={selectedMetrics}
            onChange={(e) => {
              const value = typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value;
              setSelectedMetrics(value);
              handleFilterChange();
            }}
            input={<OutlinedInput label="Metrics" />}
            renderValue={(selected) => selected.join(', ')}
          >
            {metrics.map((metric) => (
              <MenuItem key={metric} value={metric}>
                <Checkbox checked={selectedMetrics.includes(metric)} />
                <ListItemText primary={metric} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </LocalizationProvider>
  );
};

export default FilterPanel;
