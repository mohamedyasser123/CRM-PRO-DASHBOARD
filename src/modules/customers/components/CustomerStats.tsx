import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';

interface CustomerStatsProps {
  totalCustomers?: number;
  totalRevenue?: number;
  totalDeals?: number;
}

export const CustomerStats: React.FC<CustomerStatsProps> = ({
  totalCustomers,
  totalRevenue,
  totalDeals,
}:CustomerStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <Card variant="outlined" className="shadow-xs rounded-xl">
        <CardContent className="flex items-center gap-4">
          <Box className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <PeopleAltOutlinedIcon />
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
              Total Customers
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              {totalCustomers}
            </Typography>
          </Box>
        </CardContent>
      </Card>

      <Card variant="outlined" className="shadow-xs rounded-xl">
        <CardContent className="flex items-center gap-4">
          <Box className="p-3 bg-green-50 text-green-600 rounded-xl">
            <AttachMoneyOutlinedIcon />
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
              Total Revenue
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              ${totalRevenue}
            </Typography>
          </Box>
        </CardContent>
      </Card>

      <Card variant="outlined" className="shadow-xs rounded-xl">
        <CardContent className="flex items-center gap-4">
          <Box className="p-3 bg-purple-50 text-purple-600 rounded-xl">
            <WorkOutlineOutlinedIcon />
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
              Total Deals
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              {totalDeals}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
};