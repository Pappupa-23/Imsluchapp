import React, { useState, useEffect } from "react";
import "./settings.css";

export default function AdminSettings() {
  const [showConfirm, setShowConfirm] = useState(false);
  const [notifyNewOrder, setNotifyNewOrder] = useState(true);
  const [notifyDelay, setNotifyDelay] = useState(false);
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const now = new Date();
    const thaiMonths = [
      "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน",
      "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม",
      "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
    ];
    const dateStr = `${now.getDate()} ${thaiMonths[now.getMonth()]} ${now.getFullYear() + 543}`;
    setCurrentDate(dateStr);
  }, []);

  const handleEndDay = () => setShowConfirm(true);
  const closePopup = () => setShowConfirm(false);

  const confirmEndDay = () => {
    alert("ดำเนินการจบวันเรียบร้อยแล้ว ✅");
    setShowConfirm(false);
  };

  return (
    <div className="settings-container">
      <h1>⚙️ ตั้งค่า</h1>
      <p className="subtitle">จัดการการตั้งค่าระบบครัว</p>

      <div className="section">
        <h2>จัดการวัน</h2>
        <p className="label">วันที่ปัจจุบัน</p>
        <p className="current-date">{currentDate}</p>
        <p className="desc">
          การจบวันจะย้ายออเดอร์ที่เสร็จสิ้นทั้งหมดไปยังประวัติและล้างระบบเพื่อเริ่มวันใหม่
        </p>
        <button className="black-btn" onClick={handleEndDay}>
          จบวันและเริ่มวันใหม่
        </button>
      </div>

      <div className="section">
        <h2>การแจ้งเตือน</h2>

        <div className="toggle-row">
          <span>การแจ้งเตือนออเดอร์ใหม่</span>
          <label className="switch">
            <input
              type="checkbox"
              checked={notifyNewOrder}
              onChange={() => setNotifyNewOrder(!notifyNewOrder)}
            />
            <span className="slider"></span>
          </label>
        </div>
        <p className="desc small">
          รับการแจ้งเตือนเมื่อมีออเดอร์ใหม่เข้ามา
        </p>

        <div className="toggle-row">
          <span>การแจ้งเตือนออเดอร์ที่รอนาน</span>
          <label className="switch">
            <input
              type="checkbox"
              checked={notifyDelay}
              onChange={() => setNotifyDelay(!notifyDelay)}
            />
            <span className="slider"></span>
          </label>
        </div>
        <p className="desc small">
          แจ้งเตือนออเดอร์ที่รอเกิน 15 นาที
        </p>
      </div>

      <div className="section">
        <h2>การกระทำ</h2>
        <button className="gray-btn">ล้างประวัติออเดอร์</button>
        <button className="gray-btn">รีเซ็ตการตั้งค่า</button>
        <button className="logout-btn">ออกจากระบบ</button>
      </div>

      {showConfirm && (
        <div className="popup-overlay">
          <div className="popup">
            <h3>ยืนยันการจบวัน?</h3>
            <p>
              การดำเนินการนี้จะบันทึกออเดอร์ที่เสร็จสิ้นทั้งหมดในประวัติ
              ล้างออเดอร์ปัจจุบัน และรีเซ็ตหมายเลขออเดอร์เป็น #1 สำหรับวันใหม่
            </p>
            <div className="popup-actions">
              <button className="cancel-btn" onClick={closePopup}>
                ยกเลิก
              </button>
              <button className="confirm-btn" onClick={confirmEndDay}>
                ยืนยัน
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
