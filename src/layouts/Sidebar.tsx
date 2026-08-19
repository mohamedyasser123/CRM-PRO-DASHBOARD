import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  IconButton,
  Tooltip,
  Divider,
  Avatar,
} from '@mui/material';

// MUI Icons للموديولات المختلفة
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import AnalyticsOutlinedIcon from '@mui/icons-material/AnalyticsOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';

interface NavItem {
  title: string;
  path: string;
  icon: React.ReactNode;
}

interface NavGroup {
  category: string;
  items: NavItem[];
}

const navGroups: NavGroup[] = [
  {
    category: 'MAIN',
    items: [
      { title: 'Dashboard', path: '/dashboard', icon: <DashboardOutlinedIcon fontSize="small" /> },
    ],
  },
  {
    category: 'MANAGEMENT',
    items: [
      { title: 'Customers', path: '/customers', icon: <PeopleAltOutlinedIcon fontSize="small" /> },
      { title: 'Deals & Leads', path: '/deals', icon: <BusinessCenterOutlinedIcon fontSize="small" /> },
      { title: 'Tasks & Projects', path: '/tasks', icon: <AssignmentOutlinedIcon fontSize="small" /> },
      { title: 'Products', path: '/products', icon: <StorefrontOutlinedIcon fontSize="small" /> },
    ],
  },
  {
    category: 'SYSTEM',
    items: [
      { title: 'Analytics', path: '/analytics', icon: <AnalyticsOutlinedIcon fontSize="small" /> },
      { title: 'Settings', path: '/settings', icon: <SettingsOutlinedIcon fontSize="small" /> },
    ],
  },
];

const DRAWER_WIDTH = 260;
const COLLAPSED_WIDTH = 76;

export const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const toggleCollapse = () => {
    setIsCollapsed((prev) => !prev);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: isCollapsed ? COLLAPSED_WIDTH : DRAWER_WIDTH,
        flexShrink: 0,
        transition: 'width 0.2s ease-in-out',
        '& .MuiDrawer-paper': {
          width: isCollapsed ? COLLAPSED_WIDTH : DRAWER_WIDTH,
          boxSizing: 'border-box',
          transition: 'width 0.2s ease-in-out',
          backgroundColor: '#ffffff',
          borderColor: '#e2e8f0', // slate-200
          overflowX: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justify: 'space-between',
        },
      }}
    >
      {/* 1. Header & Logo */}
      <Box className="p-4 flex items-center justify-between border-b border-slate-100 min-h-[64px]">
        {!isCollapsed && (
          <Box className="flex items-center gap-2">
            <Box className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm">
              CP
            </Box>
            <Typography variant="h6" sx={{fontWeight:700}} className="text-slate-900 text-base">
              CRM<span className="text-indigo-600">PRO</span>
            </Typography>
          </Box>
        )}

        <IconButton size="small" onClick={toggleCollapse} sx={{ color: '#64748b' }}>
          {isCollapsed ? <ChevronRightIcon /> : <MenuOpenIcon />}
        </IconButton>
      </Box>

      {/* 2. Navigation Modules List */}
      <Box className="flex-1 px-3 py-4 overflow-y-auto">
        {navGroups.map((group, groupIndex) => (
          <Box key={group.category} className="mb-4">
            {!isCollapsed && (
              <Typography
                variant="caption"
                sx={{ fontWeight: 700, letterSpacing: '0.05em' }}
                className="text-slate-400 px-3 mb-2 block text-[10px]"
              >
                {group.category}
              </Typography>
            )}

            <List disablePadding>
              {group.items.map((item) => {
                const isActive = location.pathname.startsWith(item.path);

                return (
                  <ListItem key={item.title} disablePadding className="mb-1">
                    <Tooltip title={isCollapsed ? item.title : ''} placement="right" arrow>
                      <ListItemButton
                        component={NavLink}
                        to={item.path}
                        selected={isActive}
                        sx={{
                          borderRadius: '0.5rem',
                          minHeight: 44,
                          px: isCollapsed ? 2.5 : 2,
                          justifyContent: isCollapsed ? 'center' : 'initial',
                          '&.Mui-selected': {
                            backgroundColor: '#eef2ff', // indigo-50
                            color: '#4f46e5', // indigo-600
                            '& .MuiListItemIcon-root': {
                              color: '#4f46e5',
                            },
                            '&:hover': {
                              backgroundColor: '#e0e7ff',
                            },
                          },
                          '&:hover': {
                            backgroundColor: '#f8fafc',
                          },
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            minWidth: 0,
                            mr: isCollapsed ? 0 : 1.5,
                            justifyContent: 'center',
                            color: isActive ? '#4f46e5' : '#64748b',
                          }}
                        >
                          {item.icon}
                        </ListItemIcon>

                        {!isCollapsed && (
                          <ListItemText
                            primary={item.title}
                           sx={{
                             fontSize: '0.875rem',
                              fontWeight: isActive ? 600 : 500,
                           }}
                          />
                        )}
                      </ListItemButton>
                    </Tooltip>
                  </ListItem>
                );
              })}
            </List>
            {groupIndex < navGroups.length - 1 && isCollapsed && (
              <Divider className="my-2 border-slate-100" />
            )}
          </Box>
        ))}
      </Box>

      {/* 3. Footer / User Profile Section */}
      <Box className="p-3 border-t border-slate-100 bg-slate-50/50">
        <Box className="flex items-center gap-3 px-2 py-1">
          <Avatar
            alt="Mohamed"
            src="https://i.pravatar.cc/150?img=11"
            sx={{ width: 36, height: 36 }}
          />
          {!isCollapsed && (
            <Box className="overflow-hidden">
              <Typography variant="subtitle2" sx={{fontWeight:700}} noWrap className="text-slate-800 text-xs">
                Mohamed
              </Typography>
              <Typography variant="caption" color="text.secondary" noWrap className="block text-[11px]">
                Admin / Developer
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Drawer>
  );
};