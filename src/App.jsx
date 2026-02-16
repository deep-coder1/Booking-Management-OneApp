import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import MainLayout from "./components/Layout/MainLayout";

// Import all pages
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import InventoryControl from "./pages/InventoryControl";
import Suppliers from "./pages/Suppliers";
import PurchasesSales from "./pages/PurchasesSales";
import LowStockAlerts from "./pages/LowStockAlerts";
import Reports from "./pages/Reports";
import Locations from "./pages/Locations";
import Billing from "./pages/Billing";
import CreateBill from "./pages/CreateBill";
import InvoicePreview from "./pages/InvoicePreview";

const Unauthorized = () => (
  <div className="p-4 text-red-500">
    <h1>Unauthorized Access</h1>
  </div>
);

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/inventory-control" element={<InventoryControl />} />
          <Route path="/suppliers" element={<Suppliers />} />
          <Route path="/purchases-sales" element={<PurchasesSales />} />
          <Route path="/low-stock-alerts" element={<LowStockAlerts />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/locations" element={<Locations />} />
          <Route path="/billing" element={<Billing />} />
          <Route path="/billing/create" element={<CreateBill />} />
          <Route path="/billing/invoice/:id" element={<InvoicePreview />} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
