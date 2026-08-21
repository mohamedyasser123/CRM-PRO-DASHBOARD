import { useState } from 'react'
import type { Deal } from '../types/deal';
import { Box, Button, InputAdornment, TextField, Typography } from '@mui/material';
import { DealStats } from '../components/DealStats';
import SearchIcon from '@mui/icons-material/Search';
import { DealTable } from '../components/DealTable';
import { useCreateDeal, useDeals, useUpdateDeal } from '../hooks/useDeals';
import { DealActionDialog, type DialogMode } from '../components/DealActionDialog';
import type { DealFormValues } from '../schemas/dealSchema';
import { customers } from '../../../database/customers';
export default function DealsPage() {
 const [searchQuery, setSearchQuery] = useState('');
 const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<DialogMode>('add');
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
  const createMutation = useCreateDeal();
  const updateMutation = useUpdateDeal();
 const {
  deals,
  isLoading,
  isError,
   totalPipelineValue,
  totalDeals,
  wonDeals,
} = useDeals({
    search:searchQuery
});

 const handleOpenAdd = () => {
    setDialogMode('add');
    setSelectedDeal(null);
    setDialogOpen(true);
  };

  const handleView = (deal: Deal) => {
    setDialogMode('view');
    setSelectedDeal(deal);
    setDialogOpen(true);
  };

  const handleEdit = (deal: Deal) => {
    setDialogMode('edit');
    setSelectedDeal(deal);
    setDialogOpen(true);
  };
const handleDialogSubmit = async (data: DealFormValues) => {
  if (dialogMode === "add") {
    const customer = customers.find(
      (customer) => customer.fullName === data.customerName
    );

    if (!customer) return;

    await createMutation.mutateAsync({
      customerId: customer.id,
      title: data.title,
      value: data.value,
      stage: data.stage,
    });
  }

  if (dialogMode === "edit" && selectedDeal) {
    await updateMutation.mutateAsync({
      id: selectedDeal.id,
      data: {
        title: data.title,
        value: data.value,
        stage: data.stage,
      },
    });
  }
};
  return (
    <Box className="p-6 max-w-7xl mx-auto min-h-screen">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <Box>
          <Typography variant="h4" sx={{fontWeight:700}} className="text-slate-900">
            Deals & Pipeline
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Track sales opportunities, deal stages, and revenue projections.
          </Typography>
        </Box>

        <Button
        onClick={handleOpenAdd}
          variant="contained"
          disableElevation
          className="bg-indigo-600 hover:bg-indigo-700 capitalize rounded-lg px-4 py-2 font-semibold"
        >
          Create Deal
        </Button>
      </div>
      {/* Stats */}
      <DealStats
        totalPipelineValue={totalPipelineValue}
        totalDeals={totalDeals}
        wonDeals={wonDeals}
      />

      <div className="mb-4 max-w-md">
        <TextField
          fullWidth
          size="small"
          placeholder="Search by deal, customer, or company..."
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

      <DealTable 
      data={deals}
  isLoading={isLoading}
  isError={isError}
  onView={handleView}
  onEdit={handleEdit} />
  <DealActionDialog
        open={dialogOpen}
        mode={dialogMode}
        selectedDeal={selectedDeal}
        onClose={() => setDialogOpen(false)}
        onSubmit={handleDialogSubmit}
      />
    </Box>
  );
}
