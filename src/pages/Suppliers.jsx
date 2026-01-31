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
import BusinessIcon from '@mui/icons-material/Business';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

const suppliersData = [
    { id: 1, name: 'Global Tech', contact: 'John Smith', phone: '+91-9876543210', email: 'john@globaltech.com', category: 'Electronics', status: 'Active' },
    { id: 2, name: 'Premier Supplies', contact: 'Sarah Johnson', phone: '+91-8765432109', email: 'sarah@premier.com', category: 'Accessories', status: 'Active' },
    { id: 3, name: 'Eco Goods', contact: 'Mike Wilson', phone: '+91-7654321098', email: 'mike@ecogoods.com', category: 'Furniture', status: 'Active' },
    { id: 4, name: 'TechHub Industries', contact: 'Emma Davis', phone: '+91-6543210987', email: 'emma@techhub.com', category: 'Electronics', status: 'Inactive' },
    { id: 5, name: 'Office Plus', contact: 'Robert Brown', phone: '+91-5432109876', email: 'robert@officeplus.com', category: 'Furniture', status: 'Active' },
];

const Suppliers = () => {
    const [suppliers, setSuppliers] = useState(suppliersData);
    const [openDialog, setOpenDialog] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [formData, setFormData] = useState({ name: '', contact: '', phone: '', email: '', category: '', status: 'Active' });

    const handleAddClick = () => {
        setEditingId(null);
        setFormData({ name: '', contact: '', phone: '', email: '', category: '', status: 'Active' });
        setOpenDialog(true);
    };

    const handleEditClick = (supplier) => {
        setEditingId(supplier.id);
        setFormData({ ...supplier });
        setOpenDialog(true);
    };

    const handleSave = () => {
        if (editingId) {
            setSuppliers(suppliers.map(s => s.id === editingId ? { ...s, ...formData } : s));
        } else {
            setSuppliers([...suppliers, { ...formData, id: Date.now() }]);
        }
        setOpenDialog(false);
    };

    const handleDelete = (id) => {
        setSuppliers(suppliers.filter(s => s.id !== id));
    };

    const filteredSuppliers = suppliers.filter(s =>
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.contact.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const stats = [
        { label: 'Total Suppliers', value: suppliers.length, color: '#3B82F6' },
        { label: 'Active', value: suppliers.filter(s => s.status === 'Active').length, color: '#10B981' },
        { label: 'Inactive', value: suppliers.filter(s => s.status === 'Inactive').length, color: '#EF4444' },
    ];

    return (
        <Box sx={{ maxWidth: '1600px', mx: 'auto' }}>
            {/* Header */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="h5" sx={{ fontWeight: 700, color: '#111827', mb: 1 }}>Suppliers</Typography>
                <Typography variant="body2" sx={{ color: '#6B7280' }}>Manage supplier contacts and information</Typography>
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
                                        <BusinessIcon sx={{ color: stat.color }} />
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
                    placeholder="Search suppliers..."
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
                    Add Supplier
                </Button>
            </Box>

            {/* Suppliers Table */}
            <Paper sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 600 }}>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow sx={{ bgcolor: '#F9FAFB' }}>
                                <TableCell sx={{ fontWeight: 700, color: '#374151', borderBottom: '2px solid #E5E7EB' }}>Supplier Name</TableCell>
                                <TableCell sx={{ fontWeight: 700, color: '#374151', borderBottom: '2px solid #E5E7EB' }}>Contact Person</TableCell>
                                <TableCell sx={{ fontWeight: 700, color: '#374151', borderBottom: '2px solid #E5E7EB' }}>Phone</TableCell>
                                <TableCell sx={{ fontWeight: 700, color: '#374151', borderBottom: '2px solid #E5E7EB' }}>Email</TableCell>
                                <TableCell sx={{ fontWeight: 700, color: '#374151', borderBottom: '2px solid #E5E7EB' }}>Category</TableCell>
                                <TableCell sx={{ fontWeight: 700, color: '#374151', borderBottom: '2px solid #E5E7EB' }}>Status</TableCell>
                                <TableCell sx={{ fontWeight: 700, color: '#374151', borderBottom: '2px solid #E5E7EB' }}>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredSuppliers.map((supplier) => (
                                <TableRow key={supplier.id} sx={{ '&:hover': { bgcolor: '#F9FAFB' } }}>
                                    <TableCell sx={{ color: '#374151', fontWeight: 500 }}>{supplier.name}</TableCell>
                                    <TableCell sx={{ color: '#374151' }}>{supplier.contact}</TableCell>
                                    <TableCell sx={{ color: '#6B7280' }}>{supplier.phone}</TableCell>
                                    <TableCell sx={{ color: '#6B7280' }}>{supplier.email}</TableCell>
                                    <TableCell sx={{ color: '#6B7280' }}>{supplier.category}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={supplier.status}
                                            size="small"
                                            sx={{
                                                bgcolor: supplier.status === 'Active' ? '#10B981' : '#EF4444',
                                                color: '#fff', fontWeight: 600
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', gap: 1 }}>
                                            <IconButton size="small" onClick={() => handleEditClick(supplier)} sx={{ color: '#4F46E5' }}>
                                                <EditIcon fontSize="small" />
                                            </IconButton>
                                            <IconButton size="small" onClick={() => handleDelete(supplier.id)} sx={{ color: '#EF4444' }}>
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
                <DialogTitle sx={{ fontWeight: 700, color: '#111827' }}>{editingId ? 'Edit Supplier' : 'Add Supplier'}</DialogTitle>
                <DialogContent sx={{ pt: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField label="Supplier Name" fullWidth value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                    <TextField label="Contact Person" fullWidth value={formData.contact} onChange={(e) => setFormData({ ...formData, contact: e.target.value })} />
                    <TextField label="Phone" fullWidth value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                    <TextField label="Email" fullWidth value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                    <TextField label="Category" fullWidth value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} />
                </DialogContent>
                <DialogActions sx={{ p: 2 }}>
                    <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
                    <Button onClick={handleSave} variant="contained" sx={{ bgcolor: '#4F46E5' }}>Save</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default Suppliers;
