// src/App.jsx
import "./App.css";
import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import FoodMenu from "./pages/FoodMenu";
import FastFoodMenu from "./pages/FastFoodMenu";
import DrinkMenu from "./pages/DrinkMenu";
import Cart from "./pages/Cart";

// admin imports...
import AdminLayout from "./admin/AdminLayout";
import AdminOrders from "./admin/orders";
import AdminTables from "./admin/tables";
import AdminHistory from "./admin/history";
import AdminSettings from "./admin/settings";

// staff imports (ตรวจให้แน่ใจไฟล์มีชื่อตรงนี้)
import StaffLayout from "./staff/StaffLayout";
import StaffDashboard from "./staff/dashboard";
import StaffTables from "./staff/tables";

import Login from "./pages/Login";


function App() {
  const [cartItems, setCartItems] = useState([]);
  const location = useLocation();

  const isAdminPage = location.pathname.startsWith("/admin");
  const isStaffPage = location.pathname.startsWith("/staff");

  const addToCart = (item) => {
    const newItem = { ...item, id: Date.now() + Math.random(), qty: 1 };
    setCartItems((prev) => [...prev, newItem]);
  };

  const updateQty = (id, qty) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: Math.max(1, qty) } : item
      )
    );
  };

  const removeItem = (id) => setCartItems((prev) => prev.filter((i) => i.id !== id));
  const clearCart = () => setCartItems([]);
  const cartCount = cartItems.reduce((s, i) => s + (i.qty || 1), 0);

  return (
    <>
      {!isAdminPage && !isStaffPage && <Navbar cartCount={cartCount} />}

      <div style={{ minHeight: "calc(100vh - 160px)" }}>
        <Routes>
          {/* customer routes */}
          <Route path="/" element={<Home addToCart={addToCart} />} />
          <Route path="/menu/food" element={<FoodMenu addToCart={addToCart} />} />
          <Route path="/menu/fastfood" element={<FastFoodMenu addToCart={addToCart} />} />
          <Route path="/menu/drink" element={<DrinkMenu addToCart={addToCart} />} />
          <Route
            path="/cart"
            element={
              <Cart
                cartItems={cartItems}
                updateQty={updateQty}
                removeItem={removeItem}
                clearCart={clearCart}
              />
            }
          />

          {/* admin */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminOrders />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="tables" element={<AdminTables />} />
            <Route path="history" element={<AdminHistory />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>

          {/* staff */}
          <Route path="/staff" element={<StaffLayout />}>
            {/* index will render StaffDashboard when /staff */}
            <Route index element={<StaffDashboard />} />
            <Route path="dashboard" element={<StaffDashboard />} />
            <Route path="tables" element={<StaffTables />} />
          </Route>

          <Route path="/login" element={<Login />} />

        </Routes>
      </div>

      {!isAdminPage && !isStaffPage && <Footer />}
    </>
  );
}

export default App;
