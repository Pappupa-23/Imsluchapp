import React, { useState } from "react";
import "./orders.css";

export default function AdminOrders() {
  const [orders, setOrders] = useState([
    {
      id: 1,
      table: 1,
      status: "พร้อมเสิร์ฟ",
      time: "97 นาทีที่แล้ว",
      total: 150,
      items: [
        { name: "ผัดไทย", price: 100, qty: 2, note: "ไม่เผ็ด" },
        { name: "น้ำมะนาว", price: 50, qty: 2 },
      ],
    },
    {
      id: 2,
      table: 3,
      status: "กำลังทำ",
      time: "87 นาทีที่แล้ว",
      total: 205,
      items: [
        { name: "ต้มยำกุ้ง", price: 120, qty: 1 },
        { name: "ส้มตำ", price: 40, qty: 1 },
        { name: "ข้าวผัด", price: 45, qty: 1 },
      ],
    },
    {
      id: 3,
      table: 5,
      status: "พร้อมเสิร์ฟ",
      time: "102 นาทีที่แล้ว",
      total: 140,
      items: [
        { name: "ไก่ทอด", price: 80, qty: 1 },
        { name: "น้ำส้ม", price: 60, qty: 2 },
      ],
    },
    {
      id: 4,
      table: 2,
      status: "กำลังทำ",
      time: "92 นาทีที่แล้ว",
      total: 145,
      items: [
        { name: "แกงเขียวหวาน", price: 70, qty: 1, note: "เผ็ดน้อย" },
        { name: "น้ำมะนาว", price: 75, qty: 3 },
      ],
    },
  ]);

  const [filter, setFilter] = useState("ทั้งหมด");
  const tabs = ["ทั้งหมด", "รอทำ", "กำลังทำ", "พร้อมเสิร์ฟ", "เสิร์ฟแล้ว"];

  const filteredOrders =
    filter === "ทั้งหมด"
      ? orders
      : orders.filter((o) => o.status === filter);

  const nextStatus = (status) => {
    if (status === "รอทำ") return "กำลังทำ";
    if (status === "กำลังทำ") return "พร้อมเสิร์ฟ";
    if (status === "พร้อมเสิร์ฟ") return "เสิร์ฟแล้ว";
    return null;
  };

  const handleAction = (id) => {
    setOrders((prev) =>
      prev
        .map((o) => {
          if (o.id === id) {
            const next = nextStatus(o.status);
            return next ? { ...o, status: next } : null;
          }
          return o;
        })
        .filter(Boolean)
    );
  };

  const getStatusClass = (status) => {
    if (status === "กำลังทำ") return "processing";
    if (status === "พร้อมเสิร์ฟ") return "ready";
    if (status === "เสิร์ฟแล้ว") return "served";
    return "";
  };

  return (
    <div className="orders-container">
      <h1>ออเดอร์ทั้งหมด</h1>
      <p className="subtitle">จัดการและติดตามออเดอร์ทั้งหมดในระบบ</p>

      <div className="tab-bar">
        {tabs.map((t) => (
          <button
            key={t}
            className={`tab-btn ${filter === t ? "active" : ""}`}
            onClick={() => setFilter(t)}
          >
            {t} (
            {t === "ทั้งหมด"
              ? orders.length
              : orders.filter((o) => o.status === t).length}
            )
          </button>
        ))}
      </div>

      <div className="orders-list">
        {filteredOrders.length === 0 ? (
          <p className="no-orders">ไม่มีออเดอร์ในหมวดนี้</p>
        ) : (
          filteredOrders.map((order) => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <div>#{order.id}</div>
                <div>โต๊ะ {order.table}</div>
                <div className={`order-status ${getStatusClass(order.status)}`}>
                  {order.status}
                </div>
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
                    {item.note && (
                      <small className="note">หมายเหตุ: {item.note}</small>
                    )}
                    <span>฿{item.price}</span>
                  </div>
                ))}
              </div>

              {order.status !== "เสิร์ฟแล้ว" && (
                <button
                  className="black-btn"
                  onClick={() => handleAction(order.id)}
                >
                  {order.status === "รอทำ"
                    ? "เริ่มทำ"
                    : order.status === "กำลังทำ"
                    ? "พร้อมเสิร์ฟ"
                    : "เสิร์ฟแล้ว"}
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
