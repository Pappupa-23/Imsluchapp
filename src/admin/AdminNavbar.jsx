import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./AdminNavbar.css";

export default function AdminNavbar() {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  const handleLogout = () => {
    setShowPopup(true);
  };

  const confirmLogout = () => {
  setShowPopup(false);
  localStorage.removeItem("role"); // ล้าง role ก่อน
  navigate("/login"); // ไปหน้า login
};


  const cancelLogout = () => {
    setShowPopup(false);
  };

  return (
    <>
      <nav className="admin-navbar">
        <h2>🍳 Kitchen Admin</h2>
        <ul>
          <li>
            <NavLink to="/admin/orders" className={({ isActive }) => (isActive ? "active" : "")}>
              ออเดอร์ทั้งหมด
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/tables" className={({ isActive }) => (isActive ? "active" : "")}>
              โต๊ะทั้งหมด
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/history" className={({ isActive }) => (isActive ? "active" : "")}>
              ประวัติออเดอร์
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/settings" className={({ isActive }) => (isActive ? "active" : "")}>
              การตั้งค่า
            </NavLink>
          </li>
          <li>
            <button className="logout-btn" onClick={handleLogout}>ออกจากระบบ</button>
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
              <button className="confirm" onClick={confirmLogout}>ยืนยัน</button>
              <button className="cancel" onClick={cancelLogout}>ยกเลิก</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
