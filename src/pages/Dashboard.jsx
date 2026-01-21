import React from 'react';
import {
    Box, Grid, Paper, Typography, Card, CardContent, Table,
    TableBody, TableCell, TableContainer, TableHead, TableRow,
    IconButton
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    BarChart, Bar, PieChart, Pie, Cell, Legend
} from 'recharts';
import InventoryIcon from '@mui/icons-material/Inventory';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

// --- Data ---
const salesData = [
    { name: 'Oct 19', purchase: 2500, sales: 4000 },
    { name: 'Oct 20', purchase: 5000, sales: 3000 },
    { name: 'Oct 21', purchase: 2000, sales: 5500 },
    { name: 'Oct 22', purchase: 6000, sales: 3500 },
    { name: 'Oct 23', purchase: 3000, sales: 4500 },
    { name: 'Oct 24', purchase: 4500, sales: 6000 },
    { name: 'Oct 25', purchase: 3500, sales: 5000 },
];

const topSellingData = [
    { name: 'Keyboard', value: 70 },
    { name: 'Mouse', value: 20 },
    { name: 'Screen', value: 35 },
    { name: 'Laptop', value: 20 },
    { name: 'Phone', value: 45 },
    { name: 'Camera', value: 15 },
];

const stockData = [
    { name: 'Electronics', value: 120 },
    { name: 'Accessories', value: 210 },
    { name: 'Furniture', value: 452 },
];
// Figma-like colors
const CHART_COLORS = ['#3B82F6', '#EF4444', '#FBBF24'];

const recentPurchases = [
    { date: '2025-10-22', supplier: 'Global Tech', product: 'Wireless Mouse', qty: 100, total: '₹1,500' },
    { date: '2025-10-22', supplier: 'Global Tech', product: 'Wireless Mouse', qty: 100, total: '₹1,500' },
    { date: '2025-10-22', supplier: 'Global Tech', product: 'Wireless Mouse', qty: 100, total: '₹1,500' },
    { date: '2025-10-22', supplier: 'Global Tech', product: 'Wireless Mouse', qty: 100, total: '₹4,500' },
];

const recentSales = [
    { date: '2025-10-22', supplier: 'Global Tech', product: 'Wireless Mouse', qty: 100, price: '₹150', total: '₹1,500' },
    { date: '2025-10-22', supplier: 'Global Tech', product: 'Wireless Mouse', qty: 100, price: '₹150', total: '₹1,500' },
    { date: '2025-10-22', supplier: 'Global Tech', product: 'Wireless Mouse', qty: 100, price: '₹150', total: '₹1,500' },
    { date: '2025-10-22', supplier: 'Global Tech', product: 'Wireless Mouse', qty: 100, price: '₹150', total: '₹1,500' },
    { date: '2025-10-22', supplier: 'Global Tech', product: 'Wireless Mouse', qty: 100, price: '₹150', total: '₹1,500' },
];

// --- Components ---

const SummaryCard = ({ title, value, subtext, icon, color, isGradient }) => (
    <Card sx={{
        height: '100%',
        borderRadius: 3, // More rounded
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        overflow: 'hidden',
        background: isGradient ? 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)' : '#fff', // Stronger blue gradient
        color: isGradient ? '#fff' : 'inherit'
    }}>
        <CardContent sx={{ p: 3, '&:last-child': { pb: 3 } }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                    <Typography
                        variant="body2"
                        sx={{ fontWeight: 600, mb: 1.5, color: isGradient ? 'rgba(255,255,255,0.9)' : '#6B7280' }}
                    >
                        {title}
                    </Typography>
                    <Typography
                        variant="h4"
                        sx={{ fontWeight: 800, mb: 1, color: isGradient ? '#fff' : color }} // Bolder value
                    >
                        {value}
                    </Typography>
                    <Typography
                        variant="caption"
                        sx={{
                            color: isGradient ? 'rgba(255,255,255,0.8)' : '#10B981',
                            display: 'flex',
                            alignItems: 'center',
                            fontWeight: 500,
                            gap: 0.5
                        }}
                    >
                        {subtext}
                    </Typography>
                </Box>
                <Box sx={{
                    bgcolor: isGradient ? 'rgba(255,255,255,0.2)' : color,
                    borderRadius: 2,
                    p: 1.5,
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minWidth: 48,
                    height: 48
                }}>
                    {React.cloneElement(icon, { fontSize: 'medium' })}
                </Box>
            </Box>
        </CardContent>
    </Card>
);

const Dashboard = () => {
    return (
        <Box sx={{ maxWidth: '1600px', mx: 'auto' }}> {/* Constrain max width for large screens */}
            {/* Summary Cards */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={6} md={3}>
                    <SummaryCard
                        title="Total Stock Value"
                        value="789,462"
                        subtext="↗ 8.5% Up from yesterday"
                        icon={<AttachMoneyIcon />}
                        color="#3B82F6"
                        isGradient={true}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <SummaryCard
                        title="Total Quantity In Stock"
                        value="891"
                        subtext="↗ 8.5% Up from yesterday"
                        icon={<InventoryIcon />}
                        color="#6366F1" // Indigo
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <SummaryCard
                        title="Active Supplier"
                        value="40"
                        subtext="↗ 8.5% Up from yesterday"
                        icon={<VerifiedUserIcon />}
                        color="#F59E0B" // Amber
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <SummaryCard
                        title="Low Stock Alert"
                        value="40"
                        subtext=""
                        icon={<WarningAmberIcon />}
                        color="#EF4444" // Red
                    />
                </Grid>
            </Grid>

            {/* Charts Section 1 */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                {/* Sales vs Purchase */}
                <Grid item xs={12} lg={8}>
                    <Paper sx={{ p: 3, borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.05)', height: 420, display: 'flex', flexDirection: 'column', width: '100%' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3, alignItems: 'center' }}>
                            <Typography variant="h6" sx={{ fontWeight: 700, color: '#4F46E5' }}>Sales vs Purchase</Typography>
                            <IconButton size="small"><MoreVertIcon /></IconButton>
                        </Box>
                        <Box sx={{ flexGrow: 1, minHeight: 0, minWidth: 0 }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={salesData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#22C55E" stopOpacity={0.15} />
                                            <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="colorPurchase" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.15} />
                                            <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} dy={10} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                                    <Tooltip
                                        contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
                                    />
                                    <Legend verticalAlign="top" align="right" iconType="circle" />
                                    <Area type="monotone" dataKey="sales" name="Sales" stroke="#22C55E" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
                                    <Area type="monotone" dataKey="purchase" name="purchases" stroke="#8B5CF6" strokeWidth={3} fillOpacity={1} fill="url(#colorPurchase)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </Box>
                    </Paper>
                </Grid>

                {/* Top Selling Products */}
                <Grid item xs={12} lg={4}>
                    <Paper sx={{ p: 3, borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.05)', height: 420, display: 'flex', flexDirection: 'column', width: '100%' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3, alignItems: 'center' }}>
                            <Typography variant="h6" sx={{ fontWeight: 700, color: '#4F46E5' }}>Top Selling Products</Typography>
                            <IconButton size="small"><MoreVertIcon /></IconButton>
                        </Box>
                        <Box sx={{ flexGrow: 1, minHeight: 0, minWidth: 0 }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={topSellingData} barSize={24} layout="vertical"> {/* Horizontal bars for better space usage? Or vertical as designed? Keeping vertical but slimmer */}
                                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#E5E7EB" />
                                    <XAxis type="category" dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#9CA3AF' }} interval={0} dy={10} />
                                    <YAxis type="number" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                                    <Tooltip
                                        cursor={{ fill: 'transparent' }}
                                        contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
                                    />
                                    <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                                        {topSellingData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#6366F1' : '#A5B4FC'} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>

            {/* Charts Section 2 & Table */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                {/* Stock Distribution */}
                <Grid item xs={12} lg={4}>
                    <Paper sx={{ p: 3, borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.05)', height: 420, display: 'flex', flexDirection: 'column', width: '100%' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, alignItems: 'center' }}>
                            <Typography variant="h6" sx={{ fontWeight: 700, color: '#4F46E5' }}>Stock Distribution</Typography>
                            <IconButton size="small"><MoreVertIcon /></IconButton>
                        </Box>
                        <Box sx={{ flexGrow: 1, minHeight: 0, minWidth: 0 }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={stockData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                        startAngle={90}
                                        endAngle={-270}
                                    >
                                        {stockData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </Box>
                        {/* Legend Key */}
                        <Box sx={{ mt: 2 }}>
                            {stockData.map((entry, index) => (
                                <Box key={entry.name} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1, alignItems: 'center' }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: CHART_COLORS[index % CHART_COLORS.length] }} />
                                        <Typography variant="body2" sx={{ color: '#4B5563', fontSize: '0.875rem' }}>{entry.name}</Typography>
                                    </Box>
                                    <Typography variant="body2" sx={{ fontWeight: 600 }}>{entry.value}</Typography>
                                </Box>
                            ))}
                        </Box>
                    </Paper>
                </Grid>

                {/* Recent Purchases */}
                <Grid item xs={12} lg={8}>
                    <Paper sx={{ p: 0, borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.05)', overflow: 'hidden', height: 420, display: 'flex', flexDirection: 'column', width: '100%' }}>
                        <Box sx={{ p: 3, pb: 2 }}>
                            <Typography variant="h6" sx={{ fontWeight: 700, color: '#4F46E5' }}>Recent Purchases</Typography>
                        </Box>
                        <TableContainer sx={{ flexGrow: 1, overflow: 'auto' }}> {/* Ensure table scrolls if needed */}
                            <Table stickyHeader size="small" sx={{ width: '100%' }}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ bgcolor: '#F9FAFB', fontWeight: 600, color: '#6B7280' }}>Date</TableCell>
                                        <TableCell sx={{ bgcolor: '#F9FAFB', fontWeight: 600, color: '#6B7280' }}>Supplier</TableCell>
                                        <TableCell sx={{ bgcolor: '#F9FAFB', fontWeight: 600, color: '#6B7280' }}>Product</TableCell>
                                        <TableCell sx={{ bgcolor: '#F9FAFB', fontWeight: 600, color: '#6B7280' }}>Qty</TableCell>
                                        <TableCell sx={{ bgcolor: '#F9FAFB', fontWeight: 600, color: '#6B7280' }}>Total</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {recentPurchases.map((row, index) => (
                                        <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                            <TableCell sx={{ color: '#374151' }}>{row.date}</TableCell>
                                            <TableCell sx={{ color: '#374151' }}>{row.supplier}</TableCell>
                                            <TableCell sx={{ color: '#374151' }}>{row.product}</TableCell>
                                            <TableCell sx={{ color: '#374151' }}>{row.qty}</TableCell>
                                            <TableCell sx={{ color: '#374151', fontWeight: 600 }}>{row.total}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Grid>
            </Grid>

            {/* Recent Sales Table */}
            <Paper sx={{ p: 0, borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.05)', overflow: 'hidden', width: '100%' }}>
                <Box sx={{ p: 3, pb: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#4F46E5' }}>Recent Sales</Typography>
                </Box>
                <TableContainer sx={{ width: '100%' }}>
                    <Table sx={{ width: '100%' }}>
                        <TableHead>
                            <TableRow sx={{ bgcolor: '#EFF6FF' }}>
                                <TableCell sx={{ fontWeight: 600, color: '#1E40AF', borderBottom: '1px solid #BFDBFE' }}>Date</TableCell>
                                <TableCell sx={{ fontWeight: 600, color: '#1E40AF', borderBottom: '1px solid #BFDBFE' }}>Supplier</TableCell>
                                <TableCell sx={{ fontWeight: 600, color: '#1E40AF', borderBottom: '1px solid #BFDBFE' }}>Product</TableCell>
                                <TableCell sx={{ fontWeight: 600, color: '#1E40AF', borderBottom: '1px solid #BFDBFE' }}>Qty</TableCell>
                                <TableCell sx={{ fontWeight: 600, color: '#1E40AF', borderBottom: '1px solid #BFDBFE' }}>Price</TableCell>
                                <TableCell sx={{ fontWeight: 600, color: '#1E40AF', borderBottom: '1px solid #BFDBFE' }}>Total</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {recentSales.map((row, index) => (
                                <TableRow key={index} hover>
                                    <TableCell sx={{ color: '#374151' }}>{row.date}</TableCell>
                                    <TableCell sx={{ color: '#374151' }}>{row.supplier}</TableCell>
                                    <TableCell sx={{ color: '#374151' }}>{row.product}</TableCell>
                                    <TableCell sx={{ color: '#374151' }}>{row.qty}</TableCell>
                                    <TableCell sx={{ color: '#374151' }}>{row.price}</TableCell>
                                    <TableCell sx={{ color: '#374151', fontWeight: 600 }}>{row.total}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>
    );
};

export default Dashboard;
