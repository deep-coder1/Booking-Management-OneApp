import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  MenuItem,
  Button
} from '@mui/material';
import BackButton from '../components/BackButton';

const CreateBill = () => {
  return (
    <Box sx={{ maxWidth: 1600, mx: 'auto' }}>
      {/* <Typography variant="h5" fontWeight={700} mb={3}>
        ← Create New Bill
      </Typography> */}

      <Box sx={{ mb:3 }}>
        <BackButton label="Create New Bill" />
      </Box>

      <Grid container spacing={3}>
        {/* LEFT */}
        <Grid item xs={12} md={8}>
          {/* Customer Details */}
          <Paper sx={{ p: 3, borderRadius: 3, mb: 3 }}>
            <Typography fontWeight={700} mb={2}>Customer Details</Typography>

            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField fullWidth label="Customer Name*" value="Sharma" />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField fullWidth label="Mobile Number" value="7463264585" />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField fullWidth type="date" label="Bill Date" InputLabelProps={{ shrink: true }} />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField select fullWidth label="Payment Mode" value="Cash">
                  <MenuItem value="Cash">Cash</MenuItem>
                  <MenuItem value="Card">Card</MenuItem>
                </TextField>
              </Grid>
            </Grid>
          </Paper>

          {/* Add Product */}
          <Paper sx={{ p: 3, borderRadius: 3, mb: 3 }}>
            <Typography fontWeight={700} mb={2}>Add Product</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField select fullWidth label="Category" value="Electronics">
                  <MenuItem value="Electronics">Electronics</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField select fullWidth label="Product" value="Wireless Mouse">
                  <MenuItem value="Wireless Mouse">Wireless Mouse</MenuItem>
                </TextField>
              </Grid>
            </Grid>
          </Paper>

          {/* Billing Items */}
          <Paper sx={{ p: 5, borderRadius: 3, textAlign: 'center', color: '#9CA3AF' }}>
            <Typography>No items added yet. Add products to create a bill.</Typography>
          </Paper>
        </Grid>

        {/* RIGHT */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Typography fontWeight={700} mb={2}>Bill Summary</Typography>

            {[
              ['Price / Night', '₹0.00'],
              ['GST (18%)', '₹0.00'],
            ].map(([label, value]) => (
              <Box key={label} sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography color="#6B7280">{label}</Typography>
                <Typography fontWeight={600}>{value}</Typography>
              </Box>
            ))}

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
              <Typography fontWeight={700}>Grand Total</Typography>
              <Typography fontWeight={700} color="#6366F1">₹0.00</Typography>
            </Box>

            <Button
              fullWidth
              disabled
              sx={{
                mt: 3,
                bgcolor: '#E5E7EB',
                color: '#6B7280',
                textTransform: 'none',
                fontWeight: 600,
                borderRadius: 2
              }}
            >
              Generate Bill
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CreateBill;
