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
import InventoryIcon from '@mui/icons-material/Inventory';

const inventoryData = [
    { id: 1, location: 'Warehouse A', product: 'Wireless Mouse', quantity: 250, minStock: 50, status: 'Optimal' },
    { id: 2, location: 'Warehouse B', product: 'USB Keyboard', quantity: 150, minStock: 30, status: 'Optimal' },
    { id: 3, location: 'Warehouse A', product: 'Monitor 24"', quantity: 45, minStock: 20, status: 'Critical' },
    { id: 4, location: 'Warehouse C', product: 'Laptop Stand', quantity: 80, minStock: 25, status: 'Optimal' },
    { id: 5, location: 'Warehouse B', product: 'USB-C Cable', quantity: 10, minStock: 100, status: 'Low' },
    { id: 6, location: 'Warehouse A', product: 'Mechanical Keyboard', quantity: 200, minStock: 50, status: 'Optimal' },
];

const getStatusColor = (status) => {
    switch (status) {
        case 'Optimal':
            return '#10B981';
        case 'Low':
            return '#F59E0B';
        case 'Critical':
            return '#EF4444';
        default:
            return '#6B7280';
    }
};

const InventoryControl = () => {
    const [inventory, setInventory] = useState(inventoryData);
    const [openDialog, setOpenDialog] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [formData, setFormData] = useState({ location: '', product: '', quantity: '', minStock: '' });

    const handleAddClick = () => {
        setEditingId(null);
        setFormData({ location: '', product: '', quantity: '', minStock: '' });
        setOpenDialog(true);
    };

    const handleEditClick = (item) => {
        setEditingId(item.id);
        setFormData({ ...item });
        setOpenDialog(true);
    };

    const handleSave = () => {
        if (editingId) {
            setInventory(inventory.map(i => i.id === editingId ? { ...i, ...formData } : i));
        } else {
            setInventory([...inventory, { ...formData, id: Date.now(), status: 'Optimal' }]);
        }
        setOpenDialog(false);
    };

    const handleDelete = (id) => {
        setInventory(inventory.filter(i => i.id !== id));
    };

    const filteredInventory = inventory.filter(i =>
        i.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
        i.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Stats cards
    const stats = [
        { label: 'Total Items', value: inventory.reduce((sum, i) => sum + parseInt(i.quantity), 0), color: '#3B82F6' },
        { label: 'Low Stock Items', value: inventory.filter(i => i.status !== 'Optimal').length, color: '#F59E0B' },
        { label: 'Warehouses', value: new Set(inventory.map(i => i.location)).size, color: '#10B981' },
    ];

    return (
        <Box sx={{ maxWidth: '1600px', mx: 'auto' }}>
            {/* Header */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="h5" sx={{ fontWeight: 700, color: '#111827', mb: 1 }}>Inventory Control</Typography>
                <Typography variant="body2" sx={{ color: '#6B7280' }}>Monitor and manage warehouse inventory</Typography>
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
                                        <InventoryIcon sx={{ color: stat.color }} />
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
                    placeholder="Search inventory..."
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
                    Add Item
                </Button>
            </Box>

            {/* Inventory Table */}
            <Paper sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 600 }}>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow sx={{ bgcolor: '#F9FAFB' }}>
                                <TableCell sx={{ fontWeight: 700, color: '#374151', borderBottom: '2px solid #E5E7EB' }}>Location</TableCell>
                                <TableCell sx={{ fontWeight: 700, color: '#374151', borderBottom: '2px solid #E5E7EB' }}>Product</TableCell>
                                <TableCell sx={{ fontWeight: 700, color: '#374151', borderBottom: '2px solid #E5E7EB' }}>Quantity</TableCell>
                                <TableCell sx={{ fontWeight: 700, color: '#374151', borderBottom: '2px solid #E5E7EB' }}>Min Stock</TableCell>
                                <TableCell sx={{ fontWeight: 700, color: '#374151', borderBottom: '2px solid #E5E7EB' }}>Status</TableCell>
                                <TableCell sx={{ fontWeight: 700, color: '#374151', borderBottom: '2px solid #E5E7EB' }}>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredInventory.map((item) => (
                                <TableRow key={item.id} sx={{ '&:hover': { bgcolor: '#F9FAFB' } }}>
                                    <TableCell sx={{ color: '#374151', fontWeight: 500 }}>{item.location}</TableCell>
                                    <TableCell sx={{ color: '#374151', fontWeight: 500 }}>{item.product}</TableCell>
                                    <TableCell sx={{ color: '#374151', fontWeight: 600 }}>{item.quantity}</TableCell>
                                    <TableCell sx={{ color: '#6B7280' }}>{item.minStock}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={item.status}
                                            size="small"
                                            sx={{ bgcolor: getStatusColor(item.status), color: '#fff', fontWeight: 600 }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', gap: 1 }}>
                                            <IconButton size="small" onClick={() => handleEditClick(item)} sx={{ color: '#4F46E5' }}>
                                                <EditIcon fontSize="small" />
                                            </IconButton>
                                            <IconButton size="small" onClick={() => handleDelete(item.id)} sx={{ color: '#EF4444' }}>
                                                <DeleteIcon fontSize="small" />
                                            </IconButton>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>

            {/* Dialog */}
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
                <DialogTitle sx={{ fontWeight: 700, color: '#111827' }}>{editingId ? 'Edit Inventory' : 'Add Item'}</DialogTitle>
                <DialogContent sx={{ pt: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField label="Location" fullWidth value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} />
                    <TextField label="Product" fullWidth value={formData.product} onChange={(e) => setFormData({ ...formData, product: e.target.value })} />
                    <TextField label="Quantity" fullWidth type="number" value={formData.quantity} onChange={(e) => setFormData({ ...formData, quantity: e.target.value })} />
                    <TextField label="Min Stock" fullWidth type="number" value={formData.minStock} onChange={(e) => setFormData({ ...formData, minStock: e.target.value })} />
                </DialogContent>
                <DialogActions sx={{ p: 2 }}>
                    <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
                    <Button onClick={handleSave} variant="contained" sx={{ bgcolor: '#4F46E5' }}>Save</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default InventoryControl;
