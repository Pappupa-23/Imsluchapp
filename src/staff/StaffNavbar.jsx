import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./StaffNavbar.css";

export default function StaffNavbar() {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  const handleLogout = () => setShowPopup(true);
  const confirmLogout = () => {
  setShowPopup(false);
  localStorage.removeItem("role"); // ล้าง role ก่อน
  navigate("/login"); // ไปหน้า login
};

  const cancelLogout = () => setShowPopup(false);

  return (
    <>
      <nav className="staff-navbar">
        <h2>🍳 Staff</h2>
        <ul>
          {/* ✅ ใช้ path แบบ relative เพื่อให้ active ทำงานอัตโนมัติ */}
          <li>
            <NavLink
              end
              to="/staff"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              ออเดอร์ทั้งหมด
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/staff/tables"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              โต๊ะทั้งหมด
            </NavLink>
          </li>
          <li>
            <button className="logout-btn" onClick={handleLogout}>
              ออกจากระบบ
            </button>
          </li>
        </ul>
      </nav>

      {/* Popup */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h3>ยืนยันการออกจากระบบ</h3>
            <p>คุณแน่ใจหรือไม่ว่าต้องการออกจากระบบ?</p>
            <div className="popup-buttons">
              <button className="confirm" onClick={confirmLogout}>
                ยืนยัน
              </button>
              <button className="cancel" onClick={cancelLogout}>
                ยกเลิก
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
