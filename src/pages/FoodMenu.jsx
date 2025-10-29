import { useState } from "react";
import "./FoodMenu.css";

function FoodMenu({ addToCart }) {
  const foods = [
    { id: 1, name: "ข้าวไก่เทอริยากิ", price: 95, image: "/teriyaki.jpg" },
    { id: 2, name: "คัตสึด้งไก่ทอด", price: 70, image: "/คัตสึด้ง.webp" },
    { id: 3, name: "ข้าวผัดกะเพราหมู", price: 45, image: "/กะเพรา.webp" },
    { id: 4, name: "ข้าวผัดหมู", price: 50, image: "/ข้าวผัดหมู.jpg" },
    { id: 5, name: "ไข่ดาว", price: 10, image: "/ไข่ดาว.jpg" },
    { id: 6, name: "ข้าวเปล่า", price: 10, image: "/ข้าวเปล่า.jpg" },
  ];

  const [selectedFood, setSelectedFood] = useState(null);
  const [addons, setAddons] = useState({
    vegetable: "",
    friedEgg: false,
    eggLevel: "",
    addRice: false,
    spicyLevel: "", // ✅ เพิ่มตัวเลือกความเผ็ด
    note: "",
  });

  const openPopup = (food) => {
    setSelectedFood(food);
    setAddons({
      vegetable: "",
      friedEgg: false,
      eggLevel: "",
      addRice: false,
      spicyLevel: "",
      note: "",
    });
  };

  const closePopup = () => setSelectedFood(null);

  const handleSelect = (type, value) => {
    setAddons((prev) => ({ ...prev, [type]: value }));
  };

  const calculateTotalPrice = () => {
    if (!selectedFood) return 0;
    let total = selectedFood.price;
    if (addons.friedEgg) total += 10;
    if (addons.addRice) total += 5;
    return total;
  };

  const handleAddToCart = () => {
    const item = {
      id: selectedFood.id,
      name: selectedFood.name,
      price: calculateTotalPrice(),
      qty: 1,
      image: selectedFood.image,
      addons: { ...addons },
    };
    addToCart(item);
    closePopup();
  };

  return (
    <div className="menu-section">
      <h2>🍚 เมนูอาหาร</h2>

      <div className="menu-grid">
        {foods.map((food) => (
          <div key={food.id} className="menu-card">
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

            {/* ✅ เมนูที่ไม่ใช่ไข่ดาว */}
            {selectedFood.name !== "ไข่ดาว" && (
              <>
                {/* ✅ ซ่อนตัวเลือกผักเมื่อเป็นข้าวเปล่า */}
                {selectedFood.name !== "ข้าวเปล่า" && (
                  <div className="addon-group">
                    <h4>เลือกผัก</h4>
                    {[" ผัก", " ไม่ผัก"].map((opt) => (
                      <label key={opt}>
                        <input
                          type="radio"
                          name="vegetable"
                          checked={addons.vegetable === opt}
                          onChange={() => handleSelect("vegetable", opt)}
                        />
                        {opt}
                      </label>
                    ))}
                  </div>
                )}

                {/* ✅ เฉพาะเมนูกะเพราหมู เพิ่มตัวเลือกระดับความเผ็ด */}
                {selectedFood.name === "ข้าวผัดกะเพราหมู" && (
                  <div className="addon-group">
                    <h4>เลือกระดับความเผ็ด 🌶️</h4>
                    {[
                      " ไม่ใส่พริก",
                      " เผ็ดน้อย (3 เม็ด)",
                      " ปกติ (6 เม็ด)",
                      " เผ็ดมาก (10 เม็ด)",
                    ].map((opt) => (
                      <label key={opt}>
                        <input
                          type="radio"
                          name="spicyLevel"
                          checked={addons.spicyLevel === opt}
                          onChange={() => handleSelect("spicyLevel", opt)}
                        />
                        {opt}
                      </label>
                    ))}
                  </div>
                )}

                <div className="addon-group">
                  <label>
                    <input
                      type="checkbox"
                      checked={addons.friedEgg}
                      onChange={(e) =>
                        handleSelect("friedEgg", e.target.checked)
                      }
                    />
                     {" "}เพิ่มไข่ดาว +10฿
                  </label>
                </div>

                {addons.friedEgg && (
                  <div className="addon-group">
                    <h4>ระดับความสุกของไข่ดาว 🍳</h4>
                    {[
                      " สุก (ไข่แดงและไข่ขาวสุกกรอบ)",
                      " ปานกลาง (ไข่แดงเยิ้มเล็กน้อย ไข่ขาวกรอบ)",
                      " ปกติ (ไข่แดงเยิ้ม ไข่ขาวนุ่ม)",
                    ].map((opt) => (
                      <label key={opt}>
                        <input
                          type="radio"
                          name="eggLevel"
                          checked={addons.eggLevel === opt}
                          onChange={() => handleSelect("eggLevel", opt)}
                        />
                        {opt}
                      </label>
                    ))}
                  </div>
                )}

                <div className="addon-group">
                  <label>
                    <input
                      type="checkbox"
                      checked={addons.addRice}
                      onChange={(e) =>
                        handleSelect("addRice", e.target.checked)
                      }
                    />
                     {" "}เพิ่มข้าว +5฿
                  </label>
                </div>
              </>
            )}

            {/* ✅ เมนูไข่ดาว */}
            {selectedFood.name === "ไข่ดาว" && (
              <div className="addon-group">
                <h4>ระดับความสุกของไข่ดาว 🍳</h4>
                {[
                  " สุก (ไข่แดงและไข่ขาวสุกกรอบ)",
                  " ปานกลาง (ไข่แดงเยิ้มเล็กน้อย ไข่ขาวกรอบ)",
                  " ปกติ (ไข่แดงเยิ้ม ไข่ขาวนุ่ม)",
                ].map((opt) => (
                  <label key={opt}>
                    <input
                      type="radio"
                      name="eggLevel"
                      checked={addons.eggLevel === opt}
                      onChange={() => handleSelect("eggLevel", opt)}
                    />
                    {opt}
                  </label>
                ))}
              </div>
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
    </div>
  );
}

export default FoodMenu;
