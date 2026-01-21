import React from 'react';
import { Box, CssBaseline, Toolbar } from '@mui/material';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
    return (
        <Box sx={{ display: 'flex', bgcolor: '#f9fafb', minHeight: '100vh' }}>
            <CssBaseline />
            <Topbar />
            <Sidebar />
            <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - 260px)` } }}>
                <Toolbar /> {/* Spacer for Topbar */}
                <Outlet />
            </Box>
        </Box>
    );
};

export default MainLayout;
