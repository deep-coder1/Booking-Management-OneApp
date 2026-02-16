// import React from "react";
// import { Box, Button } from "@mui/material";
// import PrintIcon from "@mui/icons-material/Print";
// import DownloadIcon from "@mui/icons-material/Download";
// import { generateInvoicePDF } from "../utils/InvoicePdf";

// const InvoicePreview = () => {
//   return (
//     <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
      
//       {/* DOWNLOAD BUTTON */}
//       <Button
//         startIcon={<DownloadIcon />}
//         variant="outlined"
//         onClick={() => {
//           const doc = generateInvoicePDF();
//           doc.save("invoice_INV-4778.pdf");
//         }}
//       >
//         Download
//       </Button>

//       {/* PRINT BUTTON */}
//       <Button
//         startIcon={<PrintIcon />}
//         variant="contained"
//         onClick={() => generateInvoicePDF({ autoPrint: true })}
//       >
//         Print
//       </Button>
//     </Box>
//   );
// };

// export default InvoicePreview;


// import { useLocation } from "react-router-dom";
// import { Box, Typography, Paper } from "@mui/material";
// import BackButton from "../components/BackButton";

// const InvoicePreview = () => {
//   const { state: invoice } = useLocation();

//   if (!invoice) {
//     return <Typography>No invoice data found</Typography>;
//   }

//   return (
//     <Box>
//       <BackButton label="Create New Bill" />

//       <Paper sx={{ maxWidth: 800, mx: "auto", p: 4, mt: 3 }}>
//         <Typography variant="h6" align="center" fontWeight={700}>
//           INVOICE
//         </Typography>

//         <Typography align="center">{invoice.customer}</Typography>

//         <Box sx={{ mt: 3 }}>
//           <Typography>Invoice No: {invoice.id}</Typography>
//           <Typography>Date: {invoice.date}</Typography>
//           <Typography>Payment: {invoice.paymentMode}</Typography>
//         </Box>

//         <Box sx={{ mt: 3 }}>
//           {invoice.items.map((item, i) => (
//             <Typography key={i}>
//               {item.name} × {item.qty} = ₹{item.total}
//             </Typography>
//           ))}
//         </Box>

//         <Typography sx={{ mt: 3, fontWeight: 700 }}>
//           Grand Total: ₹{invoice.total}
//         </Typography>
//       </Paper>
//     </Box>
//   );
// };

// export default InvoicePreview;


// import { useLocation } from "react-router-dom";
// import { Box, Typography, Paper } from "@mui/material";
// import BackButton from "../components/BackButton";

// const InvoicePreview = () => {
//   const { state } = useLocation();

//   // ✅ SAFE NORMALIZATION
//   const invoice = {
//     id: state?.id || "N/A",
//     customer: state?.customer || "N/A",
//     date: state?.date || "N/A",
//     paymentMode: state?.paymentMode || "N/A",
//     items: state?.items || [],          // 🔥 IMPORTANT
//     total: state?.total || 0,
//   };

//   return (
//     <Box>
//       <BackButton label="Invoice Preview" />

//       <Paper sx={{ maxWidth: 800, mx: "auto", p: 4, mt: 3 }}>
//         <Typography variant="h6" align="center" fontWeight={700}>
//           INVOICE
//         </Typography>

//         <Typography align="center">{invoice.customer}</Typography>

//         <Box sx={{ mt: 3 }}>
//           <Typography>Invoice No: {invoice.id}</Typography>
//           <Typography>Date: {invoice.date}</Typography>
//           <Typography>Payment: {invoice.paymentMode}</Typography>
//         </Box>

//         <Box sx={{ mt: 3 }}>
//           {invoice.items.length === 0 ? (
//             <Typography color="text.secondary">
//               No items found for this invoice
//             </Typography>
//           ) : (
//             invoice.items.map((item, index) => (
//               <Typography key={index}>
//                 {item.name} × {item.qty} = ₹{item.total}
//               </Typography>
//             ))
//           )}
//         </Box>

//         <Typography sx={{ mt: 3, fontWeight: 700 }}>
//           Grand Total: ₹{invoice.total}
//         </Typography>
//       </Paper>
//     </Box>
//   );
// };

// export default InvoicePreview;


import {
  Box,
  Paper,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  Divider,
  Button,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import PrintIcon from "@mui/icons-material/Print";
import BackButton from "../components/BackButton";
import { generateInvoicePDF } from "../utils/InvoicePdf";
import { useLocation } from "react-router-dom";

const InvoicePreview = () => {
  const { state } = useLocation();

  const invoice = {
    id: state?.id || "INV-4778",
    customer: state?.customer || "AJAY BABU",
    mobile: state?.mobile || "7452631452",
    date: state?.date || "JANUARY 22, 2026",
    paymentMode: state?.paymentMode || "CASH",
    items: state?.items || [
      { name: "Wireless Mouse", qty: 1, price: 599, total: 599 },
    ],
    subtotal: state?.subtotal || 599,
    gst: state?.gst || 107.82,
    total: state?.total || 706.82,
    status: "Paid",
  };

  return (
    <Box>
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <BackButton label="Create New Bill" />

        <Box>
          <Button
            startIcon={<DownloadIcon />}
            variant="outlined"
            sx={{ mr: 1 }}
            onClick={() => {
              const doc = generateInvoicePDF(invoice);
              doc.save(`invoice_${invoice.id}.pdf`);
            }}
          >
            Download
          </Button>

          <Button
            startIcon={<PrintIcon />}
            variant="contained"
            onClick={() => generateInvoicePDF(invoice, { autoPrint: true })}
          >
            Print
          </Button>
        </Box>
      </Box>

      {/* INVOICE CARD */}
      <Paper sx={{ maxWidth: 900, mx: "auto", p: 5, mt: 3 }}>
        {/* TITLE */}
        <Typography variant="h5" align="center" fontWeight={700}>
          INVOICE
        </Typography>

        <Typography align="center" variant="body2">
          Your Store Name
        </Typography>

        <Typography align="center" variant="caption" color="text.secondary">
          123 Business Street, City, State 12345 <br />
          Phone: +91 98765 43210 | Email: store@example.com
        </Typography>

        <Divider sx={{ my: 3 }} />

        {/* DETAILS */}
        <Box display="flex" justifyContent="space-between">
          <Box>
            <Typography fontWeight={700}>INVOICE DETAILS</Typography>
            <Typography>Invoice No: {invoice.id}</Typography>
            <Typography>Date: {invoice.date}</Typography>
            <Typography>Payment Mode: {invoice.paymentMode}</Typography>
          </Box>

          <Box>
            <Typography fontWeight={700}>BILL TO</Typography>
            <Typography>Customer Name: {invoice.customer}</Typography>
            <Typography>Mobile: {invoice.mobile}</Typography>
          </Box>
        </Box>

        {/* TABLE */}
        <Table sx={{ mt: 4 }}>
          <TableHead>
            <TableRow sx={{ background: "#F5FAFF" }}>
              <TableCell>Product</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Total</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {invoice.items.map((item, i) => (
              <TableRow key={i}>
                <TableCell>{item.name}</TableCell>
                <TableCell align="center">{item.qty}</TableCell>
                <TableCell align="right">₹{item.price}</TableCell>
                <TableCell align="right">₹{item.total}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* TOTALS */}
        <Box width={300} ml="auto" mt={3}>
          <Box display="flex" justifyContent="space-between">
            <Typography color="text.secondary">Price / Night</Typography>
            <Typography>₹{invoice.subtotal}</Typography>
          </Box>

          <Box display="flex" justifyContent="space-between" mt={1}>
            <Typography color="text.secondary">GST (18%)</Typography>
            <Typography>₹{invoice.gst}</Typography>
          </Box>

          <Divider sx={{ my: 1 }} />

          <Box display="flex" justifyContent="space-between">
            <Typography fontWeight={700}>Grand Total</Typography>
            <Typography fontWeight={700} color="primary">
              ₹{invoice.total}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 4 }} />

        {/* FOOTER */}
        <Typography align="center" fontWeight={600}>
          Thank you for your business!
        </Typography>

        <Typography align="center" variant="caption" color="text.secondary">
          For any queries, please contact us at store@example.com
        </Typography>

        <Box display="flex" justifyContent="center" mt={2}>
          <Chip
            label={invoice.status}
            color="success"
            variant="outlined"
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default InvoicePreview;
