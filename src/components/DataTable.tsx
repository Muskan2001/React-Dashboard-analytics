import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, TableSortLabel, TablePagination
} from '@mui/material';
import { useState } from 'react';

interface DataRow {
  sector: string;
  category: string;
  spend: number;
  percentChange: number;
  absoluteChange: number;
}

interface DataTableProps {
  data: DataRow[];
}

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
    <Paper sx={{ width: '100%', overflow: 'hidden', marginTop: 4 }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {['sector', 'category', 'spend', 'percentChange', 'absoluteChange'].map((key) => (
                <TableCell key={key}>
                  <TableSortLabel
                    active={orderBy === key}
                    direction={orderBy === key ? order : 'asc'}
                    onClick={() => handleRequestSort(key as keyof DataRow)}
                  >
                    {key === 'sector' && 'Sector'}
                    {key === 'category' && 'Category'}
                    {key === 'spend' && 'Spend'}
                    {key === 'percentChange' && '% Change'}
                    {key === 'absoluteChange' && 'Absolute Change'}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, idx) => (
              <TableRow key={idx}>
                <TableCell>{row.sector}</TableCell>
                <TableCell>{row.category}</TableCell>
                <TableCell>{row.spend}</TableCell>
                <TableCell>{row.percentChange}%</TableCell>
                <TableCell>{row.absoluteChange}</TableCell>
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
