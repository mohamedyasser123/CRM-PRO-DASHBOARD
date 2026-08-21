import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { DealStageChip } from './DealStageChip';
import type { Deal } from '../types/deal';

interface DealTableProps {
    data: Deal[];
  isLoading: boolean;
  isError: boolean;
  onView: (deal: Deal) => void;
  onEdit: (deal: Deal) => void;
}

export const DealTable: React.FC<DealTableProps> = ({   data,
  isLoading,
  isError,
  onView,
  onEdit, }) => {
    if (isLoading) {
  return <div>Loading deals...</div>;
}

if (isError) {
  return <div>Failed to load deals.</div>;
}
  return (
    <TableContainer component={Paper} variant="outlined" className="rounded-xl shadow-xs overflow-hidden">
      <Table sx={{ minWidth: 700 }}>
        <TableHead className="bg-slate-50">
          <TableRow>
            <TableCell sx={{ fontWeight: 600 }}>Deal id</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Customer Id</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>deal title</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Customer / Company</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Value</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Stage</TableCell>
            <TableCell align="right" sx={{ fontWeight: 600 }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((deal) => (
            <TableRow key={deal.id} hover className="transition-colors">
              <TableCell>
                <Typography variant="caption" className="text-slate-400">
                  ID: {deal.id}
                </Typography>
              </TableCell>
               <TableCell>
                <Typography variant="caption" className="text-slate-400">
                  ID: {deal.customerId}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2" sx={{fontWeight:700}} className="text-slate-800">
                  {deal.title}
                </Typography>
              </TableCell>
               <TableCell>
                <Typography variant="caption" className="text-slate-400">
                  ID: {deal.customerName}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2" sx={{fontWeight:700}} className="text-indigo-600">
                  ${deal.value.toLocaleString()}
                </Typography>
              </TableCell>
              <TableCell>
                <DealStageChip stage={deal.stage} />
              </TableCell>
              <TableCell align="right">
                <Tooltip title="View Details">
                  <IconButton size="small" onClick={() => onView(deal)}>
                    <VisibilityOutlinedIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Edit Deal">
                  <IconButton size="small" color="primary" onClick={() => onEdit(deal)}>
                    <EditOutlinedIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};