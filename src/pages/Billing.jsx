// import React from 'react'

// const Billing = () => {
//   return (
//     <div>
//       Billing Page
//     </div>
//   )
// }

// export default Billing

import React from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Chip,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DownloadIcon from "@mui/icons-material/Download";
import PrintIcon from "@mui/icons-material/Print";
import { generateInvoicePDF } from "../utils/InvoicePdf";
import { useNavigate } from "react-router-dom";

const bills = [
  {
    id: "INV-3775",
    customer: "John Smith",
    date: "2025-10-22",
    amount: "₹1119.82",
    status: "Paid",
  },
  {
    id: "INV-3776",
    customer: "John Smith",
    date: "2025-10-22",
    amount: "₹1119.82",
    status: "Pending",
  },
  {
    id: "INV-3777",
    customer: "John Smith",
    date: "2025-10-22",
    amount: "₹1119.82",
    status: "Paid",
  },
  {
    id: "INV-3778",
    customer: "John Smith",
    date: "2025-10-22",
    amount: "₹1119.82",
    status: "Paid",
  },
];

// const bills = [
//   {
//     id: "INV-4778",
//     customer: "Ajay Babu",
//     mobile: "7452631452",
//     date: "22 Jan 2026",
//     paymentMode: "Cash",
//     status: "Paid",
//     items: [
//       { name: "Wireless Mouse", qty: 1, price: 599, total: 599 },
//     ],
//     subtotal: 599,
//     gst: 107.82,
//     total: 706.82,
//   },
// ];


const statusStyle = (status) => ({
  bgcolor: status === "Paid" ? "#DCFCE7" : "#FEF3C7",
  color: status === "Paid" ? "#16A34A" : "#D97706",
  fontWeight: 600,
  borderRadius: "20px",
});

const Billing = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ maxWidth: 1600, mx: "auto" }}>
      {/* Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Box>
          <Typography variant="h5" fontWeight={700}>
            Billing
          </Typography>
          <Typography variant="body2" color="#6B7280">
            Manage Billings
          </Typography>
        </Box>
        <Button
          variant="contained"
          onClick={() => navigate("/billing/create")}
          sx={{
            bgcolor: "#6366F1",
            textTransform: "none",
            fontWeight: 600,
            borderRadius: 2,
            px: 3,
          }}
        >
          Create Bill
        </Button>
      </Box>

      {/* Search */}
      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <TextField
          placeholder="Search"
          size="small"
          fullWidth
          InputProps={{
            startAdornment: <SearchIcon sx={{ color: "#9CA3AF", mr: 1 }} />,
          }}
          sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
        />
        <TextField
          type="date"
          size="small"
          sx={{ width: 200, "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
        />
      </Box>

      {/* Table */}
      <Paper
        sx={{ borderRadius: 3, boxShadow: "0 10px 30px rgba(0,0,0,0.05)" }}
      >
        <Typography sx={{ p: 3, fontWeight: 700 }}>All Bills</Typography>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: "#EEF2FF" }}>
                {[
                  "Bill ID",
                  "Customer Name",
                  "Date",
                  "Total Amount",
                  "Status",
                  "Actions",
                ].map((h) => (
                  <TableCell key={h} sx={{ fontWeight: 700 }}>
                    {h}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {bills.map((bill) => (
                <TableRow key={bill.id} hover>
                  <TableCell>{bill.id}</TableCell>
                  <TableCell>{bill.customer}</TableCell>
                  <TableCell>{bill.date}</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>{bill.amount}</TableCell>
                  <TableCell>
                    <Chip
                      label={bill.status}
                      size="small"
                      sx={statusStyle(bill.status)}
                    />
                  </TableCell>
                  {/* <TableCell>
                    <IconButton sx={{ bgcolor: '#EEF2FF' }}><VisibilityIcon fontSize="small" /></IconButton>
                    <IconButton sx={{ bgcolor: '#DCFCE7', ml: 1 }}><DownloadIcon fontSize="small" /></IconButton>
                    <IconButton sx={{ bgcolor: '#EDE9FE', ml: 1 }}><PrintIcon fontSize="small" /></IconButton>
                  </TableCell> */}
                  <TableCell>
                    {/* VIEW */}
                    <IconButton
                      sx={{ bgcolor: "#EEF2FF" }}
                      onClick={() =>
                        navigate(`/billing/invoice/${bill.id}`, { state: bill })
                      }
                    >
                      <VisibilityIcon fontSize="small" />
                    </IconButton>

                    {/* DOWNLOAD */}
                    <IconButton
                      sx={{ bgcolor: "#DCFCE7", ml: 1 }}
                      onClick={() => {
                        const doc = generateInvoicePDF(bill);
                        doc.save(`invoice_${bill.id}.pdf`);
                      }}
                    >
                      <DownloadIcon fontSize="small" />
                    </IconButton>

                    {/* PRINT */}
                    <IconButton
                      sx={{ bgcolor: "#EDE9FE", ml: 1 }}
                      onClick={() =>
                        generateInvoicePDF(bill, { autoPrint: true })
                      }
                    >
                      <PrintIcon fontSize="small" />
                    </IconButton>
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

export default Billing;
