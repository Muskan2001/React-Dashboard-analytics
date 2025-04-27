import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  OutlinedInput,
  Checkbox,
  ListItemText,
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useState } from 'react';

const sectors = ['Retail', 'Food', 'Industrial'];
const categories = ['Juice', 'Snacks', 'Frozen Foods', 'Beverages'];
const attributes = ['Country', 'State', 'City', 'Sector', 'Category'];
const country = ['India', 'USA', 'Canada', 'Russia', 'Auntralia'];
const state = ['Maharashtra', 'Madhya Pradesh', 'Canada', 'Russia', 'Auntralia'];

const metrics = ['My Spend', 'Same Store Spend', 'New Store Spend', 'Lost Store Spend'];

interface FilterPanelProps {
  onFilterChange: (filters: any) => void;
}

const FilterPanel = ({ onFilterChange }: FilterPanelProps) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [selectedSector, setSelectedSector] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [groupingAttributes, setGroupingAttributes] = useState<string[]>([]);
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([]);

  const handleFilterChange = () => {
    onFilterChange({
      startDate,
      endDate,
      sector: selectedSector,
      category: selectedCategory,
      groupingAttributes,
      selectedMetrics,
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

        <FormControl sx={{ minWidth: 150 }}>
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

        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Category</InputLabel>
          <Select
            value={selectedCategory}
            label="Category"
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              handleFilterChange();
            }}
          >
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
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
                <Checkbox checked={groupingAttributes.indexOf(attr) > -1} />
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
                <Checkbox checked={selectedMetrics.indexOf(metric) > -1} />
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
