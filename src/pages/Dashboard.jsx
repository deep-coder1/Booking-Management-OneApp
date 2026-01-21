import React from 'react';
import {
    Box, Grid, Paper, Typography, Card, CardContent, Table,
    TableBody, TableCell, TableContainer, TableHead, TableRow,
    Avatar
} from '@mui/material';
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
    { name: 'Oct 17', purchase: 4000, sales: 5000 },
    { name: 'Oct 18', purchase: 3000, sales: 4000 },
    { name: 'Oct 19', purchase: 6000, sales: 5000 },
    { name: 'Oct 20', purchase: 3000, sales: 3000 },
    { name: 'Oct 21', purchase: 7000, sales: 6000 },
    { name: 'Oct 22', purchase: 4000, sales: 5000 },
    { name: 'Oct 23', purchase: 4000, sales: 4500 },
];

const topSellingData = [
    { name: 'Org name', value: 70 },
    { name: 'Org name', value: 20 },
    { name: 'Org name', value: 35 },
    { name: 'Org name', value: 20 },
    { name: 'Org name', value: 45 },
    { name: 'Org name', value: 15 },
];

const stockData = [
    { name: 'Electronics', value: 120 },
    { name: 'Accessories', value: 210 },
    { name: 'Furniture', value: 452 },
];
const COLORS = ['#3b82f6', '#ef4444', '#fbbf24'];

const recentPurchases = [
    { date: '2025-10-22', supplier: 'Global Tech', product: 'Wireless Mouse', qty: 100, total: '₹1,500' },
    { date: '2025-10-22', supplier: 'Global Tech', product: 'Wireless Mouse', qty: 100, total: '₹1,500' },
    { date: '2025-10-22', supplier: 'Global Tech', product: 'Wireless Mouse', qty: 100, total: '₹1,500' },
    { date: '2025-10-22', supplier: 'Global Tech', product: 'Wireless Mouse', qty: 100, total: '₹4,500' },
    { date: '2025-10-22', supplier: 'Global Tech', product: 'Wireless Mouse', qty: 100, total: '₹1,500' },
];

const recentSales = [
    { date: '2025-10-22', supplier: 'Global Tech', product: 'Wireless Mouse', qty: 100, price: '₹150', total: '₹1,500' },
    { date: '2025-10-22', supplier: 'Global Tech', product: 'Wireless Mouse', qty: 100, price: '₹150', total: '₹1,500' },
    { date: '2025-10-22', supplier: 'Global Tech', product: 'Wireless Mouse', qty: 100, price: '₹150', total: '₹1,500' },
    { date: '2025-10-22', supplier: 'Global Tech', product: 'Wireless Mouse', qty: 100, price: '₹150', total: '₹1,500' },
];

// --- Components ---

const SummaryCard = ({ title, value, subtext, icon, color }) => (
    <Card sx={{ height: '100%', borderRadius: 2, boxShadow: '0 2px 10px rgba(0,0,0,0.05)', overflow: 'visible' }}>
        <CardContent sx={{ position: 'relative', p: 3, '&:last-child': { pb: 3 } }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                    <Typography color="textSecondary" variant="body2" sx={{ fontWeight: 600, mb: 1 }}>{title}</Typography>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', color: color, mb: 1 }}>{value}</Typography>
                    <Typography variant="caption" sx={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        {subtext}
                    </Typography>
                </Box>
                <Box sx={{
                    bgcolor: color,
                    borderRadius: 2,
                    p: 1,
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 48,
                    height: 48
                }}>
                    {icon}
                </Box>
            </Box>
        </CardContent>
    </Card>
);

const Dashboard = () => {
    return (
        <Box>
            {/* Summary Cards */}
            <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid item xs={12} sm={6} md={3}>
                    <SummaryCard
                        title="Total Stock Value"
                        value="789462"
                        subtext="↗ 8.5% Up from yesterday"
                        icon={<AttachMoneyIcon />}
                        color="#3b82f6"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <SummaryCard
                        title="Total Quantity In Stock"
                        value="891"
                        subtext="↗ 8.5% Up from yesterday"
                        icon={<InventoryIcon />}
                        color="#6366f1"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <SummaryCard
                        title="Active Supplier"
                        value="40"
                        subtext="↗ 8.5% Up from yesterday"
                        icon={<VerifiedUserIcon />}
                        color="#f59e0b"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <SummaryCard
                        title="Low Stock Alert"
                        value="40"
                        subtext=""
                        icon={<WarningAmberIcon />}
                        color="#ef4444"
                    />
                </Grid>
            </Grid>

            {/* Charts Section 1 */}
            <Grid container spacing={3} sx={{ mb: 3 }}>
                {/* Sales vs Purchase */}
                <Grid item xs={12} md={8}>
                    <Paper sx={{ p: 3, borderRadius: 2, boxShadow: '0 2px 10px rgba(0,0,0,0.05)', height: 400 }}>
                        <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold', color: '#4f46e5' }}>Sales vs Purchase</Typography>
                        <ResponsiveContainer width="100%" height="85%">
                            <AreaChart data={salesData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorPurchase" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af' }} />
                                <Tooltip />
                                <Legend verticalAlign="bottom" height={36} />
                                <Area type="monotone" dataKey="sales" stroke="#22c55e" fillOpacity={1} fill="url(#colorSales)" />
                                <Area type="monotone" dataKey="purchase" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorPurchase)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </Paper>
                </Grid>

                {/* Top Selling Products */}
                <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 3, borderRadius: 2, boxShadow: '0 2px 10px rgba(0,0,0,0.05)', height: 400 }}>
                        <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold', color: '#4f46e5' }}>Top Selling Products</Typography>
                        <ResponsiveContainer width="100%" height="85%">
                            <BarChart data={topSellingData} barSize={30}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#9ca3af' }} interval={0} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af' }} />
                                <Tooltip />
                                <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]}>
                                    {topSellingData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#6366f1' : '#a5b4fc'} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </Paper>
                </Grid>
            </Grid>

            {/* Charts Section 2 & Table */}
            <Grid container spacing={3} sx={{ mb: 3 }}>
                {/* Stock Distribution */}
                <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 3, borderRadius: 2, boxShadow: '0 2px 10px rgba(0,0,0,0.05)', height: 400 }}>
                        <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: '#4f46e5' }}>Stock Distribution by Category</Typography>
                        <ResponsiveContainer width="100%" height="60%">
                            <PieChart>
                                <Pie
                                    data={stockData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {stockData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                        <Box sx={{ mt: 2 }}>
                            {stockData.map((entry, index) => (
                                <Box key={entry.name} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: COLORS[index % COLORS.length] }} />
                                        <Typography variant="body2">{entry.name}</Typography>
                                    </Box>
                                    <Typography variant="body2" fontWeight="bold">{entry.value}</Typography>
                                </Box>
                            ))}
                        </Box>
                    </Paper>
                </Grid>

                {/* Recent Purchases */}
                <Grid item xs={12} md={8}>
                    <Paper sx={{ p: 3, borderRadius: 2, boxShadow: '0 2px 10px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
                        <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: '#4f46e5' }}>Recent Purchases</Typography>
                        <TableContainer>
                            <Table size="small">
                                <TableHead sx={{ bgcolor: '#f3f4f6' }}>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: 'bold' }}>Date</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }}>Supplier</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }}>Product</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }}>Qty</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }}>Total</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {recentPurchases.map((row, index) => (
                                        <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                            <TableCell>{row.date}</TableCell>
                                            <TableCell>{row.supplier}</TableCell>
                                            <TableCell>{row.product}</TableCell>
                                            <TableCell>{row.qty}</TableCell>
                                            <TableCell>{row.total}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Grid>
            </Grid>

            {/* Recent Sales Table */}
            <Paper sx={{ p: 3, borderRadius: 2, boxShadow: '0 2px 10px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: '#4f46e5' }}>Recent Sales</Typography>
                <TableContainer>
                    <Table>
                        <TableHead sx={{ bgcolor: '#eff6ff' }}>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold' }}>Date</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Supplier</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Product</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Qty</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Price</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Total</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {recentSales.map((row, index) => (
                                <TableRow key={index} hover>
                                    <TableCell>{row.date}</TableCell>
                                    <TableCell>{row.supplier}</TableCell>
                                    <TableCell>{row.product}</TableCell>
                                    <TableCell>{row.qty}</TableCell>
                                    <TableCell>{row.price}</TableCell>
                                    <TableCell>{row.total}</TableCell>
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
