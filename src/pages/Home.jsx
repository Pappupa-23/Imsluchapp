import { Link } from "react-router-dom";
import { useState } from "react";

function Home({ setCartCount }) {
  const [promoIndex, setPromoIndex] = useState(0);
  const promos = [
    { img: "/promo1.jpg", desc: "ซื้อ 1 แถม 1 สเลอปี้" },
    { img: "/promo2.jpg", desc: "แจ้งวันหยุดวันตรุษจีน" },
    { img: "/promo3.jpg", desc: "โปรโมชั่นฟาสต์ฟู้ด" },
  ];

  const nextPromo = () => setPromoIndex((promoIndex + 1) % promos.length);
  const prevPromo = () => setPromoIndex((promoIndex - 1 + promos.length) % promos.length);

  return (
    <div className="home">
      <h2>โปรโมชั่น</h2>
      <div className="promo">
        <button onClick={prevPromo}>◀</button>

        {/* ✅ เปิดใช้งานรูปตรงนี้ */}
        <img
          src={promos[promoIndex].img}
          alt={`โปรโมชั่น ${promoIndex + 1}`}
          className="promo-img"
        />

        <button onClick={nextPromo}>▶</button>
      </div>

      <p>{promos[promoIndex].desc}</p>

      <button onClick={() => setCartCount((c) => c + 1)}>สั่งซื้อ</button>

      <div className="menu-links">
        <Link to="/menu/food">🍛 เมนูอาหาร</Link>
        <Link to="/menu/fastfood">🍔 ฟาสต์ฟู้ด</Link>
        <Link to="/menu/drink">🥤 เครื่องดื่ม</Link>
      </div>
    </div>
  );
}

export default Home;
