import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

function Cart({ cartItems, updateQty, removeItem, clearCart }) {
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const navigate = useNavigate();

  const calculateTotal = () =>
    cartItems.reduce((sum, item) => sum + item.price * (item.qty || 1), 0);

  const handleOrder = () => {
    if (cartItems.length === 0) return;
    setOrderSuccess(true);
  };

  const handleAddMore = () => {
    clearCart();
    setOrderSuccess(false);
    navigate("/");
  };

  const handleConfirmRemove = (id) => {
    setConfirmDelete(id);
  };

  const handleDeleteConfirmed = () => {
    if (confirmDelete) {
      removeItem(confirmDelete);
      setConfirmDelete(null);
    }
  };

  return (
    <div className="cart-section">
      <h2>🛒 ตะกร้าสินค้า</h2>

      {cartItems.length === 0 ? (
        <p className="empty-cart">ยังไม่มีรายการในตะกร้า</p>
      ) : (
        <>
          <div className="cart-list">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <h4>{item.name}</h4>
                <p>ราคา: {item.price} บาท</p>

                <div className="addons-detail">
                  {item.addons?.vegetable &&
                    typeof item.addons.vegetable === "string" && (
                      <p>ผัก: {item.addons.vegetable}</p>
                    )}
                  {item.addons?.spicyLevel && (
                    <p>ความเผ็ด: {item.addons.spicyLevel}</p>
                  )}
                  {item.addons?.friedEgg && <p>เพิ่มไข่ดาว +10฿</p>}
                  {item.addons?.eggLevel && (
                    <p>ระดับความสุก: {item.addons.eggLevel}</p>
                  )}
                  {item.addons?.addRice && <p>เพิ่มข้าว +5฿</p>}

                  {Array.isArray(item.addons?.meat) &&
                    item.addons.meat.length > 0 && (
                      <p>
                        เนื้อสัตว์:{" "}
                        {item.addons.meat.map((m) => m.name).join(", ")}
                      </p>
                    )}
                  {Array.isArray(item.addons?.topping) &&
                    item.addons.topping.length > 0 && (
                      <p>
                        ท็อปปิ้ง:{" "}
                        {item.addons.topping.map((t) => t.name).join(", ")}
                      </p>
                    )}
                  {Array.isArray(item.addons?.vegetable) &&
                    item.addons.vegetable.length > 0 && (
                      <p>
                        ผัก:{" "}
                        {item.addons.vegetable.map((v) => v.name).join(", ")}
                      </p>
                    )}
                  {Array.isArray(item.addons?.sauce) &&
                    item.addons.sauce.length > 0 && (
                      <p>
                        ซอส: {item.addons.sauce.map((s) => s.name).join(", ")}
                      </p>
                    )}
                  {Array.isArray(item.addons?.pizzaOption) &&
                    item.addons.pizzaOption.length > 0 && (
                      <p>
                        ตัวเลือกพิซซ่า:{" "}
                        {item.addons.pizzaOption.map((p) => p.name).join(", ")}
                      </p>
                    )}
                  {item.addons?.sweetness && (
                    <p>ระดับความหวาน: {item.addons.sweetness}</p>
                  )}
                  {item.addons?.cold && <p>อุณหภูมิ: {item.addons.cold}</p>}
                  {item.addons?.note && <p>เพิ่มเติม: {item.addons.note}</p>}
                </div>

                {/* ✅ ปรับ layout */}
                <div
                  className="quantity-row"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div className="quantity-controls">
                    <button
                      onClick={() => updateQty(item.id, (item.qty || 1) - 1)}
                    >
                      −
                    </button>
                    <span>{item.qty || 1}</span>
                    <button
                      onClick={() => updateQty(item.id, (item.qty || 1) + 1)}
                    >
                      ＋
                    </button>
                  </div>
                  <button
                    className="remove-btn"
                    onClick={() => handleConfirmRemove(item.id)}
                    style={{
                      backgroundColor: "green",
                      color: "#fff",
                      padding: "5px 10px",
                      border: "none",
                      borderRadius: "6px",
                    }}
                  >
                    ลบ
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary" style={{ marginBottom: "80px" }}>
            <h3>รวมทั้งหมด: {calculateTotal()} บาท</h3>
            <button className="order-btn" onClick={handleOrder}>
              สั่งซื้อ
            </button>
          </div>
        </>
      )}

      {confirmDelete && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3>⚠️ ยืนยันการลบ</h3>
            <p>คุณต้องการลบสินค้านี้ออกจากตะกร้าหรือไม่?</p>
            <div style={{ marginTop: "12px" }}>
              <button
                className="confirm-btn"
                style={{
                  backgroundColor: "green",
                  color: "#fff",
                  marginRight: "8px",
                }}
                onClick={handleDeleteConfirmed}
              >
                ✅ ลบ
              </button>
              <button
                className="cancel-btn"
                style={{ backgroundColor: "red", color: "#fff" }}
                onClick={() => setConfirmDelete(null)}
              >
                ❌ ยกเลิก
              </button>
            </div>
          </div>
        </div>
      )}

      {orderSuccess && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3>✅ สั่งซื้อสำเร็จ!</h3>
            <p>รอสักครู่ เรากำลังเตรียมอาหารสำหรับคุณ 🍱</p>
            <button className="addmore-btn" onClick={handleAddMore}>
              🍔 สั่งอาหารเพิ่ม
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
