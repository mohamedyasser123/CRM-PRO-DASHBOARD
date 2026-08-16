import React, { useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  IconButton,
  Typography,
  Box,
  Avatar,
  Divider,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { customerSchema, type CustomerFormValues} from '../schemas/customerSchema';
import type { Customer } from '../types/customer';

interface CustomerActionDialogProps {
  open: boolean;
  onClose: () => void;
  mode: 'add' | 'edit' | 'view';
  customer?: Customer;
  onSubmitSuccess?: (data: CustomerFormValues) => void;
}

export const CustomerActionDialog: React.FC<CustomerActionDialogProps> = ({
  open,
  onClose,
  mode,
  customer,
  onSubmitSuccess,
}) => {
  const isView = mode === 'view';
  const isEdit = mode === 'edit';
  const isAdd = mode === 'add';

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CustomerFormValues>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      companyName: '',
      jobTitle: '',
      industry: '',
      status: 'Lead',
      country: '',
      city: '',
      totalRevenue: 0,
      totalDeals: 0,
    },
  });

  useEffect(() => {
    if (open) {
      if ((isEdit || isView) && customer) {
        reset({
          fullName: customer.fullName || '',
          email: customer.email || '',
          phone: customer.phone || '',
          companyName: customer.companyName || '',
          jobTitle: customer.jobTitle || '',
          industry: customer.industry || '',
          status: customer.status || 'Lead',
          country: customer.country || '',
          city: customer.city || '',
          totalRevenue: customer.totalRevenue || 0,
          totalDeals: customer.totalDeals || 0,
        });
      } else if (isAdd) {
        reset({
          fullName: '',
          email: '',
          phone: '',
          companyName: '',
          jobTitle: '',
          industry: '',
          status: 'Lead',
          country: '',
          city: '',
          totalRevenue: 0,
          totalDeals: 0,
        });
      }
    }
  }, [open, mode, customer, reset, isEdit, isView, isAdd]);

  const onFormSubmit = (data: CustomerFormValues) => {
    console.log(`${mode.toUpperCase()} Customer Data:`, data);
    if (onSubmitSuccess) onSubmitSuccess(data);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth className="rounded-2xl">
      {/* Title Header */}
      <DialogTitle className="flex justify-between items-center bg-slate-50 border-b border-slate-100 py-3 px-6">
        <Box className="flex items-center gap-2">
          {isView && customer?.avatar && (
            <Avatar src={customer.avatar} alt={customer.fullName} sx={{ width: 32, height: 32 }} />
          )}
          <Typography variant="h6" sx={{ fontWeight: 700 }} className="text-slate-800">
            {isAdd && 'Add New Customer'}
            {isEdit && `Edit Customer: ${customer?.fullName}`}
            {isView && `Customer Details - ${customer?.fullName}`}
          </Typography>
        </Box>
        <IconButton size="small" onClick={onClose}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>

      {/* Content Form */}
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <DialogContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Full Name */}
            <Controller
              name="fullName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Full Name"
                  size="small"
                  fullWidth
                  disabled={isView}
                  error={!!errors.fullName}
                  helperText={errors.fullName?.message}
                />
              )}
            />

            {/* Email */}
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Email"
                  size="small"
                  fullWidth
                  disabled={isView}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              )}
            />

            {/* Phone */}
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Phone Number"
                  size="small"
                  fullWidth
                  disabled={isView}
                  error={!!errors.phone}
                  helperText={errors.phone?.message}
                />
              )}
            />

            {/* Status */}
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  label="Status"
                  size="small"
                  fullWidth
                  disabled={isView}
                  error={!!errors.status}
                  helperText={errors.status?.message}
                >
                  <MenuItem value="Lead">Lead</MenuItem>
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Contacted">Contacted</MenuItem>
                  <MenuItem value="Lost">Lost</MenuItem>
                </TextField>
              )}
            />

            <div className="col-span-full my-1">
              <Divider variant="middle" />
            </div>

            {/* Company Name */}
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

            {/* Job Title */}
            <Controller
              name="jobTitle"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Job Title"
                  size="small"
                  fullWidth
                  disabled={isView}
                  error={!!errors.jobTitle}
                  helperText={errors.jobTitle?.message}
                />
              )}
            />

            {/* Industry */}
            <Controller
              name="industry"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Industry"
                  size="small"
                  fullWidth
                  disabled={isView}
                  error={!!errors.industry}
                  helperText={errors.industry?.message}
                />
              )}
            />

            {/* Country */}
            <Controller
              name="country"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Country"
                  size="small"
                  fullWidth
                  disabled={isView}
                  error={!!errors.country}
                  helperText={errors.country?.message}
                />
              )}
            />

            {/* City */}
            <Controller
              name="city"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="City"
                  size="small"
                  fullWidth
                  disabled={isView}
                  error={!!errors.city}
                  helperText={errors.city?.message}
                />
              )}
            />

            {/* Revenue */}
            <Controller
              name="totalRevenue"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Total Revenue ($)"
                  type="number"
                  size="small"
                  fullWidth
      value={field.value ?? ""}
      onChange={(e) => field.onChange(Number(e.target.value))}
                  disabled={isView}
                  error={!!errors.totalRevenue}
                  helperText={errors.totalRevenue?.message}
                />
              )}
            />
          </div>
        </DialogContent>

        {/* Actions Footer */}
        <DialogActions className="bg-slate-50 border-t border-slate-100 py-3 px-6">
          <Button onClick={onClose} variant="outlined" color="inherit">
            {isView ? 'Close' : 'Cancel'}
          </Button>

          {!isView && (
            <Button type="submit" variant="contained" color="primary" disableElevation>
              {isAdd ? 'Create Customer' : 'Save Changes'}
            </Button>
          )}
        </DialogActions>
      </form>
    </Dialog>
  );
};