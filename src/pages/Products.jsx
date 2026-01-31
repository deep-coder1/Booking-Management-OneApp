import React, { useState } from 'react';
import {
    Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    TextField, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Card, CardContent,
    Typography, Grid, Chip
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';

const productsData = [
    { id: 1, name: 'Wireless Mouse', sku: 'WM-001', category: 'Accessories', price: '₹1,500', stock: 250, status: 'In Stock' },
    { id: 2, name: 'USB Keyboard', sku: 'KB-002', category: 'Accessories', price: '₹3,500', stock: 150, status: 'In Stock' },
    { id: 3, name: 'Monitor 24"', sku: 'MON-001', category: 'Electronics', price: '₹15,000', stock: 45, status: 'Low Stock' },
    { id: 4, name: 'Laptop Stand', sku: 'LS-001', category: 'Furniture', price: '₹2,500', stock: 80, status: 'In Stock' },
    { id: 5, name: 'USB-C Cable', sku: 'USB-003', category: 'Accessories', price: '₹500', stock: 10, status: 'Critical' },
    { id: 6, name: 'Mechanical Keyboard', sku: 'MK-001', category: 'Accessories', price: '₹8,500', stock: 200, status: 'In Stock' },
    { id: 7, name: 'Desk Lamp', sku: 'DL-001', category: 'Furniture', price: '₹4,500', stock: 60, status: 'In Stock' },
    { id: 8, name: 'Wireless Headphones', sku: 'WH-001', category: 'Electronics', price: '₹5,500', stock: 120, status: 'In Stock' },
];

const getStatusColor = (status) => {
    switch (status) {
        case 'In Stock':
            return '#10B981';
        case 'Low Stock':
            return '#F59E0B';
        case 'Critical':
            return '#EF4444';
        default:
            return '#6B7280';
    }
};

const Products = () => {
    const [products, setProducts] = useState(productsData);
    const [openDialog, setOpenDialog] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [formData, setFormData] = useState({ name: '', sku: '', category: '', price: '', stock: '' });

    const handleAddClick = () => {
        setEditingId(null);
        setFormData({ name: '', sku: '', category: '', price: '', stock: '' });
        setOpenDialog(true);
    };

    const handleEditClick = (product) => {
        setEditingId(product.id);
        setFormData({ ...product });
        setOpenDialog(true);
    };

    const handleSave = () => {
        if (editingId) {
            setProducts(products.map(p => p.id === editingId ? { ...p, ...formData } : p));
        } else {
            setProducts([...products, { ...formData, id: Date.now(), status: 'In Stock' }]);
        }
        setOpenDialog(false);
    };

    const handleDelete = (id) => {
        setProducts(products.filter(p => p.id !== id));
    };

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.sku.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Box sx={{ maxWidth: '1600px', mx: 'auto' }}>
            {/* Header */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="h5" sx={{ fontWeight: 700, color: '#111827', mb: 1 }}>Products</Typography>
                <Typography variant="body2" sx={{ color: '#6B7280' }}>Manage your product inventory</Typography>
            </Box>

            {/* Search & Add Button */}
            <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
                <TextField
                    placeholder="Search products..."
                    variant="outlined"
                    size="small"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{ startAdornment: <SearchIcon sx={{ mr: 1, color: '#9CA3AF' }} /> }}
                    sx={{
                        flex: 1,
                        minWidth: 200,
                        '& .MuiOutlinedInput-root': { borderRadius: 2 }
                    }}
                />
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleAddClick}
                    sx={{
                        bgcolor: '#4F46E5',
                        color: '#fff',
                        borderRadius: 2,
                        textTransform: 'none',
                        fontWeight: 600,
                        '&:hover': { bgcolor: '#4338CA' }
                    }}
                >
                    Add Product
                </Button>
            </Box>

            {/* Products Table */}
            <Paper sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 600 }}>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow sx={{ bgcolor: '#F9FAFB' }}>
                                <TableCell sx={{ fontWeight: 700, color: '#374151', borderBottom: '2px solid #E5E7EB' }}>Product Name</TableCell>
                                <TableCell sx={{ fontWeight: 700, color: '#374151', borderBottom: '2px solid #E5E7EB' }}>SKU</TableCell>
                                <TableCell sx={{ fontWeight: 700, color: '#374151', borderBottom: '2px solid #E5E7EB' }}>Category</TableCell>
                                <TableCell sx={{ fontWeight: 700, color: '#374151', borderBottom: '2px solid #E5E7EB' }}>Price</TableCell>
                                <TableCell sx={{ fontWeight: 700, color: '#374151', borderBottom: '2px solid #E5E7EB' }}>Stock</TableCell>
                                <TableCell sx={{ fontWeight: 700, color: '#374151', borderBottom: '2px solid #E5E7EB' }}>Status</TableCell>
                                <TableCell sx={{ fontWeight: 700, color: '#374151', borderBottom: '2px solid #E5E7EB' }}>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredProducts.map((product) => (
                                <TableRow key={product.id} sx={{ '&:hover': { bgcolor: '#F9FAFB' } }}>
                                    <TableCell sx={{ color: '#374151', fontWeight: 500 }}>{product.name}</TableCell>
                                    <TableCell sx={{ color: '#6B7280' }}>{product.sku}</TableCell>
                                    <TableCell sx={{ color: '#6B7280' }}>{product.category}</TableCell>
                                    <TableCell sx={{ color: '#374151', fontWeight: 600 }}>{product.price}</TableCell>
                                    <TableCell sx={{ color: '#374151', fontWeight: 500 }}>{product.stock}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={product.status}
                                            size="small"
                                            sx={{
                                                bgcolor: getStatusColor(product.status),
                                                color: '#fff',
                                                fontWeight: 600,
                                                borderRadius: 1
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', gap: 1 }}>
                                            <IconButton size="small" onClick={() => handleEditClick(product)} sx={{ color: '#4F46E5' }}>
                                                <EditIcon fontSize="small" />
                                            </IconButton>
                                            <IconButton size="small" onClick={() => handleDelete(product.id)} sx={{ color: '#EF4444' }}>
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

            {/* Add/Edit Dialog */}
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
                <DialogTitle sx={{ fontWeight: 700, color: '#111827' }}>{editingId ? 'Edit Product' : 'Add New Product'}</DialogTitle>
                <DialogContent sx={{ pt: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField
                        label="Product Name"
                        fullWidth
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                    <TextField
                        label="SKU"
                        fullWidth
                        value={formData.sku}
                        onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                    />
                    <TextField
                        label="Category"
                        fullWidth
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    />
                    <TextField
                        label="Price"
                        fullWidth
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    />
                    <TextField
                        label="Stock"
                        fullWidth
                        type="number"
                        value={formData.stock}
                        onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    />
                </DialogContent>
                <DialogActions sx={{ p: 2 }}>
                    <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
                    <Button onClick={handleSave} variant="contained" sx={{ bgcolor: '#4F46E5' }}>Save</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default Products;
