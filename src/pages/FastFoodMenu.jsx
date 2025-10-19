import "./FastFoodMenu.css";
import { useState } from "react";

function FastFoodMenu({ addToCart }) {
  const fastFoods = [
    { name: "เบอร์เกอร์ตามใจ", price: 85, image: "/เบอเกอร์ตามใจ.jpg" },
    { name: "เบอร์เกอร์หมู", price: 80, image: "/เบอเกอร์หมู.jpg" },
    { name: "เบอร์เกอร์ไก่", price: 80, image: "/เบอเกอร์ไก่.jpg" },
    { name: "เบอร์เกอร์ปลา+ชีส", price: 120, image: "/เบอร์เกอร์ปลา+ชีส.jpg" },
    { name: "พิซซ่าฮาวาเอี้ยน", price: 155, image: "/พิซซ่า.jpg" },
    { name: "เกี๊ยวซ่าทอด", price: 80, image: "/เกี๊ยวซ่าทอด.jpg" },
    { name: "ชีสบอล", price: 75, image: "/ชีสบอล.jpg" },
    { name: "เฟรนซ์ฟรายชีส", price: 75, image: "/เฟรนซ์ฟรายชีส.jpg" },
    { name: "ไก่สติ๊ก", price: 60, image: "/ไก่สติ๊ก.jpg" },
    { name: "ฮอทด็อกเบคอน", price: 85, image: "/ฮอทด็อกเบคอน.jpg" },
    { name: "พิซซ่าโทสต์", price: 55, image: "/พิซซ่าโทสต์.jpg" },
  ];

  const [selectedFood, setSelectedFood] = useState(null);
  const [addons, setAddons] = useState({
    meat: [],
    topping: [],
    vegetable: [],
    sauce: [],
    pizzaOption: [], // ✅ เพิ่มสำหรับพิซซ่า
    note: "",
  });
  const [alertMessage, setAlertMessage] = useState("");

  const handleSelect = (type, value) => {
    if (type === "note") {
      setAddons((prev) => ({ ...prev, note: value }));
      return;
    }

    if (["meat", "topping", "vegetable", "sauce", "pizzaOption"].includes(type)) {
      setAddons((prev) => {
        const exists = prev[type].some((m) => m.name === value.name);
        return exists
          ? { ...prev, [type]: prev[type].filter((m) => m.name !== value.name) }
          : { ...prev, [type]: [...prev[type], value] };
      });
    }
  };

  const calculateTotalPrice = () => {
    if (!selectedFood) return 0;
    let total = selectedFood.price;
    ["meat", "topping", "vegetable", "sauce"].forEach((type) => {
      total += addons[type].reduce((sum, m) => sum + m.price, 0);
    });
    return total;
  };

  const handleAddToCart = () => {
    if (!selectedFood) return;

    if (selectedFood.name === "เบอร์เกอร์ตามใจ") {
      if (
        addons.meat.length === 0 ||
        addons.topping.length === 0 ||
        addons.vegetable.length === 0
      ) {
        setAlertMessage("กรุณาเลือกครบทุกหมวด 🍔 \n (เนื้อสัตว์,ท็อปปิ้ง,ผัก,ซอส) ");
        return;
      }
    }

    const totalAddOn =
      addons.meat.reduce((sum, m) => sum + m.price, 0) +
      addons.topping.reduce((sum, m) => sum + m.price, 0) +
      addons.vegetable.reduce((sum, m) => sum + m.price, 0) +
      addons.sauce.reduce((sum, m) => sum + m.price, 0);

    const item = {
      id: Date.now() + Math.random(),
      ...selectedFood,
      price: selectedFood.price + totalAddOn,
      addons,
    };

    addToCart(item);
    closePopup();
  };

  const openPopup = (food) => {
    setSelectedFood(food);
    setAddons({
      meat: [],
      topping: [],
      vegetable: [],
      sauce: [],
      pizzaOption: [],
      note: "",
    });
    setAlertMessage("");
  };

  const closePopup = () => {
    setSelectedFood(null);
    setAlertMessage("");
  };

  const burgerNames = [
    "เบอร์เกอร์ตามใจ",
    "เบอร์เกอร์หมู",
    "เบอร์เกอร์ไก่",
    "เบอร์เกอร์ปลา+ชีส",
  ];

  return (
    <div className="menu-section">
      <h2>🍔 ฟาสต์ฟู้ด</h2>

      <div className="menu-grid">
        {fastFoods.map((food) => (
          <div key={food.name} className="menu-card">
            {food.image && <img src={food.image} alt={food.name} />}
            <div className="menu-details">
              <h3>{food.name}</h3>
              <p>{food.price} บาท</p>
              <button onClick={() => openPopup(food)}>สั่งซื้อ</button>
            </div>
          </div>
        ))}
      </div>

      {selectedFood && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3>{selectedFood.name}</h3>
            <p className="selected-price">฿ {calculateTotalPrice()}</p>

            {/* ✅ เมนูพิซซ่าฮาวาเอี้ยน */}
            {selectedFood.name === "พิซซ่าฮาวาเอี้ยน" && (
              <div className="addon-group">
                <h4>ตัวเลือกเพิ่มเติม</h4>
                {[
                  { name: "ปกติ", price: 0 },
                  { name: "ไม่เอาสัปปะรด", price: 0 },
                  { name: "ไม่เอาแฮม", price: 0 },
                ].map((opt) => (
                  <label key={opt.name}>
                    <input
                      type="checkbox"
                      checked={addons.pizzaOption.some((m) => m.name === opt.name)}
                      onChange={() => handleSelect("pizzaOption", opt)}
                    />
                    {opt.name}
                  </label>
                ))}
              </div>
            )}

            {/* ✅ เฉพาะเมนูเบอร์เกอร์ */}
            {burgerNames.includes(selectedFood.name) && (
              <>
                {selectedFood.name === "เบอร์เกอร์ตามใจ" && (
                  <div className="addon-group">
                    <h4 className="required">เลือกเนื้อสัตว์ *</h4>
                    {[{ name: " หมู", price: 25 },
                      { name: " ไก่", price: 25 },
                      { name: " เนื้อ", price: 35 },
                      { name: " ปลา", price: 30 }].map((opt) => (
                      <label key={opt.name}>
                        <input
                          type="checkbox"
                          checked={addons.meat.some((m) => m.name === opt.name)}
                          onChange={() => handleSelect("meat", opt)}
                        />
                        {opt.name} +{opt.price}฿
                      </label>
                    ))}
                  </div>
                )}

                <div className="addon-group">
                  <h4>เลือกท็อปปิ้ง</h4>
                  {[{ name: " มอสซ่าเรลล่าชีส", price: 20 },
                    { name: " เชดด้าชีส", price: 15 },
                    { name: " ไข่ดาว", price: 15 },
                    { name: " เบคอน", price: 25 },
                    { name: " ไม่ใส่", price: 0 }].map((opt) => (
                    <label key={opt.name}>
                      <input
                        type="checkbox"
                        checked={addons.topping.some((m) => m.name === opt.name)}
                        onChange={() => handleSelect("topping", opt)}
                      />
                      {opt.name} {opt.price > 0 ? `+${opt.price}฿` : ""}
                    </label>
                  ))}
                </div>

                <div className="addon-group">
                  <h4>เลือกผัก</h4>
                  {[{ name: " ปกติ", price: 0 },
                    { name: " ไม่ผักเลย", price: 0 },
                    { name: " ไม่มะเขือเทศ", price: 0 },
                    { name: " ไม่กะหล่ำปลีซอย", price: 0 },
                    { name: " ไม่ผักกาดหอม", price: 0 },
                    { name: " ไม่แตงกวา", price: 0 }].map((opt) => (
                    <label key={opt.name}>
                      <input
                        type="checkbox"
                        checked={addons.vegetable.some((m) => m.name === opt.name)}
                        onChange={() => handleSelect("vegetable", opt)}
                      />
                      {opt.name}
                    </label>
                  ))}
                </div>

                <div className="addon-group">
                  <h4>เลือกซอส</h4>
                  {[{ name: " ซอสมะเขือเทศ", price: 0 },
                    { name: " ซอสพริก", price: 0 },
                    { name: " มายองเนส", price: 0 },
                    { name: " มัสตาร์ด", price: 0 },
                    { name: " ซอสปกติ (มะเขือเทศ + พริก + มายองเนส)", price: 0 }].map((opt) => (
                    <label key={opt.name}>
                      <input
                        type="checkbox"
                        checked={addons.sauce.some((m) => m.name === opt.name)}
                        onChange={() => handleSelect("sauce", opt)}
                      />
                      {opt.name}
                    </label>
                  ))}
                </div>
              </>
            )}

            <div className="addon-group">
              <h4>รายละเอียดเพิ่มเติม</h4>
              <textarea
                placeholder="กรอกรายละเอียดเพิ่มเติม..."
                value={addons.note}
                onChange={(e) => handleSelect("note", e.target.value)}
                rows="3"
              />
            </div>

            <div className="popup-buttons">
              <button className="btn btn-confirm" onClick={handleAddToCart}>
                เลือกใส่ตะกร้า
              </button>
              <button className="btn btn-cancel" onClick={closePopup}>
                ยกเลิก
              </button>
            </div>
          </div>
        </div>
      )}

      {alertMessage && (
        <div className="popup-overlay popup-overlay--alert">
          <div className="popup-content popup-content--alert">
            <h3>⚠️ กรุณาเลือกให้ครบ</h3>
            <p>{alertMessage}</p>
            <button className="btn btn-ok" onClick={() => setAlertMessage("")}>
              ตกลง
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default FastFoodMenu;
