import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  IconButton,
  Tooltip,
  Skeleton,
  Alert,
  Box,
  Typography,
} from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';

import { StatusChip } from './StatusChip';
import type { Customer } from '../types/customer';
import { CustomPagination } from '../../../components/common/CustomPagination';

interface CustomerTableProps {
  data?: Customer[];
  isLoading: boolean;
  isError: boolean;
  onView: (customer: Customer) => void; 
  onEdit: (customer: Customer) => void;  
}

export const CustomerTable: React.FC<CustomerTableProps> = ({ 
  data, 
  isLoading, 
  isError,
  onView,
  onEdit
}) => {
  if (isLoading) {
    return (
      <Paper variant="outlined" className="p-4">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} animation="wave" height={60} className="my-1" />
        ))}
      </Paper>
    );
  }

  if (isError) {
    return (
      <Alert severity="error" variant="outlined" className="rounded-xl">
        Failed to load customers list. Please try again.
      </Alert>
    );
  }
const [page, setPage] = useState(0);

const [rowsPerPage, setRowsPerPage] = useState(10);

const startIndex = page * rowsPerPage;

const paginatedData = data?.slice(
  startIndex,
  startIndex + rowsPerPage
) ?? [];
  return (
    <TableContainer component={Paper} variant="outlined" className="rounded-xl shadow-xs overflow-hidden">
      <Table sx={{ minWidth: 700 }} aria-label="customers table">
        <TableHead className="bg-slate-50">
          <TableRow>
            <TableCell sx={{ fontWeight: 600 }}>Customer</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Company & Role</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Location</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Deals / Revenue</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Last Contact</TableCell>
            <TableCell align="right" sx={{ fontWeight: 600 }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedData?.map((customer) => (
            <TableRow key={customer.id} hover className="transition-colors">
              {/* --- Customer, Company, Status, Location, Revenue, Contact Cells... --- */}
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar src={customer.avatar} alt={customer.fullName} sx={{ width: 42, height: 42 }} />
                  <Box>
                    <Typography variant="subtitle2" sx={{fontWeight:600}} className="text-slate-900">
                      {customer.fullName}
                    </Typography>
                    {/* ... other customer details ... */}
                  </Box>
                </div>
              </TableCell>
              
              <TableCell>
                 <Typography variant="body2" sx={{fontWeight:600}} className="text-slate-800">
                  {customer.companyName}
                </Typography>
                {/* ... other company details ... */}
              </TableCell>

              <TableCell>
                <StatusChip status={customer.status} />
              </TableCell>

               <TableCell>
                {customer.address}
              </TableCell>

               <TableCell>
                {customer.totalRevenue}
              </TableCell>

               <TableCell>
                {customer.lastContact}
              </TableCell>

              <TableCell align="right">
                <Tooltip title="View Details">
                  <IconButton 
                    size="small" 
                    color="default" 
                    onClick={() => onView(customer)} 
                  >
                    <VisibilityOutlinedIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Edit Customer">
                  <IconButton 
                    size="small" 
                    color="primary" 
                    onClick={() => onEdit(customer)} 
                  >
                    <EditOutlinedIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <CustomPagination
  count={data?.length ?? 0}
  page={page}
  rowsPerPage={rowsPerPage}
  onPageChange={(newPage) => setPage(newPage)}
  onRowsPerPageChange={(newRows) => {
    setRowsPerPage(newRows);
    setPage(0);
  }}
  rowsPerPageOptions={[10, 20, 50]}
/>
    </TableContainer>
  );
};