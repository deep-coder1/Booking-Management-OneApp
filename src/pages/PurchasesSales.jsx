import React, { useState } from 'react';
import {
    Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    TextField, IconButton, Dialog, DialogTitle, DialogContent, DialogActions,
    Typography, Chip, Card, CardContent, Grid, Tabs, Tab
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const purchasesData = [
    { id: 1, date: '2025-10-22', supplier: 'Global Tech', product: 'Wireless Mouse', qty: 100, rate: '₹1,500', total: '₹150,000', status: 'Delivered' },
    { id: 2, date: '2025-10-21', supplier: 'Premier Supplies', product: 'USB Keyboard', qty: 50, rate: '₹3,500', total: '₹175,000', status: 'Delivered' },
    { id: 3, date: '2025-10-20', supplier: 'Global Tech', product: 'Monitor 24"', qty: 20, rate: '₹15,000', total: '₹300,000', status: 'In Transit' },
    { id: 4, date: '2025-10-19', supplier: 'Eco Goods', product: 'Laptop Stand', qty: 75, rate: '₹2,500', total: '₹187,500', status: 'Pending' },
];

const salesData = [
    { id: 1, date: '2025-10-22', customer: 'ABC Corp', product: 'Wireless Mouse', qty: 10, rate: '₹2,500', total: '₹25,000', status: 'Delivered' },
    { id: 2, date: '2025-10-21', customer: 'XYZ Ltd', product: 'USB Keyboard', qty: 5, rate: '₹5,500', total: '₹27,500', status: 'Delivered' },
    { id: 3, date: '2025-10-20', customer: 'Tech Solutions', product: 'Monitor 24"', qty: 3, rate: '₹18,000', total: '₹54,000', status: 'In Transit' },
    { id: 4, date: '2025-10-19', customer: 'Office Supplies Inc', product: 'Mechanical Keyboard', qty: 8, rate: '₹10,000', total: '₹80,000', status: 'Pending' },
];

const getStatusColor = (status) => {
    switch (status) {
        case 'Delivered':
            return '#10B981';
        case 'In Transit':
            return '#3B82F6';
        case 'Pending':
            return '#F59E0B';
        default:
            return '#6B7280';
    }
};

const PurchasesSales = () => {
    const [tabValue, setTabValue] = useState(0);
    const [purchases, setPurchases] = useState(purchasesData);
    const [sales, setSales] = useState(salesData);
    const [openDialog, setOpenDialog] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [formData, setFormData] = useState({});

    const currentData = tabValue === 0 ? purchases : sales;
    const setCurrentData = tabValue === 0 ? setPurchases : setSales;

    const handleAddClick = () => {
        setEditingId(null);
        setFormData({});
        setOpenDialog(true);
    };

    const handleEditClick = (item) => {
        setEditingId(item.id);
        setFormData({ ...item });
        setOpenDialog(true);
    };

    const handleSave = () => {
        if (editingId) {
            setCurrentData(currentData.map(i => i.id === editingId ? { ...i, ...formData } : i));
        } else {
            setCurrentData([...currentData, { ...formData, id: Date.now() }]);
        }
        setOpenDialog(false);
    };

    const handleDelete = (id) => {
        setCurrentData(currentData.filter(i => i.id !== id));
    };

    const filteredData = currentData.filter(item =>
        (item.supplier || item.customer || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.product.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalAmount = currentData.reduce((sum, item) => {
        const amount = parseInt(item.total.replace(/₹|,/g, ''));
        return sum + amount;
    }, 0);

    return (
        <Box sx={{ maxWidth: '1600px', mx: 'auto' }}>
            {/* Header */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="h5" sx={{ fontWeight: 700, color: '#111827', mb: 1 }}>Purchases & Sales</Typography>
                <Typography variant="body2" sx={{ color: '#6B7280' }}>Manage purchase orders and sales transactions</Typography>
            </Box>

            {/* Stats */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={6} md={3}>
                    <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                        <CardContent>
                            <Typography variant="body2" sx={{ color: '#6B7280', fontWeight: 600, mb: 1 }}>
                                {tabValue === 0 ? 'Total Purchases' : 'Total Sales'}
                            </Typography>
                            <Typography variant="h5" sx={{ fontWeight: 700, color: '#111827' }}>
                                ₹{(totalAmount / 100000).toFixed(2)}L
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                        <CardContent>
                            <Typography variant="body2" sx={{ color: '#6B7280', fontWeight: 600, mb: 1 }}>
                                Transactions
                            </Typography>
                            <Typography variant="h5" sx={{ fontWeight: 700, color: '#111827' }}>
                                {currentData.length}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Tabs */}
            <Paper sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
                <Tabs value={tabValue} onChange={(e, val) => setTabValue(val)} sx={{ borderBottom: '1px solid #E5E7EB' }}>
                    <Tab label="Purchases" sx={{ fontWeight: 600, textTransform: 'none', fontSize: '1rem' }} />
                    <Tab label="Sales" sx={{ fontWeight: 600, textTransform: 'none', fontSize: '1rem' }} />
                </Tabs>

                {/* Search & Add Button */}
                <Box sx={{ p: 3, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                    <TextField
                        placeholder={tabValue === 0 ? 'Search purchases...' : 'Search sales...'}
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
                        Add {tabValue === 0 ? 'Purchase' : 'Sale'}
                    </Button>
                </Box>

                {/* Table */}
                <TableContainer sx={{ maxHeight: 600 }}>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow sx={{ bgcolor: '#F9FAFB' }}>
                                <TableCell sx={{ fontWeight: 700, color: '#374151', borderBottom: '2px solid #E5E7EB' }}>Date</TableCell>
                                <TableCell sx={{ fontWeight: 700, color: '#374151', borderBottom: '2px solid #E5E7EB' }}>
                                    {tabValue === 0 ? 'Supplier' : 'Customer'}
                                </TableCell>
                                <TableCell sx={{ fontWeight: 700, color: '#374151', borderBottom: '2px solid #E5E7EB' }}>Product</TableCell>
                                <TableCell sx={{ fontWeight: 700, color: '#374151', borderBottom: '2px solid #E5E7EB' }}>Qty</TableCell>
                                <TableCell sx={{ fontWeight: 700, color: '#374151', borderBottom: '2px solid #E5E7EB' }}>Rate</TableCell>
                                <TableCell sx={{ fontWeight: 700, color: '#374151', borderBottom: '2px solid #E5E7EB' }}>Total</TableCell>
                                <TableCell sx={{ fontWeight: 700, color: '#374151', borderBottom: '2px solid #E5E7EB' }}>Status</TableCell>
                                <TableCell sx={{ fontWeight: 700, color: '#374151', borderBottom: '2px solid #E5E7EB' }}>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredData.map((item) => (
                                <TableRow key={item.id} sx={{ '&:hover': { bgcolor: '#F9FAFB' } }}>
                                    <TableCell sx={{ color: '#374151' }}>{item.date}</TableCell>
                                    <TableCell sx={{ color: '#374151', fontWeight: 500 }}>
                                        {item.supplier || item.customer}
                                    </TableCell>
                                    <TableCell sx={{ color: '#374151' }}>{item.product}</TableCell>
                                    <TableCell sx={{ color: '#374151', fontWeight: 600 }}>{item.qty}</TableCell>
                                    <TableCell sx={{ color: '#6B7280' }}>{item.rate}</TableCell>
                                    <TableCell sx={{ color: '#374151', fontWeight: 600 }}>{item.total}</TableCell>
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
                <DialogTitle sx={{ fontWeight: 700, color: '#111827' }}>
                    {editingId ? `Edit ${tabValue === 0 ? 'Purchase' : 'Sale'}` : `Add ${tabValue === 0 ? 'Purchase' : 'Sale'}`}
                </DialogTitle>
                <DialogContent sx={{ pt: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField label="Date" fullWidth type="date" InputLabelProps={{ shrink: true }} value={formData.date || ''} onChange={(e) => setFormData({ ...formData, date: e.target.value })} />
                    <TextField label={tabValue === 0 ? 'Supplier' : 'Customer'} fullWidth value={formData.supplier || formData.customer || ''} onChange={(e) => setFormData({ ...formData, [tabValue === 0 ? 'supplier' : 'customer']: e.target.value })} />
                    <TextField label="Product" fullWidth value={formData.product || ''} onChange={(e) => setFormData({ ...formData, product: e.target.value })} />
                    <TextField label="Quantity" fullWidth type="number" value={formData.qty || ''} onChange={(e) => setFormData({ ...formData, qty: e.target.value })} />
                    <TextField label="Rate" fullWidth value={formData.rate || ''} onChange={(e) => setFormData({ ...formData, rate: e.target.value })} />
                    <TextField label="Total" fullWidth value={formData.total || ''} onChange={(e) => setFormData({ ...formData, total: e.target.value })} />
                </DialogContent>
                <DialogActions sx={{ p: 2 }}>
                    <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
                    <Button onClick={handleSave} variant="contained" sx={{ bgcolor: '#4F46E5' }}>Save</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default PurchasesSales;
