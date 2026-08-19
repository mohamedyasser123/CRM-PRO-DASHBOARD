import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import { Sidebar } from './Sidebar';

export const AppLayout: React.FC = () => {
  return (
    <Box className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <Box component="main" className="flex-1 overflow-x-hidden p-6">
        <Outlet />
      </Box>
    </Box>
  );
};