import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import PendingActionsIcon from '@mui/icons-material/PendingActions';

interface DealStatsProps {
  totalPipelineValue: number;
  totalDeals: number;
  wonDeals: number;
}

export const DealStats: React.FC<DealStatsProps> = ({
  totalPipelineValue,
  totalDeals,
  wonDeals,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <Card variant="outlined" className="shadow-xs rounded-xl">
        <CardContent className="flex items-center gap-4">
          <Box className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
            <MonetizationOnOutlinedIcon />
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
              Pipeline Value
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              ${totalPipelineValue.toLocaleString()}
            </Typography>
          </Box>
        </CardContent>
      </Card>

      <Card variant="outlined" className="shadow-xs rounded-xl">
        <CardContent className="flex items-center gap-4">
          <Box className="p-3 bg-amber-50 text-amber-600 rounded-xl">
            <PendingActionsIcon />
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
              Total Active Deals
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              {totalDeals}
            </Typography>
          </Box>
        </CardContent>
      </Card>

      <Card variant="outlined" className="shadow-xs rounded-xl">
        <CardContent className="flex items-center gap-4">
          <Box className="p-3 bg-green-50 text-green-600 rounded-xl">
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
              Closed Won
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              {wonDeals}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
};