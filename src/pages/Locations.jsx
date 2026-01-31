import React, { useState } from 'react';
import {
    Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    TextField, IconButton, Dialog, DialogTitle, DialogContent, DialogActions,
    Typography, Chip, Card, CardContent, Grid
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WarehouseIcon from '@mui/icons-material/Warehouse';

const locationsData = [
    { id: 1, name: 'Warehouse A', city: 'Mumbai', state: 'Maharashtra', capacity: 5000, currentStock: 3245, status: 'Operational' },
    { id: 2, name: 'Warehouse B', city: 'Delhi', state: 'Delhi', capacity: 3500, currentStock: 2890, status: 'Operational' },
    { id: 3, name: 'Warehouse C', city: 'Bangalore', state: 'Karnataka', capacity: 4000, currentStock: 3150, status: 'Operational' },
    { id: 4, name: 'Distribution Center', city: 'Chennai', state: 'Tamil Nadu', capacity: 2500, currentStock: 1800, status: 'Maintenance' },
    { id: 5, name: 'Regional Hub', city: 'Hyderabad', state: 'Telangana', capacity: 3000, currentStock: 2450, status: 'Operational' },
];

const Locations = () => {
    const [locations, setLocations] = useState(locationsData);
    const [openDialog, setOpenDialog] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [formData, setFormData] = useState({});

    const handleAddClick = () => {
        setEditingId(null);
        setFormData({});
        setOpenDialog(true);
    };

    const handleEditClick = (location) => {
        setEditingId(location.id);
        setFormData({ ...location });
        setOpenDialog(true);
    };

    const handleSave = () => {
        if (editingId) {
            setLocations(locations.map(l => l.id === editingId ? { ...l, ...formData } : l));
        } else {
            setLocations([...locations, { ...formData, id: Date.now(), status: 'Operational' }]);
        }
        setOpenDialog(false);
    };

    const handleDelete = (id) => {
        setLocations(locations.filter(l => l.id !== id));
    };

    const filteredLocations = locations.filter(l =>
        l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        l.city.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalCapacity = locations.reduce((sum, l) => sum + l.capacity, 0);
    const totalStock = locations.reduce((sum, l) => sum + l.currentStock, 0);
    const utilizationRate = ((totalStock / totalCapacity) * 100).toFixed(1);

    const stats = [
        { label: 'Total Warehouses', value: locations.length, color: '#3B82F6' },
        { label: 'Total Capacity', value: totalCapacity.toLocaleString(), color: '#6366F1' },
        { label: 'Utilization Rate', value: `${utilizationRate}%`, color: '#10B981' },
    ];

    return (
        <Box sx={{ maxWidth: '1600px', mx: 'auto' }}>
            {/* Header */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="h5" sx={{ fontWeight: 700, color: '#111827', mb: 1 }}>Locations & Warehouses</Typography>
                <Typography variant="body2" sx={{ color: '#6B7280' }}>Manage warehouse locations and inventory distribution</Typography>
            </Box>

            {/* Stats Cards */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                {stats.map((stat, idx) => (
                    <Grid item xs={12} sm={6} md={3} key={idx}>
                        <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                            <CardContent>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Box>
                                        <Typography variant="body2" sx={{ color: '#6B7280', fontWeight: 600, mb: 1 }}>
                                            {stat.label}
                                        </Typography>
                                        <Typography variant="h5" sx={{ fontWeight: 700, color: '#111827' }}>
                                            {stat.value}
                                        </Typography>
                                    </Box>
                                    <Box sx={{
                                        width: 50, height: 50, borderRadius: 2,
                                        bgcolor: stat.color, opacity: 0.1,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                                    }}>
                                        <WarehouseIcon sx={{ color: stat.color }} />
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Search & Add Button */}
            <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
                <TextField
                    placeholder="Search locations..."
                    variant="outlined"
                    size="small"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{ startAdornment: <SearchIcon sx={{ mr: 1, color: '#9CA3AF' }} /> }}
                    sx={{ flex: 1, minWidth: 200, '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                />
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleAddClick}
                    sx={{ bgcolor: '#4F46E5', color: '#fff', borderRadius: 2, textTransform: 'none', fontWeight: 600 }}
                >
                    Add Location
                </Button>
            </Box>

            {/* Locations Grid View */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                {filteredLocations.map((location) => (
                    <Grid item xs={12} sm={6} md={4} key={location.id}>
                        <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.05)', height: '100%' }}>
                            <CardContent>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                                    <Box sx={{
                                        width: 40, height: 40, borderRadius: 2,
                                        bgcolor: '#4F46E5', opacity: 0.1,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                                    }}>
                                        <LocationOnIcon sx={{ color: '#4F46E5' }} />
                                    </Box>
                                    <Box sx={{ display: 'flex', gap: 1 }}>
                                        <IconButton size="small" onClick={() => handleEditClick(location)} sx={{ color: '#4F46E5' }}>
                                            <EditIcon fontSize="small" />
                                        </IconButton>
                                        <IconButton size="small" onClick={() => handleDelete(location.id)} sx={{ color: '#EF4444' }}>
                                            <DeleteIcon fontSize="small" />
                                        </IconButton>
                                    </Box>
                                </Box>
                                <Typography variant="h6" sx={{ fontWeight: 700, color: '#111827', mb: 0.5 }}>
                                    {location.name}
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#6B7280', mb: 1.5 }}>
                                    {location.city}, {location.state}
                                </Typography>
                                <Box sx={{ bgcolor: '#F9FAFB', p: 1.5, borderRadius: 2, mb: 1.5 }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                        <Typography variant="body2" sx={{ color: '#6B7280', fontWeight: 500 }}>Capacity</Typography>
                                        <Typography variant="body2" sx={{ fontWeight: 600, color: '#374151' }}>
                                            {location.capacity.toLocaleString()} units
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                        <Typography variant="body2" sx={{ color: '#6B7280', fontWeight: 500 }}>Current Stock</Typography>
                                        <Typography variant="body2" sx={{ fontWeight: 600, color: '#374151' }}>
                                            {location.currentStock.toLocaleString()}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Typography variant="body2" sx={{ color: '#6B7280', fontWeight: 500 }}>Utilization</Typography>
                                        <Typography variant="body2" sx={{ fontWeight: 600, color: '#10B981' }}>
                                            {((location.currentStock / location.capacity) * 100).toFixed(1)}%
                                        </Typography>
                                    </Box>
                                </Box>
                                <Chip
                                    label={location.status}
                                    size="small"
                                    sx={{
                                        bgcolor: location.status === 'Operational' ? '#10B981' : '#F59E0B',
                                        color: '#fff',
                                        fontWeight: 600,
                                        width: '100%'
                                    }}
                                />
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Locations Table */}
            <Paper sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
                <Box sx={{ p: 3, pb: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#4F46E5' }}>All Locations</Typography>
                </Box>
                <TableContainer sx={{ maxHeight: 600 }}>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow sx={{ bgcolor: '#F9FAFB' }}>
                                <TableCell sx={{ fontWeight: 700, color: '#374151', borderBottom: '2px solid #E5E7EB' }}>Location Name</TableCell>
                                <TableCell sx={{ fontWeight: 700, color: '#374151', borderBottom: '2px solid #E5E7EB' }}>City</TableCell>
                                <TableCell sx={{ fontWeight: 700, color: '#374151', borderBottom: '2px solid #E5E7EB' }}>State</TableCell>
                                <TableCell sx={{ fontWeight: 700, color: '#374151', borderBottom: '2px solid #E5E7EB' }}>Capacity</TableCell>
                                <TableCell sx={{ fontWeight: 700, color: '#374151', borderBottom: '2px solid #E5E7EB' }}>Current Stock</TableCell>
                                <TableCell sx={{ fontWeight: 700, color: '#374151', borderBottom: '2px solid #E5E7EB' }}>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredLocations.map((location) => (
                                <TableRow key={location.id} sx={{ '&:hover': { bgcolor: '#F9FAFB' } }}>
                                    <TableCell sx={{ color: '#374151', fontWeight: 500 }}>{location.name}</TableCell>
                                    <TableCell sx={{ color: '#6B7280' }}>{location.city}</TableCell>
                                    <TableCell sx={{ color: '#6B7280' }}>{location.state}</TableCell>
                                    <TableCell sx={{ color: '#374151', fontWeight: 600 }}>{location.capacity.toLocaleString()}</TableCell>
                                    <TableCell sx={{ color: '#374151', fontWeight: 600 }}>{location.currentStock.toLocaleString()}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={location.status}
                                            size="small"
                                            sx={{
                                                bgcolor: location.status === 'Operational' ? '#10B981' : '#F59E0B',
                                                color: '#fff',
                                                fontWeight: 600
                                            }}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>

            {/* Dialog */}
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
                <DialogTitle sx={{ fontWeight: 700, color: '#111827' }}>{editingId ? 'Edit Location' : 'Add Location'}</DialogTitle>
                <DialogContent sx={{ pt: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField label="Location Name" fullWidth value={formData.name || ''} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                    <TextField label="City" fullWidth value={formData.city || ''} onChange={(e) => setFormData({ ...formData, city: e.target.value })} />
                    <TextField label="State" fullWidth value={formData.state || ''} onChange={(e) => setFormData({ ...formData, state: e.target.value })} />
                    <TextField label="Capacity" fullWidth type="number" value={formData.capacity || ''} onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) })} />
                    <TextField label="Current Stock" fullWidth type="number" value={formData.currentStock || ''} onChange={(e) => setFormData({ ...formData, currentStock: parseInt(e.target.value) })} />
                </DialogContent>
                <DialogActions sx={{ p: 2 }}>
                    <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
                    <Button onClick={handleSave} variant="contained" sx={{ bgcolor: '#4F46E5' }}>Save</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default Locations;
