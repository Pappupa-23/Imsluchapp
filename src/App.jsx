import "./App.css";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer"; // ✅ เพิ่ม

import Home from "./pages/Home";
import FoodMenu from "./pages/FoodMenu";
import FastFoodMenu from "./pages/FastFoodMenu";
import DrinkMenu from "./pages/DrinkMenu";
import Cart from "./pages/Cart";

function App() {
  const [cartItems, setCartItems] = useState([]);

  // เพิ่มสินค้า
  const addToCart = (item) => {
    setCartItems((prev) => {
      const exist = prev.find((p) => p.name === item.name);
      if (exist) {
        return prev.map((p) =>
          p.name === item.name ? { ...p, qty: p.qty + 1 } : p
        );
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  // อัปเดตจำนวน
  const updateQty = (name, qty) => {
    if (qty <= 0) {
      setCartItems((prev) => prev.filter((p) => p.name !== name));
    } else {
      setCartItems((prev) =>
        prev.map((p) => (p.name === name ? { ...p, qty } : p))
      );
    }
  };

  const cartCount = cartItems.reduce((sum, i) => sum + i.qty, 0); // ✅ ชัดขึ้น

  return (
    <>
      <Navbar cartCount={cartCount} />

      <Routes>
        <Route path="/" element={<Home addToCart={addToCart} />} />
        <Route path="/menu/food" element={<FoodMenu addToCart={addToCart} />} />
        <Route path="/menu/fastfood" element={<FastFoodMenu addToCart={addToCart} />} />
        <Route path="/menu/drink" element={<DrinkMenu addToCart={addToCart} />} />
        <Route path="/cart" element={<Cart cartItems={cartItems} updateQty={updateQty} />} />
      </Routes>

      <Footer /> {/* ✅ แสดงทุกหน้า */}
    </>
  );
}

export default App;
