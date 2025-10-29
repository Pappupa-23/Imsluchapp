import React, { useState } from "react";
import "./tables.css";

export default function AdminTables() {
  const [selectedTable, setSelectedTable] = useState(null);

  const tables = [
    { id: 1, status: "ordered", orders: 1 },
    { id: 2, status: "ordered", orders: 1 },
    { id: 3, status: "ordered", orders: 1 },
    { id: 4, status: "empty", orders: 0 },
    { id: 5, status: "ordered", orders: 1 },
    { id: 6, status: "empty", orders: 0 },
  ];

  const exampleOrder = {
    id: "#1",
    status: "กำลังทำ",
    time: "สั่งเมื่อ 29 นาทีที่แล้ว",
    total: "฿150",
    items: [
      { name: "ผัดไทย", price: "฿100", qty: 2, note: "ไม่เผ็ด" },
      { name: "น้ำมะนาว", price: "฿50", qty: 2 },
    ],
  };

  const totalTables = tables.length;
  const orderedTables = tables.filter(t => t.status === "ordered").length;

  return (
    <div className="tables-container">
      {!selectedTable ? (
        <>
          <h1>โต๊ะทั้งหมด</h1>
          <p className="subtitle">
            {orderedTables} โต๊ะมีออเดอร์ / {totalTables} โต๊ะทั้งหมด
          </p>

          <div className="section">
            <h2>โต๊ะที่มีออเดอร์</h2>
            <div className="table-grid">
              {tables
                .filter(t => t.status === "ordered")
                .map(table => (
                  <div
                    key={table.id}
                    className="table-card ordered"
                    onClick={() => setSelectedTable(table.id)}
                  >
                    <h3>โต๊ะ {table.id}</h3>
                    <p>{table.orders} ออเดอร์</p>
                  </div>
                ))}
            </div>
          </div>

          <div className="section">
            <h2>โต๊ะว่าง</h2>
            <div className="table-grid">
              {tables
                .filter(t => t.status === "empty")
                .map(table => (
                  <div key={table.id} className="table-card empty">
                    <h3>โต๊ะ {table.id}</h3>
                    <p>ว่าง</p>
                  </div>
                ))}
            </div>
          </div>
        </>
      ) : (
        <div className="table-detail">
          <button className="back-btn" onClick={() => setSelectedTable(null)}>
            ← กลับไปที่รายการโต๊ะ
          </button>
          <h1>โต๊ะ {selectedTable}</h1>
          <p className="subtitle">1 ออเดอร์ที่กำลังดำเนินการ</p>

          <div className="order-card">
            <div className="order-header">
              <span>{exampleOrder.id}</span>
              <span>{exampleOrder.status}</span>
            </div>
            <p className="order-time">{exampleOrder.time}</p>
            <p className="order-total">{exampleOrder.total}</p>

            <div className="order-items">
              {exampleOrder.items.map((item, i) => (
                <div key={i} className="order-item">
                  <span>
                    {item.qty}x {item.name}
                    {item.note && (
                      <span className="note">หมายเหตุ: {item.note}</span>
                    )}
                  </span>
                  <span>{item.price}</span>
                </div>
              ))}
            </div>

            <button className="black-btn">พร้อมเสิร์ฟ</button>
          </div>
        </div>
      )}
    </div>
  );
}
