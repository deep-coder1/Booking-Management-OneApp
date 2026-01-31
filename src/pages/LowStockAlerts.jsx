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
import WarningIcon from '@mui/icons-material/Warning';

const alertsData = [
    { id: 1, product: 'USB-C Cable', sku: 'USB-003', currentStock: 10, minStock: 100, warehouse: 'Warehouse B', alertDate: '2025-10-22', priority: 'Critical' },
    { id: 2, product: 'Monitor 24"', sku: 'MON-001', currentStock: 45, minStock: 50, warehouse: 'Warehouse A', alertDate: '2025-10-21', priority: 'High' },
    { id: 3, product: 'USB Keyboard', sku: 'KB-002', currentStock: 35, minStock: 50, warehouse: 'Warehouse C', alertDate: '2025-10-20', priority: 'Medium' },
    { id: 4, product: 'HDMI Cable', sku: 'HDMI-001', currentStock: 5, minStock: 50, warehouse: 'Warehouse A', alertDate: '2025-10-19', priority: 'Critical' },
    { id: 5, product: 'Power Bank', sku: 'PB-001', currentStock: 20, minStock: 100, warehouse: 'Warehouse B', alertDate: '2025-10-18', priority: 'High' },
];

const getPriorityColor = (priority) => {
    switch (priority) {
        case 'Critical':
            return '#EF4444';
        case 'High':
            return '#F59E0B';
        case 'Medium':
            return '#3B82F6';
        default:
            return '#6B7280';
    }
};

const LowStockAlerts = () => {
    const [alerts, setAlerts] = useState(alertsData);
    const [openDialog, setOpenDialog] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [formData, setFormData] = useState({});

    const handleAddClick = () => {
        setEditingId(null);
        setFormData({});
        setOpenDialog(true);
    };

    const handleEditClick = (alert) => {
        setEditingId(alert.id);
        setFormData({ ...alert });
        setOpenDialog(true);
    };

    const handleSave = () => {
        if (editingId) {
            setAlerts(alerts.map(a => a.id === editingId ? { ...a, ...formData } : a));
        } else {
            setAlerts([...alerts, { ...formData, id: Date.now() }]);
        }
        setOpenDialog(false);
    };

    const handleDelete = (id) => {
        setAlerts(alerts.filter(a => a.id !== id));
    };

    const handleReorder = (id) => {
        // Mark as reordered or handle reorder logic
        setAlerts(alerts.map(a => a.id === id ? { ...a, priority: 'Pending Reorder' } : a));
    };

    const filteredAlerts = alerts.filter(a =>
        a.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.sku.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const stats = [
        { label: 'Critical Items', value: alerts.filter(a => a.priority === 'Critical').length, color: '#EF4444' },
        { label: 'High Priority', value: alerts.filter(a => a.priority === 'High').length, color: '#F59E0B' },
        { label: 'Total Alerts', value: alerts.length, color: '#3B82F6' },
    ];

    return (
        <Box sx={{ maxWidth: '1600px', mx: 'auto' }}>
            {/* Header */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="h5" sx={{ fontWeight: 700, color: '#111827', mb: 1 }}>Low Stock Alerts</Typography>
                <Typography variant="body2" sx={{ color: '#6B7280' }}>Monitor products running low on inventory</Typography>
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
                                        <WarningIcon sx={{ color: stat.color }} />
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Search */}
            <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
                <TextField
                    placeholder="Search alerts..."
                    variant="outlined"
                    size="small"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{ startAdornment: <SearchIcon sx={{ mr: 1, color: '#9CA3AF' }} /> }}
                    sx={{ flex: 1, minWidth: 200, '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                />
            </Box>

            {/* Alerts Table */}
            <Paper sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 600 }}>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow sx={{ bgcolor: '#F9FAFB' }}>
                                <TableCell sx={{ fontWeight: 700, color: '#374151', borderBottom: '2px solid #E5E7EB' }}>Product</TableCell>
                                <TableCell sx={{ fontWeight: 700, color: '#374151', borderBottom: '2px solid #E5E7EB' }}>SKU</TableCell>
                                <TableCell sx={{ fontWeight: 700, color: '#374151', borderBottom: '2px solid #E5E7EB' }}>Current Stock</TableCell>
                                <TableCell sx={{ fontWeight: 700, color: '#374151', borderBottom: '2px solid #E5E7EB' }}>Min Stock</TableCell>
                                <TableCell sx={{ fontWeight: 700, color: '#374151', borderBottom: '2px solid #E5E7EB' }}>Warehouse</TableCell>
                                <TableCell sx={{ fontWeight: 700, color: '#374151', borderBottom: '2px solid #E5E7EB' }}>Alert Date</TableCell>
                                <TableCell sx={{ fontWeight: 700, color: '#374151', borderBottom: '2px solid #E5E7EB' }}>Priority</TableCell>
                                <TableCell sx={{ fontWeight: 700, color: '#374151', borderBottom: '2px solid #E5E7EB' }}>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredAlerts.map((alert) => (
                                <TableRow key={alert.id} sx={{ '&:hover': { bgcolor: '#F9FAFB' } }}>
                                    <TableCell sx={{ color: '#374151', fontWeight: 500 }}>{alert.product}</TableCell>
                                    <TableCell sx={{ color: '#6B7280' }}>{alert.sku}</TableCell>
                                    <TableCell sx={{ color: '#374151', fontWeight: 600 }}>{alert.currentStock}</TableCell>
                                    <TableCell sx={{ color: '#6B7280' }}>{alert.minStock}</TableCell>
                                    <TableCell sx={{ color: '#6B7280' }}>{alert.warehouse}</TableCell>
                                    <TableCell sx={{ color: '#6B7280' }}>{alert.alertDate}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={alert.priority}
                                            size="small"
                                            sx={{
                                                bgcolor: getPriorityColor(alert.priority),
                                                color: '#fff',
                                                fontWeight: 600
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', gap: 1 }}>
                                            <Button
                                                size="small"
                                                variant="outlined"
                                                onClick={() => handleReorder(alert.id)}
                                                sx={{
                                                    textTransform: 'none',
                                                    borderColor: '#4F46E5',
                                                    color: '#4F46E5',
                                                    fontSize: '0.75rem'
                                                }}
                                            >
                                                Reorder
                                            </Button>
                                            <IconButton size="small" onClick={() => handleDelete(alert.id)} sx={{ color: '#EF4444' }}>
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
        </Box>
    );
};

export default LowStockAlerts;
