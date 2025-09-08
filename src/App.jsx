import "./App.css";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

// import หน้าต่าง ๆ
import Home from "./pages/Home";
import FoodMenu from "./pages/FoodMenu";
import FastFoodMenu from "./pages/FastFoodMenu";
import DrinkMenu from "./pages/DrinkMenu";

function App() {
  // สร้าง state สำหรับนับจำนวนสินค้าในตะกร้า
  const [cartCount, setCartCount] = useState(0);

  return (
    <>
      <Navbar cartCount={cartCount} />

      <Routes>
        <Route path="/" element={<Home setCartCount={setCartCount} />} />
        <Route path="/menu/food" element={<FoodMenu />} />
        <Route path="/menu/fastfood" element={<FastFoodMenu />} />
        <Route path="/menu/drink" element={<DrinkMenu />} />
      </Routes>
    </>
  );
}

export default App;
