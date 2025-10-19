import { Link } from "react-router-dom";
import { useState } from "react";
import './Home.css'; // นำเข้าไฟล์ home.css

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
    <div className="home page">
      {/* Promo Section */}
      <section className="section-promo container">
        <div className="promo-banner">
          <div className="promo-title">! NEWS !</div>

          {/* Promo Slider */}
          <div className="promo-slider">
            <button onClick={prevPromo} className="slider-btn left">‹</button>
            <img
              src={promos[promoIndex].img}
              alt={promos[promoIndex].desc}
              className="promo-img"
            />
            <button onClick={nextPromo} className="slider-btn right">›</button>
          </div>

          <p>{promos[promoIndex].desc}</p>
        </div>
      </section>

      {/* Menu Cards */}
     <section className="section-menu">
  <div className="menu-cards">
    {/* เมนูอาหาร */}
    <Link to="/menu/food" className="menu-card is-link" aria-label="ไปที่เมนูอาหาร">
      <img src="/menu_food.png" alt="เมนูอาหาร" className="menu-image" />
      <h3 className="menu-title">เมนูอาหาร</h3>
      <span className="menu-btn">คลิก</span>
    </Link>

    {/* ฟาสต์ฟู้ด */}
    <Link to="/menu/fastfood" className="menu-card is-link" aria-label="ไปที่ฟาสต์ฟู้ด">
      <img src="/menu_fastfood.png" alt="ฟาสต์ฟู้ด" className="menu-image" />
      <h3 className="menu-title">ฟาสต์ฟู้ด</h3>
      <span className="menu-btn">คลิก</span>
    </Link>

    {/* เครื่องดื่ม */}
    <Link to="/menu/drink" className="menu-card is-link" aria-label="ไปที่เครื่องดื่ม">
      <img src="/menu_drink.png" alt="เครื่องดื่ม" className="menu-image" />
      <h3 className="menu-title">เครื่องดื่ม</h3>
      <span className="menu-btn">คลิก</span>
    </Link>
  </div>
</section>
    </div>
  );
}

export default Home;
