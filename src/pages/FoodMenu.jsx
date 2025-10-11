import './FoodMenu.css';

function FastFood({ addToCart }) {
  const fastFoods = [
    { name: "ข้าวยำไก่แซ่บ", price: 95, image: "/yumkaizap.jpg" },
    { name: "ข้าวไก่เทอริยากิ", price: 95, image: "/teriyaki.jpg" },
    { name: "คัตสึด้งไก่ทอด", price: 70, image: "/คัตสึด้ง.webp" },
    { name: "ข้าวผัดกะเพรา", price: 45, image: "/กะเพรา.webp" },
    { name: "ข้าวผัดหมู", price: 50, image: "/ข้าวผัดหมู.jpg" },
    { name: "ไข่ดาว", price: 10, image: "/ไข่ดาว.jpg" },
    { name: "ข้าวเปล่า", price: 10, image: "/ข้าวเปล่า.jpg" },
  ];

  return (
    <div className="menu-section">
      <h2>🍛 เมนูอาหาร</h2>
      <div className="menu-grid">
        {fastFoods.map((food) => (
          <div key={food.name} className="menu-card">
            <img src={food.image} alt={food.name} />
            <div className="menu-details">
              <h3>{food.name}</h3>
              <p>{food.price} บาท</p>
              <button onClick={() => addToCart(food)}>สั่งซื้อ</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FastFood;
