import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, TableSortLabel, TablePagination, Typography
} from '@mui/material';
import { useState } from 'react';

interface DataRow {
  country: string;
  state: string;
  city: string;
  sector: string;
  category: string;
  spend: number;
  percentChange: number;
  absoluteChange: number;
  samestorespend: number;
  newstorespend: number;
  loststorespend: number;
}

interface DataTableProps {
  data: DataRow[];
}

const columns = [
  { id: 'country', label: 'Country' },
  { id: 'state', label: 'State' },
  { id: 'city', label: 'City' },
  { id: 'sector', label: 'Sector' },
  { id: 'category', label: 'Category' },
  { id: 'spend', label: 'My Spend' },
  { id: 'percentChange', label: '% Change' },
  { id: 'absoluteChange', label: 'Absolute Change' },
  { id: 'samestorespend', label: 'Same Store Spend' },
  { id: 'newstorespend', label: 'New Store Spend' },
  { id: 'loststorespend', label: 'Lost Store Spend' },
];

const DataTable = ({ data }: DataTableProps) => {
  const [orderBy, setOrderBy] = useState<keyof DataRow>('spend');
  const [order, setOrder] = useState<'asc' | 'desc'>('desc');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (property: keyof DataRow) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const sortedData = [...data].sort((a, b) => {
    if (order === 'asc') {
      return a[orderBy] > b[orderBy] ? 1 : -1;
    }
    return a[orderBy] < b[orderBy] ? 1 : -1;
  });

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', mt: 4, borderRadius: 3, boxShadow: 3 }}>
      <Typography variant="h6" sx={{ p: 2, pb: 0 }}>
        Member Metrics Table
      </Typography>
      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  sortDirection={orderBy === column.id ? order : false}
                  sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}
                >
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={orderBy === column.id ? order : 'asc'}
                    onClick={() => handleRequestSort(column.id as keyof DataRow)}
                  >
                    {column.label}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, idx) => (
              <TableRow key={idx} hover>
                <TableCell>{row.country}</TableCell>
                <TableCell>{row.state}</TableCell>
                <TableCell>{row.city}</TableCell>
                <TableCell>{row.sector}</TableCell>
                <TableCell>{row.category}</TableCell>
                <TableCell>{row.spend.toLocaleString()}</TableCell>
                <TableCell>{row.percentChange}%</TableCell>
                <TableCell>{row.absoluteChange.toLocaleString()}</TableCell>
                <TableCell>{row.samestorespend.toLocaleString()}</TableCell>
                <TableCell>{row.newstorespend.toLocaleString()}</TableCell>
                <TableCell>{row.loststorespend.toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={data.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Paper>
  );
};

export default DataTable;
