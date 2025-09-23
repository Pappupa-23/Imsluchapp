function FoodMenu({ addToCart }) {
  const foods = [
    { name: "ข้าวยำไก่แซ่บ", price: 95 },
    { name: "เกี๊ยวซ่าทอด", price: 90 },
    { name: "สตรอเบอร์โยเกิร์ต", price: 39 },
    { name: "ไข่ดาว", price: 10 },
  ];

  return (
    <div className="menu-section">
      <h2>🍛 เมนูอาหาร</h2>
      <div className="menu-grid">
        {foods.map((food) => (
          <div key={food.name} className="menu-card">
            <h3>{food.name}</h3>
            <p>{food.price} บาท</p>
            <button onClick={() => addToCart(food)}>สั่งซื้อ</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FoodMenu;
