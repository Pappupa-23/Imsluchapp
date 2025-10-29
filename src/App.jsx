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

import AdminNavbar from "./admin/AdminNavbar"; // ✅ navbar ฝั่ง admin
import AdminLayout from "./admin/AdminLayout";
import AdminDashboard from "./admin/dashboard";
import AdminOrders from "./admin/orders";
import AdminTables from "./admin/tables";
import AdminHistory from "./admin/history";
import AdminSettings from "./admin/settings";

function App() {
  const [cartItems, setCartItems] = useState([]);
  const location = useLocation();

  // ✅ ตรวจว่าอยู่หน้า admin หรือไม่
  const isAdminPage = location.pathname.startsWith("/admin");

  const addToCart = (item) => {
    const newItem = {
      ...item,
      id: Date.now() + Math.random(),
      qty: 1,
    };
    setCartItems((prev) => [...prev, newItem]);
  };

  const updateQty = (id, qty) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: Math.max(1, qty) } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => setCartItems([]);

  const cartCount = cartItems.reduce((sum, item) => sum + (item.qty || 1), 0);

  return (
    <>
      {/* ✅ Navbar ฝั่งลูกค้า */}
{!location.pathname.startsWith("/admin") && (
  <Navbar cartCount={cartCount} />
)}


      <div style={{ minHeight: "calc(100vh - 160px)" }}>
        <Routes>
          {/* ✅ เส้นทางฝั่งลูกค้า */}
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

          {/* ✅ เส้นทางฝั่ง admin */}
<Route path="/admin" element={<AdminLayout />}>
  <Route index element={<AdminDashboard />} /> {/* /admin */}
  <Route path="dashboard" element={<AdminDashboard />} />
  <Route path="orders" element={<AdminOrders />} />
  <Route path="tables" element={<AdminTables />} />
  <Route path="history" element={<AdminHistory />} />
  <Route path="settings" element={<AdminSettings />} />
</Route>
</Routes> {/* 👈 อย่าลืมปิด */}
      </div>

      {/* ✅ ฝั่ง admin ไม่ต้องมี Footer */}
      {!isAdminPage && <Footer />}
    </>
  );
}

export default App;
