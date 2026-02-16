// import jsPDF from "jspdf";
// import "jspdf-autotable";

// export const generateInvoicePDF = ({ autoPrint = false } = {}) => {
//   const doc = new jsPDF("p", "mm", "a4");

//   // Open PDF in new tab
//   const blobUrl = doc.output("bloburl");
//   const pdfWindow = window.open(blobUrl, "_blank");

//   // Title
//   doc.setFontSize(18);
//   doc.text("INVOICE", 105, 20, { align: "center" });

//   doc.setFontSize(10);
//   doc.text("Your Store Name", 105, 28, { align: "center" });
//   doc.text("123 Business Street, City, State 12345", 105, 34, { align: "center" });
//   doc.text("Phone: +91 98765 43210 | Email: store@example.com", 105, 40, { align: "center" });

//   doc.line(15, 45, 195, 45);

//   // Invoice details
//   doc.setFontSize(11);
//   doc.text("INVOICE DETAILS", 15, 55);
//   doc.text("BILL TO", 120, 55);

//   doc.setFontSize(10);
//   doc.text("Invoice No: INV-4778", 15, 63);
//   doc.text("Date: January 22, 2026", 15, 69);
//   doc.text("Payment Mode: Cash", 15, 75);

//   doc.text("Customer Name: Ajay Babu", 120, 63);
//   doc.text("Mobile: 7452631452", 120, 69);

//   // Table
//   doc.autoTable({
//     startY: 85,
//     head: [["Product", "Quantity", "Price", "Total"]],
//     body: [
//       ["Wireless Mouse", "1", "₹599", "₹599"],
//     ],
//     styles: { fontSize: 10 },
//     headStyles: { fillColor: [239, 246, 255] },
//   });

//   const finalY = doc.lastAutoTable.finalY;

//   // Totals
//   doc.text("Price / Night:", 130, finalY + 10);
//   doc.text("₹599.00", 180, finalY + 10, { align: "right" });

//   doc.text("GST (18%):", 130, finalY + 16);
//   doc.text("₹107.82", 180, finalY + 16, { align: "right" });

//   doc.setFontSize(12);
//   doc.text("Grand Total:", 130, finalY + 26);
//   doc.text("₹706.82", 180, finalY + 26, { align: "right" });

//   doc.line(15, finalY + 35, 195, finalY + 35);

//   doc.setFontSize(10);
//   doc.text("Thank you for your business!", 105, finalY + 45, { align: "center" });

//   // Paid badge
//   doc.setFillColor(220, 252, 231);
//   doc.roundedRect(90, finalY + 52, 30, 8, 4, 4, "F");
//   doc.setTextColor(22, 163, 74);
//   doc.text("Paid", 105, finalY + 58, { align: "center" });

//   // Auto print
//   if (autoPrint) {
//     setTimeout(() => {
//       doc.autoPrint();
//       pdfWindow.location.href = doc.output("bloburl");
//     }, 500);
//   }

//   return doc;
// };


// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";

// export const generateInvoicePDF = (invoice, { autoPrint = false } = {}) => {
//   const doc = new jsPDF("p", "mm", "a4");

//   // Title
//   doc.setFontSize(18);
//   doc.text("INVOICE", 105, 20, { align: "center" });

//   doc.setFontSize(10);
//   doc.text("Your Store Name", 105, 28, { align: "center" });
//   doc.text("Phone: +91 98765 43210 | Email: store@example.com", 105, 34, {
//     align: "center",
//   });

//   doc.line(15, 40, 195, 40);

//   // Invoice Details
//   doc.setFontSize(11);
//   doc.text("INVOICE DETAILS", 15, 50);
//   doc.text("BILL TO", 120, 50);

//   doc.setFontSize(10);
//   doc.text(`Invoice No: ${invoice.id}`, 15, 58);
//   doc.text(`Date: ${invoice.date}`, 15, 64);
//   doc.text(`Payment Mode: ${invoice.paymentMode}`, 15, 70);

//   doc.text(`Customer Name: ${invoice.customer}`, 120, 58);
//   doc.text(`Mobile: ${invoice.mobile}`, 120, 64);

//   // Table
//   autoTable(doc, {
//     startY: 80,
//     head: [["Product", "Qty", "Price", "Total"]],
//     body: invoice.items.map((item) => [
//       item.name,
//       item.qty,
//       `₹${item.price}`,
//       `₹${item.total}`,
//     ]),
//     styles: { fontSize: 10 },
//     headStyles: { fillColor: [239, 246, 255] },
//   });

//   const y = doc.lastAutoTable.finalY;

//   // Totals
//   doc.text("Subtotal:", 130, y + 10);
//   doc.text(`₹${invoice.subtotal}`, 180, y + 10, { align: "right" });

//   doc.text("GST (18%):", 130, y + 16);
//   doc.text(`₹${invoice.gst}`, 180, y + 16, { align: "right" });

//   doc.setFontSize(12);
//   doc.text("Grand Total:", 130, y + 26);
//   doc.text(`₹${invoice.total}`, 180, y + 26, { align: "right" });

//   // Print
//   if (autoPrint) {
//     setTimeout(() => {
//       doc.autoPrint();
//       window.open(doc.output("bloburl"), "_blank");
//     }, 300);
//   }

//   return doc;
// };


// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";

// export const generateInvoicePDF = (invoiceData = {}, { autoPrint = false } = {}) => {
//   const invoice = {
//     id: invoiceData.id || "N/A",
//     customer: invoiceData.customer || "N/A",
//     mobile: invoiceData.mobile || "N/A",
//     date: invoiceData.date || "N/A",
//     paymentMode: invoiceData.paymentMode || "N/A",
//     items: invoiceData.items || [],     // 🔥 IMPORTANT
//     subtotal: invoiceData.subtotal || 0,
//     gst: invoiceData.gst || 0,
//     total: invoiceData.total || 0,
//   };

//   const doc = new jsPDF("p", "mm", "a4");

//   doc.setFontSize(18);
//   doc.text("INVOICE", 105, 20, { align: "center" });

//   doc.setFontSize(10);
//   doc.text("Your Store Name", 105, 28, { align: "center" });

//   autoTable(doc, {
//     startY: 40,
//     head: [["Product", "Qty", "Price", "Total"]],
//     body:
//       invoice.items.length === 0
//         ? [["No items", "-", "-", "-"]]
//         : invoice.items.map(item => [
//             item.name,
//             item.qty,
//             `₹${item.price}`,
//             `₹${item.total}`,
//           ]),
//   });

//   const y = doc.lastAutoTable.finalY;

//   doc.text(`Grand Total: ₹${invoice.total}`, 150, y + 15);

//   if (autoPrint) {
//     setTimeout(() => {
//       doc.autoPrint();
//       window.open(doc.output("bloburl"), "_blank");
//     }, 300);
//   }

//   return doc;
// };


// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";

// export const generateInvoicePDF = (invoice, { autoPrint = false } = {}) => {
//   const doc = new jsPDF("p", "mm", "a4");
//   // const doc = new jsPDF();
//   const items = invoice?.items || [];

//   doc.setFontSize(18);
//   doc.text("INVOICE", 105, 20, { align: "center" });

//   doc.setFontSize(10);
//   doc.text("Your Store Name", 105, 28, { align: "center" });

//   doc.setFontSize(9);
//   doc.text(
//     "123 Business Street, City, State 12345\nPhone: +91 98765 43210 | Email: store@example.com",
//     105,
//     34,
//     { align: "center" }
//   );

//   doc.line(20, 42, 190, 42);

//   doc.setFontSize(10);
//   doc.text("INVOICE DETAILS", 20, 50);
//   doc.text(`Invoice No: ${invoice.id}`, 20, 56);
//   doc.text(`Date: ${invoice.date}`, 20, 62);
//   doc.text(`Payment Mode: ${invoice.paymentMode}`, 20, 68);

//   doc.text("BILL TO", 120, 50);
//   doc.text(`Customer Name: ${invoice.customer}`, 120, 56);
//   doc.text(`Mobile: ${invoice.mobile}`, 120, 62);

//   autoTable(doc, {
//     startY: 75,
//     head: [["Product", "Qty", "Price", "Total"]],
//     // body: invoice.items.map(i => [
//     //   i.name,
//     //   i.qty,
//     //   `₹${i.price}`,
//     //   `₹${i.total}`,
//     // ]),
//     body: items.map(i => [
//       i.name || "-",
//       i.qty || 0,
//       `₹${i.price || 0}`,
//       `₹${i.total || 0}`,
//     ]),
//     styles: { halign: "right" },
//     headStyles: { fillColor: [240, 247, 255] },
//     columnStyles: {
//       0: { halign: "left" },
//       1: { halign: "center" },
//     },
//   });

//   const y = doc.lastAutoTable.finalY + 10;

//   doc.text(`Price / Night: ₹${invoice.subtotal}`, 140, y);
//   doc.text(`GST (18%): ₹${invoice.gst}`, 140, y + 6);
//   doc.text(`Grand Total: ₹${invoice.total}`, 140, y + 14);

//   doc.line(20, y + 22, 190, y + 22);

//   doc.text("Thank you for your business!", 105, y + 32, {
//     align: "center",
//   });

//   if (autoPrint) {
//     setTimeout(() => {
//       doc.autoPrint();
//       window.open(doc.output("bloburl"), "_blank");
//     }, 300);
//   }

//   return doc;
// };


import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const generateInvoicePDF = (
  invoice = {},
  { autoPrint = false } = {}
) => {
  const doc = new jsPDF("p", "mm", "a4");

  // 🔥 SAFETY (THIS FIXES YOUR ERROR)
  const items = invoice?.items || [];

  // HEADER
  doc.setFontSize(18);
  doc.text("INVOICE", 105, 20, { align: "center" });

  doc.setFontSize(10);
  doc.text("Your Store Name", 105, 28, { align: "center" });

  doc.setFontSize(9);
  doc.text(
    "123 Business Street, City, State 12345\nPhone: +91 98765 43210 | Email: store@example.com",
    105,
    34,
    { align: "center" }
  );

  doc.line(20, 42, 190, 42);

  // DETAILS
  doc.setFontSize(10);
  doc.text("INVOICE DETAILS", 20, 50);
  doc.text(`Invoice No: ${invoice.id || "-"}`, 20, 56);
  doc.text(`Date: ${invoice.date || "-"}`, 20, 62);
  doc.text(`Payment Mode: ${invoice.paymentMode || "-"}`, 20, 68);

  doc.text("BILL TO", 120, 50);
  doc.text(`Customer Name: ${invoice.customer || "-"}`, 120, 56);
  doc.text(`Mobile: ${invoice.mobile || "-"}`, 120, 62);

  // TABLE
  autoTable(doc, {
    startY: 75,
    head: [["Product", "Qty", "Price", "Total"]],
    body: items.map((i) => [
      i.name || "-",
      i.qty || 0,
      `₹${i.price || 0}`,
      `₹${i.total || 0}`,
    ]),
    headStyles: { fillColor: [240, 247, 255] },
    styles: { halign: "right" },
    columnStyles: {
      0: { halign: "left" },
      1: { halign: "center" },
    },
  });

  const y = doc.lastAutoTable.finalY + 10;

  doc.text(`Price / Night: ₹${invoice.subtotal || 0}`, 140, y);
  doc.text(`GST (18%): ₹${invoice.gst || 0}`, 140, y + 6);

  doc.setFontSize(11);
  doc.text(`Grand Total: ₹${invoice.total || 0}`, 140, y + 14);

  doc.line(20, y + 22, 190, y + 22);

  doc.text("Thank you for your business!", 105, y + 32, {
    align: "center",
  });

  // PRINT
  if (autoPrint) {
    setTimeout(() => {
      doc.autoPrint();
      window.open(doc.output("bloburl"), "_blank");
    }, 300);
  }

  return doc;
};
