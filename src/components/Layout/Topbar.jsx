import React from 'react';
import { AppBar, Toolbar, Box, Avatar, IconButton, Badge } from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';

const drawerWidth = 260;

const Topbar = () => {
    const { user } = useAuth();

    return (
        <AppBar
            position="fixed"
            sx={{
                width: { sm: `calc(100% - ${drawerWidth}px)` },
                ml: { sm: `${drawerWidth}px` },
                backgroundColor: '#f9fafb', // Match main background or white
                boxShadow: 'none',
                color: 'black'
            }}
        >
            <Toolbar>
                <Box sx={{ flexGrow: 1 }} />

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <IconButton size="large" color="inherit">
                        <Badge badgeContent={4} color="error">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                    <IconButton size="large" color="inherit">
                        <SettingsIcon />
                    </IconButton>
                    <Avatar
                        sx={{ bgcolor: '#4f46e5', width: 32, height: 32 }}
                        src={user?.avatar} // Assuming user object might have this
                    >
                        {user?.name ? user.name[0].toUpperCase() : 'A'}
                    </Avatar>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Topbar;
