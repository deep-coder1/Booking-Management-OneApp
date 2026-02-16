import React, { useState, useEffect } from 'react';
import {
    Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    TextField, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Chip,
    Typography, CircularProgress, Alert, Snackbar
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../api';

const getStatusColor = (currentStock, minStockLevel) => {
    if (currentStock <= 0) return '#EF4444'; // Critical/Out of Stock
    if (currentStock <= minStockLevel) return '#F59E0B'; // Low Stock
    return '#10B981'; // In Stock
};

const getStatusLabel = (currentStock, minStockLevel) => {
    if (currentStock <= 0) return 'Out of Stock';
    if (currentStock <= minStockLevel) return 'Low Stock';
    return 'In Stock';
};

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    // Initial State for form
    const initialFormState = {
        productName: '',
        skuCode: '',
        category: '',
        brand: '',
        supplier: '',
        unitOfMeasure: '',
        minStockLevel: '',
        costPrice: '',
        sellingPrice: '',
        // currentStock is usually read-only or handled via inventory adjustments, 
        // but for now we might fetch it. The create API doesn't seem to ask for currentStock 
        // according to user schema (it asks strictly for the fields listed).
    };

    const [formData, setFormData] = useState(initialFormState);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const data = await getProducts();
            // API returns: { message, total, products: [...] }
            setProducts(data.products || []);
            setError(null);
        } catch (err) {
            console.error('Error fetching products:', err);
            setError('Failed to load products');
        } finally {
            setLoading(false);
        }
    };

    const handleAddClick = () => {
        setEditingId(null);
        setFormData(initialFormState);
        setOpenDialog(true);
    };

    const handleEditClick = (product) => {
        setEditingId(product.productId);
        setFormData({
            productName: product.productName,
            skuCode: product.skuCode,
            category: product.category,
            brand: product.brand,
            supplier: product.supplier,
            unitOfMeasure: product.unitOfMeasure,
            minStockLevel: product.minStockLevel,
            costPrice: product.costPrice,
            sellingPrice: product.sellingPrice,
            productId: product.productId // ensure productId is present for update
        });
        setOpenDialog(true);
    };

    const handleSave = async () => {
        // Basic validation
        if (!formData.productName || !formData.sellingPrice) {
            setSnackbar({ open: true, message: 'Please fill required fields', severity: 'warning' });
            return;
        }

        try {
            if (editingId) {
                // Update
                const updatePayload = {
                    productId: editingId, // Required by schema
                    ...formData,
                    minStockLevel: Number(formData.minStockLevel),
                    costPrice: Number(formData.costPrice),
                    sellingPrice: Number(formData.sellingPrice)
                };
                await updateProduct(updatePayload);
                setSnackbar({ open: true, message: 'Product updated successfully', severity: 'success' });
            } else {
                // Create
                const createPayload = {
                    ...formData,
                    minStockLevel: Number(formData.minStockLevel),
                    costPrice: Number(formData.costPrice),
                    sellingPrice: Number(formData.sellingPrice)
                };
                // Remove ID if present in formData (it shouldn't be for new)
                delete createPayload.productId;

                await createProduct(createPayload);
                setSnackbar({ open: true, message: 'Product created successfully', severity: 'success' });
            }
            setOpenDialog(false);
            fetchProducts(); // Refresh list
        } catch (err) {
            console.error('Error saving product:', err);
            setSnackbar({ open: true, message: 'Failed to save product', severity: 'error' });
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await deleteProduct(id);
                setSnackbar({ open: true, message: 'Product deleted successfully', severity: 'success' });
                fetchProducts();
            } catch (err) {
                console.error('Error deleting product:', err);
                setSnackbar({ open: true, message: 'Failed to delete product', severity: 'error' });
            }
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    const filteredProducts = products.filter(p =>
        (p.productName && p.productName.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (p.skuCode && p.skuCode.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <Box sx={{ maxWidth: '1600px', mx: 'auto', p: 2 }}>
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

            {/* Error Message */}
            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
            )}

            {/* Products Table */}
            <Paper sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 600 }}>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow sx={{ bgcolor: '#F9FAFB' }}>
                                <TableCell sx={{ fontWeight: 700, color: '#374151', borderBottom: '2px solid #E5E7EB' }}>Product Name</TableCell>
                                <TableCell sx={{ fontWeight: 700, color: '#374151', borderBottom: '2px solid #E5E7EB' }}>SKU</TableCell>
                                <TableCell sx={{ fontWeight: 700, color: '#374151', borderBottom: '2px solid #E5E7EB' }}>Category</TableCell>
                                <TableCell sx={{ fontWeight: 700, color: '#374151', borderBottom: '2px solid #E5E7EB' }}>Brand</TableCell>
                                <TableCell sx={{ fontWeight: 700, color: '#374151', borderBottom: '2px solid #E5E7EB' }}>Price</TableCell>
                                <TableCell sx={{ fontWeight: 700, color: '#374151', borderBottom: '2px solid #E5E7EB' }}>Stock</TableCell>
                                <TableCell sx={{ fontWeight: 700, color: '#374151', borderBottom: '2px solid #E5E7EB' }}>Status</TableCell>
                                <TableCell sx={{ fontWeight: 700, color: '#374151', borderBottom: '2px solid #E5E7EB' }}>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={8} align="center" sx={{ py: 3 }}>
                                        <CircularProgress />
                                    </TableCell>
                                </TableRow>
                            ) : filteredProducts.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={8} align="center" sx={{ py: 3, color: '#6B7280' }}>
                                        No products found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredProducts.map((product) => {
                                    const currentStock = product.currentStock || 0;
                                    const minStock = product.minStockLevel || 0;
                                    const status = getStatusLabel(currentStock, minStock);

                                    return (
                                        <TableRow key={product.productId} sx={{ '&:hover': { bgcolor: '#F9FAFB' } }}>
                                            <TableCell sx={{ color: '#374151', fontWeight: 500 }}>{product.productName}</TableCell>
                                            <TableCell sx={{ color: '#6B7280' }}>{product.skuCode}</TableCell>
                                            <TableCell sx={{ color: '#6B7280' }}>{product.category}</TableCell>
                                            <TableCell sx={{ color: '#6B7280' }}>{product.brand}</TableCell>
                                            <TableCell sx={{ color: '#374151', fontWeight: 600 }}>₹{product.sellingPrice}</TableCell>
                                            <TableCell sx={{ color: '#374151', fontWeight: 500 }}>
                                                {currentStock} <Typography variant="caption" color="textSecondary">{product.unitOfMeasure}</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Chip
                                                    label={status}
                                                    size="small"
                                                    sx={{
                                                        bgcolor: getStatusColor(currentStock, minStock),
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
                                                    <IconButton size="small" onClick={() => handleDelete(product.productId)} sx={{ color: '#EF4444' }}>
                                                        <DeleteIcon fontSize="small" />
                                                    </IconButton>
                                                </Box>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })
                            )}
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
                        value={formData.productName}
                        onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                        margin="dense"
                    />
                    <TextField
                        label="SKU Code"
                        fullWidth
                        value={formData.skuCode}
                        onChange={(e) => setFormData({ ...formData, skuCode: e.target.value })}
                        margin="dense"
                    />
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <TextField
                            label="Category"
                            fullWidth
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            margin="dense"
                        />
                        <TextField
                            label="Brand"
                            fullWidth
                            value={formData.brand}
                            onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                            margin="dense"
                        />
                    </Box>
                    <TextField
                        label="Supplier"
                        fullWidth
                        value={formData.supplier}
                        onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
                        margin="dense"
                    />
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <TextField
                            label="Cost Price"
                            type="number"
                            fullWidth
                            value={formData.costPrice}
                            onChange={(e) => setFormData({ ...formData, costPrice: e.target.value })}
                            margin="dense"
                        />
                        <TextField
                            label="Selling Price"
                            type="number"
                            fullWidth
                            value={formData.sellingPrice}
                            onChange={(e) => setFormData({ ...formData, sellingPrice: e.target.value })}
                            margin="dense"
                        />
                    </Box>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <TextField
                            label="Min Stock Level"
                            type="number"
                            fullWidth
                            value={formData.minStockLevel}
                            onChange={(e) => setFormData({ ...formData, minStockLevel: e.target.value })}
                            margin="dense"
                        />
                        <TextField
                            label="Unit of Measure"
                            fullWidth
                            value={formData.unitOfMeasure}
                            onChange={(e) => setFormData({ ...formData, unitOfMeasure: e.target.value })}
                            margin="dense"
                        />
                    </Box>
                </DialogContent>
                <DialogActions sx={{ p: 2 }}>
                    <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
                    <Button onClick={handleSave} variant="contained" sx={{ bgcolor: '#4F46E5' }}>Save</Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default Products;
