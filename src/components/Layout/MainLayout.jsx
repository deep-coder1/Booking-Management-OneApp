import React from 'react';
import { Box, CssBaseline, Toolbar } from '@mui/material';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [isClosing, setIsClosing] = React.useState(false);

    const handleDrawerClose = () => {
        setIsClosing(true);
        setMobileOpen(false);
    };

    const handleDrawerTransitionEnd = () => {
        setIsClosing(false);
    };

    const handleDrawerToggle = () => {
        if (!isClosing) {
            setMobileOpen(!mobileOpen);
        }
    };

    return (
        <Box sx={{ display: 'flex', bgcolor: '#f9fafb', minHeight: '100vh' }}>
            <CssBaseline />
            <Topbar handleDrawerToggle={handleDrawerToggle} drawerWidth={260} />
            <Sidebar
                mobileOpen={mobileOpen}
                handleDrawerTransitionEnd={handleDrawerTransitionEnd}
                handleDrawerClose={handleDrawerClose}
                drawerWidth={260}
            />
            <Box component="main" sx={{ flexGrow: 1, p: 3, mt: '64px', overflowX: 'hidden' }}>
                <Outlet />
            </Box>
        </Box>
    );
};

export default MainLayout;
