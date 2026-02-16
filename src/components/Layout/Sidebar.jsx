import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Box, Typography
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LayersIcon from '@mui/icons-material/Layers'; // Products
import InventoryIcon from '@mui/icons-material/Inventory'; // Inventory Control
import PeopleIcon from '@mui/icons-material/People'; // Suppliers
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'; // Purchases & Sales
import WarningIcon from '@mui/icons-material/Warning'; // Low Stock Alerts
import BarChartIcon from '@mui/icons-material/BarChart'; // Reports
import LocationOnIcon from '@mui/icons-material/LocationOn'; // Locations
import LogoDevIcon from '@mui/icons-material/LogoDev'; // Placeholder for Logo
import PrintIcon from '@mui/icons-material/Print';

const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'Products', icon: <LayersIcon />, path: '/products' },
    { text: 'Inventory Control', icon: <InventoryIcon />, path: '/inventory-control' },
    { text: 'Suppliers', icon: <PeopleIcon />, path: '/suppliers' },
    { text: 'Purchases & Sales', icon: <ShoppingCartIcon />, path: '/purchases-sales' },
    { text: 'Low Stock Alerts', icon: <WarningIcon />, path: '/low-stock-alerts' },
    { text: 'Reports', icon: <BarChartIcon />, path: '/reports' },
    { text: 'Locations', icon: <LocationOnIcon />, path: '/locations' },
    { text: 'Billing', icon: <PrintIcon />, path: '/billing' },
];

const Sidebar = ({ mobileOpen, handleDrawerTransitionEnd, handleDrawerClose, drawerWidth }) => {
    const drawerContent = (
        <div>
            <Toolbar sx={{ display: 'flex', alignItems: 'center', px: 3, gap: 1.5, minHeight: '80px !important' }}>
                <Box sx={{
                    width: 40, height: 40, bgcolor: '#4f46e5', borderRadius: 1.5,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 4px 12px rgba(79, 70, 229, 0.3)'
                }}>
                    <LogoDevIcon sx={{ color: '#fff', fontSize: 28 }} />
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 800, color: '#111827', letterSpacing: '-0.5px' }}>
                    LOGO
                </Typography>
            </Toolbar>
            <Box sx={{ overflow: 'auto', mt: 2, px: 2 }}>
                <List>
                    {menuItems.map((item) => (
                        <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
                            <ListItemButton
                                component={NavLink}
                                to={item.path}
                                style={({ isActive }) => ({
                                    backgroundColor: isActive ? '#5c6bf1' : 'transparent',
                                    color: isActive ? '#fff' : '#6b7280',
                                    borderRadius: '8px',
                                })}
                                sx={{
                                    '&:hover': {
                                        backgroundColor: '#e0e7ff',
                                        color: '#4f46e5',
                                    }
                                }}
                            >
                                <ListItemIcon sx={{
                                    color: 'inherit',
                                    minWidth: 40
                                }}>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText
                                    primary={item.text}
                                    primaryTypographyProps={{
                                        fontSize: '0.9rem',
                                        fontWeight: 500
                                    }}
                                />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </div>
    );

    return (
        <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            aria-label="mailbox folders"
        >
            {/* Mobile Drawer */}
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onTransitionEnd={handleDrawerTransitionEnd}
                onClose={handleDrawerClose}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                    display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
            >
                {drawerContent}
            </Drawer>

            {/* Desktop Drawer */}
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: 'none', sm: 'block' },
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                        width: drawerWidth,
                        borderRight: 'none',
                        backgroundColor: '#fff',
                        boxShadow: '4px 0 24px rgba(0,0,0,0.02)'
                    },
                }}
                open
            >
                {drawerContent}
            </Drawer>
        </Box>
    );
};

export default Sidebar;
