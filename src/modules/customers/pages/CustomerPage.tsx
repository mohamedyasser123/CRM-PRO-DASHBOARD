import { useCreateCustomer, useCustomers, useUpdateCustomer } from '../hooks/customer.hook';
import { Box, Button, InputAdornment, TextField, Typography } from '@mui/material';
import { CustomerStats } from '../components/CustomerStats';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import { CustomerTable } from '../components/CustomerTable';
import { useMemo, useState } from 'react';
import type { Customer } from '../types/customer';
import { CustomerActionDialog } from '../components/CustomerActionDialog';
import type { CustomerFormValues } from '../schemas/customerSchema';
export default function CustomerPage() {
    const {
  data: customers = [],
  isLoading,
  isError,
} = useCustomers();
const [dialogOpen, setDialogOpen] = useState(false);
const [dialogMode, setDialogMode] = useState<'view' | 'edit' | 'add'>('add');
const [selectedCustomer, setSelectedCustomer] = useState<Customer | undefined>(undefined);
const createMutation = useCreateCustomer();
const updateMutation = useUpdateCustomer();
const handleOpenAdd = () => {
  setSelectedCustomer(undefined);
  setDialogMode('add');
  setDialogOpen(true);
};

const handleOpenView = (customer: Customer) => {
  setSelectedCustomer(customer);
  setDialogMode('view');
  setDialogOpen(true);
};

const handleOpenEdit = (customer: Customer) => {
  setSelectedCustomer(customer);
  setDialogMode('edit');
  setDialogOpen(true);
};
const handleSubmitSuccess = async (data: CustomerFormValues) => {
      console.log("handleSubmitSuccess", data);

  try {
    if (dialogMode === "add") {
      await createMutation.mutateAsync(data);
    }

    if (dialogMode === "edit" && selectedCustomer) {
      await updateMutation.mutateAsync({
        id: selectedCustomer.id,
        data,
      });
    }

    setDialogOpen(false);
  } catch (error) {
    console.error(error);
  }
};
  const [searchQuery, setSearchQuery] = useState("");
const filteredData = useMemo(() => {
  if (!searchQuery.trim()) {
    return customers;
  }

  const query = searchQuery.toLowerCase();

  return customers.filter((customer) =>
    customer.fullName.toLowerCase().includes(query) ||
    customer.email.toLowerCase().includes(query) ||
    customer.companyName.toLowerCase().includes(query)
  );
}, [customers, searchQuery]);
const totalCustomers = customers.length;

const totalRevenue = customers.reduce(
  (total, customer) => total + customer.totalRevenue,
  0
);

const totalDeals = customers.reduce(
  (total, customer) => total + customer.totalDeals,
  0
);
 return (
    <Box className="p-6 max-w-7xl mx-auto min-h-screen bg-slate-50/50">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <Box>
          <Typography variant="h4" sx={{fontWeight:700}} className="text-slate-900">
            Customers
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage contacts, monitor leads, and track customer lifetime value.
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          disableElevation
          onClick={handleOpenAdd}
          className="bg-indigo-600 hover:bg-indigo-700 capitalize rounded-lg px-4 py-2 font-semibold"
        >
          Add Customer
        </Button>
      </div>

      <CustomerStats
        totalCustomers={totalCustomers}
        totalRevenue={totalRevenue}
        totalDeals={totalDeals}
      />

      <div className="mb-4 max-w-md">
        <TextField
          fullWidth
          size="small"
          placeholder="Search by name, email, or company..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" className="text-slate-400" />
                </InputAdornment>
              ),
            },
          }}
          className="bg-white rounded-lg"
        />
      </div>

      <CustomerTable 
      data={filteredData} 
      isLoading={isLoading} 
      isError={isError} 
      onView={handleOpenView}
      onEdit={handleOpenEdit} 
    />

    <CustomerActionDialog
      open={dialogOpen}
      onClose={() => setDialogOpen(false)}
      mode={dialogMode}
      customer={selectedCustomer}
      onSubmitSuccess={handleSubmitSuccess}
    />
    </Box>
  );
}
