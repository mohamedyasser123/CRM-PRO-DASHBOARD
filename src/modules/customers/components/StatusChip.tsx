import React from 'react';
import { Chip } from '@mui/material';
import type { CustomerStatus } from '../types/customer';

interface StatusChipProps {
  status: CustomerStatus;
}

const statusColorMap: Record<
  CustomerStatus,
  "primary" | "success" | "secondary" | "error" | "default"
> = {
  Lead: "primary",
  Active: "success",
  Contacted: "secondary",
  Lost: "error",
  VIP: "default",
  Inactive: "default",
};

export const StatusChip: React.FC<StatusChipProps> = ({ status }) => {
  return (
    <Chip
      label={status}
      color={statusColorMap[status] || 'default'}
      size="small"
      variant="outlined"
      sx={{ fontWeight: 600 }}
    />
  );
};