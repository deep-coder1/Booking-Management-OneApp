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

const drawerWidth = 260;

const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'Products', icon: <LayersIcon />, path: '/products' },
    { text: 'Inventory Control', icon: <InventoryIcon />, path: '/inventory-control' },
    { text: 'Suppliers', icon: <PeopleIcon />, path: '/suppliers' },
    { text: 'Purchases & Sales', icon: <ShoppingCartIcon />, path: '/purchases-sales' },
    { text: 'Low Stock Alerts', icon: <WarningIcon />, path: '/low-stock-alerts' },
    { text: 'Reports', icon: <BarChartIcon />, path: '/reports' },
    { text: 'Locations', icon: <LocationOnIcon />, path: '/locations' },
];

const Sidebar = () => {
    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    borderRight: 'none',
                    backgroundColor: '#fff',
                    boxShadow: '4px 0 24px rgba(0,0,0,0.02)'
                },
            }}
        >
            <Toolbar sx={{ display: 'flex', alignItems: 'center', px: 3, gap: 1 }}>
                <LogoDevIcon sx={{ color: '#4f46e5', fontSize: 32 }} />
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#4f46e5' }}>
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
                                    backgroundColor: isActive ? '#5c6bf1' : 'transparent', // Custom Blue/Purple
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
        </Drawer>
    );
};

export default Sidebar;
