import "./App.css";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import FoodMenu from "./pages/FoodMenu";
import FastFoodMenu from "./pages/FastFoodMenu";
import DrinkMenu from "./pages/DrinkMenu";
import Cart from "./pages/Cart";

function App() {
  const [cartItems, setCartItems] = useState([]);

  // ✅ เพิ่มสินค้าในตะกร้า (สร้าง id ไม่ซ้ำ)
  const addToCart = (item) => {
    const newItem = {
      ...item,
      id: Date.now() + Math.random(),
      qty: 1,
    };
    setCartItems((prev) => [...prev, newItem]);
  };

  // ✅ อัปเดตจำนวนสินค้า
  const updateQty = (id, qty) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: Math.max(1, qty) } : item
      )
    );
  };

  // ✅ ลบสินค้าออก
  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // ✅ เคลียร์ตะกร้า
  const clearCart = () => setCartItems([]);

  // ✅ นับจำนวนรวมสินค้าใน Navbar
  const cartCount = cartItems.reduce((sum, item) => sum + (item.qty || 1), 0);

  return (
    <>
      <Navbar cartCount={cartCount} />

      <div style={{ minHeight: "calc(100vh - 160px)" }}>
        <Routes>
          <Route path="/" element={<Home addToCart={addToCart} />} />
          <Route path="/menu/food" element={<FoodMenu addToCart={addToCart} />} />
          <Route
            path="/menu/fastfood"
            element={<FastFoodMenu addToCart={addToCart} />}
          />
          <Route
            path="/menu/drink"
            element={<DrinkMenu addToCart={addToCart} />}
          />
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
        </Routes>
      </div>

      <Footer />
    </>
  );
}

export default App;
