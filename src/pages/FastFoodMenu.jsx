import './FastFoodMenu.css';

function FastFood({ addToCart }) {
  const fastFoods = [
    { name: "เบอร์เกอร์ตามใจ", price: 85, image: "/เบอเกอร์ตามใจ.jpg" },
    { name: "เบอร์เกอร์หมู", price: 80, image: "/เบอเกอร์หมู.jpg" },
    { name: "เบอร์เกอร์ไก่", price: 80, image: "/เบอเกอร์ไก่.jpg" },
    { name: "เบอร์เกอร์ปลา+ชีส", price: 120, image: "/fastfood4.jpg" },
    { name: "พิซซ่า", price: 155, image: "/fastfood11.jpg" },
    { name: "เกี๋ยวซ่าทอด", price: 80, image: "/fastfood5.jpg" },
    { name: "ชีสบอล", price: 75, image: "/fastfood6.jpg" },
    { name: "เฟรนซ์ฟรายชีส", price: 75, image: "/fastfood7.jpg" },
    { name: "ไก่สติ๊ก", price: 60, image: "/fastfood8.jpg" },
    { name: "ฮอทด็อกเบคอน", price: 85, image: "/fastfood9.jpg" },
    { name: "พิซซ่าโทสต์", price: 55, image: "/fastfood10.jpg" },
  ];

  return (
    <div className="menu-section">
      <h2>🍔 ฟาสต์ฟู้ด</h2>
      <div className="menu-grid">
        {fastFoods.map((item) => (
          <div key={item.name} className="menu-card">
            <img src={item.image} alt={item.name} />
            <div className="menu-details">
              <h3>{item.name}</h3>
              <p>{item.price} บาท</p>
              <button onClick={() => addToCart(item)}>สั่งซื้อ</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FastFood;
