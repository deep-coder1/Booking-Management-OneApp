import React, { useState } from 'react';
import {
    Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    TextField, IconButton, Typography, Card, CardContent, Grid, Select, MenuItem, FormControl, InputLabel
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import BarChartIcon from '@mui/icons-material/BarChart';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

const reportData = [
    { month: 'Jan', sales: 4000, purchases: 2400, profit: 1600 },
    { month: 'Feb', sales: 3000, purchases: 1398, profit: 1602 },
    { month: 'Mar', sales: 2000, purchases: 9800, profit: 2290 },
    { month: 'Apr', sales: 2780, purchases: 3908, profit: 1800 },
    { month: 'May', sales: 1890, purchases: 4800, profit: 2390 },
    { month: 'Jun', sales: 2390, purchases: 3800, profit: 2500 },
];

const topProductsData = [
    { rank: 1, product: 'Wireless Mouse', sales: 1250, revenue: '₹31,25,000', growth: '+15.3%' },
    { rank: 2, product: 'Mechanical Keyboard', sales: 980, revenue: '₹83,30,000', growth: '+12.8%' },
    { rank: 3, product: 'Monitor 24"', sales: 450, revenue: '₹81,00,000', growth: '+8.5%' },
    { rank: 4, product: 'USB Keyboard', sales: 320, revenue: '₹17,60,000', growth: '+5.2%' },
    { rank: 5, product: 'Laptop Stand', sales: 280, revenue: '₹7,00,000', growth: '+3.1%' },
];

const Reports = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('all');
    const [timeRange, setTimeRange] = useState('monthly');

    return (
        <Box sx={{ maxWidth: '1600px', mx: 'auto' }}>
            {/* Header */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="h5" sx={{ fontWeight: 700, color: '#111827', mb: 1 }}>Reports & Analytics</Typography>
                <Typography variant="body2" sx={{ color: '#6B7280' }}>View comprehensive business reports and analytics</Typography>
            </Box>

            {/* Summary Cards */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={6} md={3}>
                    <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.05)', background: 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)' }}>
                        <CardContent>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Box>
                                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.9)', fontWeight: 600, mb: 1 }}>Total Revenue</Typography>
                                    <Typography variant="h5" sx={{ fontWeight: 700, color: '#fff' }}>₹45.2L</Typography>
                                    <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.8)' }}>↗ 12.5% from last month</Typography>
                                </Box>
                                <Box sx={{ color: '#fff', opacity: 0.3 }}><BarChartIcon sx={{ fontSize: 40 }} /></Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                        <CardContent>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Box>
                                    <Typography variant="body2" sx={{ color: '#6B7280', fontWeight: 600, mb: 1 }}>Total Orders</Typography>
                                    <Typography variant="h5" sx={{ fontWeight: 700, color: '#111827' }}>1,250</Typography>
                                    <Typography variant="caption" sx={{ color: '#10B981' }}>↗ 8.2% from last month</Typography>
                                </Box>
                                <Box sx={{ color: '#3B82F6', opacity: 0.1, display: 'flex', alignItems: 'center', justifyContent: 'center', width: 50, height: 50, borderRadius: 2 }}>
                                    <TrendingUpIcon sx={{ color: '#3B82F6' }} />
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                        <CardContent>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Box>
                                    <Typography variant="body2" sx={{ color: '#6B7280', fontWeight: 600, mb: 1 }}>Avg Order Value</Typography>
                                    <Typography variant="h5" sx={{ fontWeight: 700, color: '#111827' }}>₹3,616</Typography>
                                    <Typography variant="caption" sx={{ color: '#10B981' }}>↗ 5.1% from last month</Typography>
                                </Box>
                                <Box sx={{ color: '#F59E0B', opacity: 0.1, display: 'flex', alignItems: 'center', justifyContent: 'center', width: 50, height: 50, borderRadius: 2 }}>
                                    <BarChartIcon sx={{ color: '#F59E0B' }} />
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                        <CardContent>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Box>
                                    <Typography variant="body2" sx={{ color: '#6B7280', fontWeight: 600, mb: 1 }}>Growth Rate</Typography>
                                    <Typography variant="h5" sx={{ fontWeight: 700, color: '#111827' }}>+18.5%</Typography>
                                    <Typography variant="caption" sx={{ color: '#10B981' }}>Quarterly growth</Typography>
                                </Box>
                                <Box sx={{ color: '#10B981', opacity: 0.1, display: 'flex', alignItems: 'center', justifyContent: 'center', width: 50, height: 50, borderRadius: 2 }}>
                                    <TrendingUpIcon sx={{ color: '#10B981' }} />
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Charts */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} lg={8}>
                    <Paper sx={{ p: 3, borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                        <Typography variant="h6" sx={{ fontWeight: 700, color: '#4F46E5', mb: 3 }}>Sales vs Purchases Trend</Typography>
                        <ResponsiveContainer width="100%" height={350}>
                            <BarChart data={reportData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF' }} />
                                <Tooltip contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
                                <Legend />
                                <Bar dataKey="sales" fill="#22C55E" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="purchases" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="profit" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </Paper>
                </Grid>

                <Grid item xs={12} lg={4}>
                    <Paper sx={{ p: 3, borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                        <Typography variant="h6" sx={{ fontWeight: 700, color: '#4F46E5', mb: 3 }}>Filters</Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <FormControl fullWidth size="small">
                                <InputLabel>Time Range</InputLabel>
                                <Select value={timeRange} onChange={(e) => setTimeRange(e.target.value)} label="Time Range">
                                    <MenuItem value="daily">Daily</MenuItem>
                                    <MenuItem value="weekly">Weekly</MenuItem>
                                    <MenuItem value="monthly">Monthly</MenuItem>
                                    <MenuItem value="yearly">Yearly</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl fullWidth size="small">
                                <InputLabel>Report Type</InputLabel>
                                <Select value={filterType} onChange={(e) => setFilterType(e.target.value)} label="Report Type">
                                    <MenuItem value="all">All</MenuItem>
                                    <MenuItem value="sales">Sales Only</MenuItem>
                                    <MenuItem value="purchases">Purchases Only</MenuItem>
                                    <MenuItem value="profit">Profit</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>

            {/* Top Products Table */}
            <Paper sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
                <Box sx={{ p: 3, pb: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#4F46E5' }}>Top Selling Products</Typography>
                </Box>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ bgcolor: '#F9FAFB' }}>
                                <TableCell sx={{ fontWeight: 700, color: '#374151', borderBottom: '2px solid #E5E7EB' }}>Rank</TableCell>
                                <TableCell sx={{ fontWeight: 700, color: '#374151', borderBottom: '2px solid #E5E7EB' }}>Product</TableCell>
                                <TableCell sx={{ fontWeight: 700, color: '#374151', borderBottom: '2px solid #E5E7EB' }}>Sales Count</TableCell>
                                <TableCell sx={{ fontWeight: 700, color: '#374151', borderBottom: '2px solid #E5E7EB' }}>Revenue</TableCell>
                                <TableCell sx={{ fontWeight: 700, color: '#374151', borderBottom: '2px solid #E5E7EB' }}>Growth</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {topProductsData.map((item) => (
                                <TableRow key={item.rank} sx={{ '&:hover': { bgcolor: '#F9FAFB' } }}>
                                    <TableCell sx={{ color: '#6B7280', fontWeight: 600 }}>{item.rank}</TableCell>
                                    <TableCell sx={{ color: '#374151', fontWeight: 500 }}>{item.product}</TableCell>
                                    <TableCell sx={{ color: '#374151', fontWeight: 600 }}>{item.sales}</TableCell>
                                    <TableCell sx={{ color: '#374151', fontWeight: 600 }}>{item.revenue}</TableCell>
                                    <TableCell sx={{ color: '#10B981', fontWeight: 600 }}>{item.growth}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>
    );
};

export default Reports;
