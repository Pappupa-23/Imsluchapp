import React, { useState } from "react";
import "./dashboard.css";

export default function AdminDashboard() {
  const [orders, setOrders] = useState([
    {
      id: 2,
      table: 3,
      status: "รอทำ",
      time: "5 นาทีที่แล้ว",
      total: 205,
      items: [
        { name: "ต้มยำกุ้ง", price: 120, qty: 1 },
        { name: "ส้มตำ", price: 40, qty: 1 },
        { name: "ข้าวผัด", price: 45, qty: 1 },
      ],
    },
    {
      id: 1,
      table: 1,
      status: "กำลังทำ",
      time: "56 นาทีที่แล้ว",
      total: 150,
      items: [
        { name: "ผัดไทย", price: 50, qty: 2, note: "ไม่เผ็ด" },
        { name: "น้ำมะนาว", price: 25, qty: 2 },
      ],
    },
    {
      id: 3,
      table: 5,
      status: "พร้อมเสิร์ฟ",
      time: "68 นาทีที่แล้ว",
      total: 140,
      items: [
        { name: "ไก่ทอด", price: 80, qty: 1 },
        { name: "น้ำส้ม", price: 30, qty: 2 },
      ],
    },
    {
      id: 4,
      table: 2,
      status: "พร้อมเสิร์ฟ",
      time: "58 นาทีที่แล้ว",
      total: 145,
      items: [
        { name: "แกงเขียวหวาน", price: 70, qty: 1, note: "เผ็ดน้อย" },
        { name: "น้ำมะนาว", price: 25, qty: 3 },
      ],
    },
  ]);

  const updateStatus = (id, nextStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: nextStatus } : o))
    );
  };

  const sections = ["รอทำ", "กำลังทำ", "พร้อมเสิร์ฟ"];

  return (
    <div className="dashboard-container">
      <h1>🍳 Dashboard — ภาพรวมระบบครัว</h1>
      <p className="subtitle">แดชบอร์ดสำหรับติดตามออเดอร์ทั้งหมด</p>

      <div className="summary">
        {sections.map((s) => (
          <div className="card" key={s}>
            <h2>{s}</h2>
            <p>{orders.filter((o) => o.status === s).length}</p>
          </div>
        ))}
        <div className="card total">
          <h2>ออเดอร์ทั้งหมด</h2>
          <p>{orders.length}</p>
        </div>
      </div>

      {sections.map((section) => (
        <div className="section" key={section}>
          <h2>{section}</h2>
          <div className="order-list">
            {orders
              .filter((o) => o.status === section)
              .map((order) => (
                <div key={order.id} className="order-card">
                  <div className="order-header">
                    <div>#{order.id}</div>
                    <div>โต๊ะ {order.table}</div>
                    <div className="status">{order.status}</div>
                  </div>
                  <div className="order-time">
                    สั่งเมื่อ {order.time} — ฿{order.total}
                  </div>
                  <div className="order-items">
                    {order.items.map((item, i) => (
                      <div key={i} className="order-item">
                        <span>
                          {item.qty}x {item.name}
                        </span>
                        {item.note && <small>หมายเหตุ: {item.note}</small>}
                        <span>฿{item.price}</span>
                      </div>
                    ))}
                  </div>

                  {order.status === "รอทำ" && (
                    <button
                      className="black-btn"
                      onClick={() => updateStatus(order.id, "กำลังทำ")}
                    >
                      เริ่มทำ
                    </button>
                  )}

                  {order.status === "กำลังทำ" && (
                    <button
                      className="black-btn"
                      onClick={() => updateStatus(order.id, "พร้อมเสิร์ฟ")}
                    >
                      พร้อมเสิร์ฟ
                    </button>
                  )}

                  {order.status === "พร้อมเสิร์ฟ" && (
                    <button
                      className="black-btn"
                      onClick={() =>
                        setOrders((prev) =>
                          prev.filter((o) => o.id !== order.id)
                        )
                      }
                    >
                      เสิร์ฟแล้ว
                    </button>
                  )}
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
