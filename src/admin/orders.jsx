import React, { useState } from "react";
import "./orders.css";
import { FaClock, FaUtensils, FaCheckCircle, FaListAlt } from "react-icons/fa";
import { FaBoxArchive } from "react-icons/fa6"; // ✅ เพิ่มจาก fa6

export default function AdminOrders() {
  const [orders, setOrders] = useState([
    {
      id: "OD-002",
      table: 3,
      status: "รอทำ",
      time: "5 นาทีที่แล้ว",
      total: 175,
      items: [
        { name: "ข้าวไก่เทอริยากิ", price: 95, qty: 1 },
        { name: "ไก่สติ๊ก", price: 60, qty: 1 },
        { name: "น้ำเปล่า", price: 10, qty: 2 },
      ],
    },
    {
      id: "OD-001",
      table: 1,
      status: "กำลังทำ",
      time: "56 นาทีที่แล้ว",
      total: 95,
      items: [
        { name: "ข้าวผัดกะเพราหมู", price: 45, qty: 1, note: "ไม่เผ็ด" },
        { name: "โคล่า", price: 25, qty: 2 },
      ],
    },
    {
      id: "OD-003",
      table: 5,
      status: "พร้อมเสิร์ฟ",
      time: "68 นาทีที่แล้ว",
      total: 175,
      items: [
        { name: "ฮอทด็อกเบคอน", price: 85, qty: 1 },
        { name: "นมฮอกไกโดสเลอปี้", price: 45, qty: 2 },
      ],
    },
    {
      id: "OD-004",
      table: 2,
      status: "พร้อมเสิร์ฟ",
      time: "58 นาทีที่แล้ว",
      total: 155,
      items: [
        {
          name: "เบอร์เกอร์หมู",
          price: 85,
          qty: 1,
          note: "ท็อปปิ้ง=เบคอน+25฿,ผัก=ปกติ,ซอส=ซอสปกติ(มะเขือเทศ+พริก+มายองเนศ)",
        },
        { name: "พีชสเลอปี้", price: 45, qty: 1 },
      ],
    },
    {
      id: "OD-005",
      table: 4,
      status: "รอทำ",
      time: "58 นาทีที่แล้ว",
      total: 70,
      items: [
        { name: "ข้าวผัดกะเพราหมู", price: 45, qty: 1, note: "เผ็ดน้อย" },
        { name: "ชาไทย", price: 25, qty: 1 },
      ],
    },
    {
      id: "OD-006",
      table: 1,
      status: "รอทำ",
      time: "58 นาทีที่แล้ว",
      total: 50,
      items: [
        { name: "ข้าวผัดหมู", price: 50, qty: 1,  },
      ],
    },
    {
      id: "OD-007",
      table: 2,
      status: "รอทำ",
      time: "58 นาทีที่แล้ว",
      total: 155,
      items: [
        { name: "พิซซ่าฮาวาเอี้ยน", price: 155, qty: 1, note: "ไม่เอาสัปปะรด" },
      ],
    },
    {
      id: "OD-008",
      table: 3,
      status: "กำลังทำ",
      time: "58 นาทีที่แล้ว",
      total: 39,
      items: [
        { name: "ข้าวผัดกะเพราหมู", price: 39, qty: 1, },
      ],
    },
    {
      id: "OD-009",
      table: 4,
      status: "พร้อมเสิร์ฟ",
      time: "58 นาทีที่แล้ว",
      total: 90,
      items: [
        { name: "ข้าวผัดกะเพราหมู", price: 45, qty: 1, },
        { name: "ชาเขียวสเลอปี้", price: 45, qty: 1 },
      ],
    },
    {
      id: "OD-010",
      table: 5,
      status: "กำลังทำ",
      time: "58 นาทีที่แล้ว",
      total: 75,
      items: [
        { name: "เฟรนซ์ฟรายชีส", price: 45, qty: 1, },
      ],
    },
  ]);

  const [selectedFilter, setSelectedFilter] = useState("ทั้งหมด");

  const updateStatus = (id, nextStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: nextStatus } : o))
    );
  };

  const sections = ["รอทำ", "กำลังทำ", "พร้อมเสิร์ฟ"];
  const visibleSections =
    selectedFilter === "ทั้งหมด" ? sections : [selectedFilter];

  const getIcon = (status) => {
    switch (status) {
      case "รอทำ":
        return <FaClock className="status-icon" />;
      case "กำลังทำ":
        return <FaUtensils className="status-icon" />;
      case "พร้อมเสิร์ฟ":
        return <FaCheckCircle className="status-icon" />;
      default:
        return <FaBoxArchive className="status-icon" />;
    }
  };

  return (
    <div
      className={`dashboard-container ${
        selectedFilter !== "ทั้งหมด" ? "filtered" : ""
      }`}
    >
      <h1>🍳 ออเดอร์ทั้งหมด</h1>
      <p className="subtitle">จัดการและติดตามออเดอร์ทั้งหมดในระบบ</p>

      {/* 🔹 การ์ดสรุป */}
      <div className="summary">
        {sections.map((s) => (
          <div
            className={`card ${selectedFilter === s ? "active" : ""}`}
            key={s}
            onClick={() => setSelectedFilter(s)}
            style={{ cursor: "pointer" }}
          >
            <div className="card-content">
              <div className="card-left">
                <h2>{s}</h2>
                <p>{orders.filter((o) => o.status === s).length}</p>
              </div>
              <div className="card-right">{getIcon(s)}</div>
            </div>
          </div>
        ))}
        <div
          className={`card total ${
            selectedFilter === "ทั้งหมด" ? "active" : ""
          }`}
          onClick={() => setSelectedFilter("ทั้งหมด")}
          style={{ cursor: "pointer" }}
        >
          <div className="card-content">
            <div className="card-left">
              <h2>ออเดอร์ทั้งหมด</h2>
              <p>{orders.length}</p>
            </div>
            <div className="card-right">
              <FaBoxArchive className="status-icon" />
            </div>
          </div>
        </div>
      </div>

      {/* 🔹 แสดงคอลัมน์ */}
      <div className="order-columns">
        {visibleSections.map((section) => (
          <div className="order-column" key={section}>
            <h2>
              {section} ({orders.filter((o) => o.status === section).length})
            </h2>

            <div className="order-list">
              {orders
                .filter((o) => o.status === section)
                .map((order) => (
                  <div key={order.id} className="order-card">
                    <div className="order-header">
                      <div className="order-header-left">
                        <div className="order-id">{order.id}</div>
                        <div>โต๊ะ {order.table}</div>
                        <div className={`status ${order.status}`}>
                          {getIcon(order.status)} {order.status}
                        </div>
                      </div>
                      <div className="order-header-right">฿{order.total}</div>
                    </div>

                    <div className="order-time">สั่งเมื่อ {order.time}</div>

                    <div className="order-items">
                      {order.items.map((item, i) => (
                        <div key={i} className="order-item">
                          <div className="order-item-left">
                            <span>
                              {item.qty}x {item.name}
                            </span>
                            {item.note && (
                              <div className="item-note">
                                <strong>หมายเหตุ:</strong>
                                {item.note.split(",").map((line, index) => (
                                  <p key={index}>{line.trim()}</p>
                                ))}
                              </div>
                            )}
                          </div>
                          <span className="price">฿{item.price}</span>
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
    </div>
  );
}
