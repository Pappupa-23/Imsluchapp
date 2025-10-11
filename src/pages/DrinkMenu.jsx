import './DrinkMenu.css';

function DrinkMenu({ addToCart }) {
  const drinks = [
    { name: "สตรอเบอร์รี่โยเกิร์ต", price: 39, image: "/drink1.jpg" },
    { name: "พีชสเลอปี้", price: 45, image: "/drink2.jpg" },
    { name: "มะนาวสเลอปี้", price: 45, image: "/drink3.jpg" },
    { name: "พันซ์เลอปี้", price: 45, image: "/drink4.jpg" },
    { name: "สตรอเบอร์รี่รีสเลอปี้", price: 45, image: "/drink5.jpg" },
    { name: "บลูทูร่าเชิ้ตสเลอปี้", price: 45, image: "/drink6.jpg" },
  ];

  return (
    <div className="menu-section">
      <h2>🍹 เครื่องดื่ม</h2>
      <div className="menu-grid">
        {drinks.map((item) => (
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

export default DrinkMenu;
