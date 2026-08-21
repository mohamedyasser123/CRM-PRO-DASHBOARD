import React, { useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Typography,
  IconButton,
  Grid,
} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { Deal, DealStage } from '../types/deal';
import { dealSchema, type DealFormValues } from '../schemas/dealSchema';


export type DialogMode = 'add' | 'edit' | 'view';

interface DealActionDialogProps {
  open: boolean;
  mode: DialogMode;
  selectedDeal: Deal | null;
  onClose: () => void;
  onSubmit: (data: DealFormValues) => void;
}

const DEAL_STAGES: DealStage[] = ['New', 'Qualified', 'Proposal', 'Won', 'Lost'];

const defaultValues: DealFormValues = {
  title: '',
  customerName: '',
  companyName: '',
  value: 0,
  stage: 'New',
};

export const DealActionDialog: React.FC<DealActionDialogProps> = ({
  open,
  mode,
  selectedDeal,
  onClose,
  onSubmit,
}) => {
  const isView = mode === 'view';

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DealFormValues>({
    resolver: zodResolver(dealSchema),
    defaultValues,
  });

  useEffect(() => {
    if (open) {
      if ((mode === 'edit' || mode === 'view') && selectedDeal) {
        reset({
          title: selectedDeal.title,
          customerName: selectedDeal.customerName,
          companyName: selectedDeal.companyName,
          value: selectedDeal.value,
          stage: selectedDeal.stage,
        
        });
      } else {
        reset(defaultValues);
      }
    }
  }, [open, mode, selectedDeal, reset]);

  const handleFormSubmit = (data: DealFormValues) => {
    onSubmit(data);
    onClose();
  };

  const getTitle = () => {
    switch (mode) {
      case 'add':
        return 'Create New Deal';
      case 'edit':
        return 'Edit Deal Details';
      case 'view':
        return 'Deal Overview';
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth rounded-xl>
      <DialogTitle className="flex justify-between items-center border-b border-slate-100 pb-3">
        <Typography variant="h6" sx={{fontWeight:700}} className="text-slate-900">
          {getTitle()}
        </Typography>
        <IconButton size="small" onClick={onClose} className="text-slate-400">
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>

      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <DialogContent className="py-6">
          <Grid container spacing={2}>
            {/* Deal Title */}
            <Grid size={{ xs: 12 }}>
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Deal Title"
                    size="small"
                    fullWidth
                    disabled={isView}
                    error={!!errors.title}
                    helperText={errors.title?.message}
                  />
                )}
              />
            </Grid>

            {/* Customer Name */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <Controller
                name="customerName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Customer Name"
                    size="small"
                    fullWidth
                    disabled={isView}
                    error={!!errors.customerName}
                    helperText={errors.customerName?.message}
                  />
                )}
              />
            </Grid>

            {/* Company Name */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <Controller
                name="companyName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Company Name"
                    size="small"
                    fullWidth
                    disabled={isView}
                    error={!!errors.companyName}
                    helperText={errors.companyName?.message}
                  />
                )}
              />
            </Grid>

            {/* Value ($) */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <Controller
                name="value"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="number"
                    label="Deal Value ($)"
                    size="small"
                    fullWidth
                    disabled={isView}
                    onChange={(e) => field.onChange(e.target.value === '' ? 0 : Number(e.target.value))}
                    error={!!errors.value}
                    helperText={errors.value?.message}
                  />
                )}
              />
            </Grid>

            {/* Stage Dropdown */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <Controller
                name="stage"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    label="Stage"
                    size="small"
                    fullWidth
                    disabled={isView}
                    error={!!errors.stage}
                    helperText={errors.stage?.message}
                  >
                    {DEAL_STAGES.map((stage) => (
                      <MenuItem key={stage} value={stage}>
                        {stage}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions className="px-6 pb-4 border-t border-slate-100 pt-3">
          <Button onClick={onClose} variant="outlined" color="inherit">
            {isView ? 'Close' : 'Cancel'}
          </Button>

          {!isView && (
            <Button
              type="submit"
              variant="contained"
              disableElevation
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              {mode === 'add' ? 'Create Deal' : 'Save Changes'}
            </Button>
          )}
        </DialogActions>
      </form>
    </Dialog>
  );
};