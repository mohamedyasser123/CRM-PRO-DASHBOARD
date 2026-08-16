import React from 'react';
import { TablePagination, Box, type TablePaginationProps } from '@mui/material';

interface CustomPaginationProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (newPage: number) => void;
  onRowsPerPageChange?: (newRowsPerPage: number) => void;
  rowsPerPageOptions?: number[];
}

export const CustomPagination: React.FC<CustomPaginationProps> = ({
  count,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  rowsPerPageOptions = [5, 10, 25, 50],
}) => {
  const handleChangePage: TablePaginationProps['onPageChange'] = (_, newPage) => {
    onPageChange(newPage);
  };

  const handleChangeRowsPerPage: TablePaginationProps['onRowsPerPageChange'] = (event) => {
    if (onRowsPerPageChange) {
      onRowsPerPageChange(parseInt(event.target.value, 10));
      onPageChange(0); 
    }
  };

  return (
    <Box className="flex justify-end items-center bg-white border-t border-slate-200 px-4 py-2 rounded-b-xl">
      <TablePagination
        component="div"
        count={count}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={onRowsPerPageChange ? handleChangeRowsPerPage : undefined}
        rowsPerPageOptions={rowsPerPageOptions}
        sx={{
          borderBottom: 'none',
          '.MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows': {
            fontSize: '0.875rem',
            color: '#64748b',
            fontWeight: 500,
          },
          '.MuiTablePagination-select': {
            borderRadius: '0.375rem',
            paddingY: '0.25rem',
          },
        }}
      />
    </Box>
  );
};