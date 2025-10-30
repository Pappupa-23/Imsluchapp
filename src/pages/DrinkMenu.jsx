import { useState } from "react";
import "./DrinkMenu.css";

function DrinkMenu({ addToCart }) {
  const drinks = [
    { name: "สตรอว์เบอร์รีโยเกิร์ต", price: 39, image: "/สตรอเบอร์รี่โยเกิร์ต.jpg" },
    { name: "พีชสเลอปี้", price: 45, image: "/พีชสเลอปี้.jpg" },
    { name: "นมฮอกไกโดสเลอปี้", price: 45, image: "/นมฮอกไกโดเลอปี้.jpg" },
    { name: "ชาไทย", price: 45, image: "/ชาไทย.jpg" },
    { name: "ค็อกเทลสเลอปี้", price: 45, image: "/ค็อกเทลสเลอปี้.jpg" },
    { name: "ชาเขียวสเลอปี้", price: 45, image: "/ชาเขียวเลอปี้.jpg" },
    { name: "โคล่า", price: 25 ,image: "/โคล่า.jpg" },
    { name: "ชาไทยครีมชีส", price: 30 , image: "/ชาไทยครีมชีส.jpg" },
    { name: "น้ำเปล่า", price: 10 ,image: "/น้ำเปล่า.jpg" },
  ];

  const [selectedDrink, setSelectedDrink] = useState(null);
  const [sweetness, setSweetness] = useState("");
  const [cold, setCold] = useState("");
  const [note, setNote] = useState("");

  const handleAddToCart = () => {
    if (!selectedDrink) return;

    const addons = { note };

    if (selectedDrink.name === "น้ำเปล่า") {
      addons.cold = cold;
    } else if (selectedDrink.name !== "โค้ก") {
      // โค้กจะไม่บันทึกระดับความหวาน
      addons.sweetness = sweetness;
    }

    const item = { ...selectedDrink, addons };
    addToCart(item);
    setSelectedDrink(null);
    setSweetness("");
    setCold("");
    setNote("");
  };

  return (
    <div className="menu-section">
      <h2>🍹 เครื่องดื่ม</h2>

      <div className="menu-grid">
        {drinks.map((item) => (
          <div key={item.name} className="menu-card">
            <img
              src={item.image || "/default-drink.jpg"}
              alt={item.name}
              onError={(e) => (e.target.src = "/default-drink.jpg")}
            />
            <div className="menu-details">
              <h3>{item.name}</h3>
              <p>{item.price} บาท</p>
              <button onClick={() => setSelectedDrink(item)}>สั่งซื้อ</button>
            </div>
          </div>
        ))}
      </div>

      {selectedDrink && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3>{selectedDrink.name}</h3>
            <p>{selectedDrink.price} บาท</p>

            {selectedDrink.name === "น้ำเปล่า" ? (
              <div className="addon-group">
                <h4>อุณหภูมิ</h4>
                <label>
                  <input
                    type="radio"
                    name="cold"
                    value="เย็น"
                    checked={cold === "เย็น"}
                    onChange={(e) => setCold(e.target.value)}
                  />
                  {" "}เย็น
                </label>
                <label>
                  <input
                    type="radio"
                    name="cold"
                    value="ไม่เย็น"
                    checked={cold === "ไม่เย็น"}
                    onChange={(e) => setCold(e.target.value)}
                  />
                  {" "}ไม่เย็น
                </label>
              </div>
            ) : selectedDrink.name !== "โคล่า" ? (
              <div className="addon-group">
                <h4>ระดับความหวาน</h4>
                <label>
                  <input
                    type="radio"
                    name="sweetness"
                    value="หวานน้อย"
                    checked={sweetness === "หวานน้อย"}
                    onChange={(e) => setSweetness(e.target.value)}
                  />
                  {" "}หวานน้อย
                </label>
                <label>
                  <input
                    type="radio"
                    name="sweetness"
                    value="หวานปกติ"
                    checked={sweetness === "หวานปกติ"}
                    onChange={(e) => setSweetness(e.target.value)}
                  />
                  {" "}หวานปกติ
                </label>
                <label>
                  <input
                    type="radio"
                    name="sweetness"
                    value="หวานมาก"
                    checked={sweetness === "หวานมาก"}
                    onChange={(e) => setSweetness(e.target.value)}
                  />
                  {" "}หวานมาก
                </label>
              </div>
            ) : null}

            <div className="addon-group">
              <h4>รายละเอียดเพิ่มเติม</h4>
              <textarea
                placeholder="กรอกรายละเอียดเพิ่มเติม"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows="3"
              />
            </div>

            <div className="popup-buttons">
              <button
                style={{ background: "#b6ff5c", color: "#000" }}
                onClick={handleAddToCart}
              >
                เลือกใส่ตะกร้า
              </button>
              <button onClick={() => setSelectedDrink(null)}>ยกเลิก</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DrinkMenu;
