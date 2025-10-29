import React, { useState } from "react";
import "./history.css";

export default function AdminHistory() {
  const [selectedDate, setSelectedDate] = useState("28 ตุลาคม 2568");

  const data = {
    "28 ตุลาคม 2568": {
      orders: [
        {
          id: 1,
          table: "โต๊ะ 1",
          status: "เสร็จสิ้น",
          time: "08:35",
          total: 75,
          items: [
            { name: "ผัดไทย", price: 50, qty: 1 },
            { name: "น้ำมะนาว", price: 25, qty: 1 },
          ],
        },
        {
          id: 2,
          table: "โต๊ะ 2",
          status: "เสร็จสิ้น",
          time: "10:05",
          total: 120,
          items: [{ name: "ต้มยำกุ้ง", price: 120, qty: 1 }],
        },
        {
          id: 3,
          table: "โต๊ะ 3",
          status: "เสร็จสิ้น",
          time: "11:05",
          total: 150,
          items: [
            { name: "ข้าวผัด", price: 45, qty: 2 },
            { name: "น้ำส้ม", price: 30, qty: 2 },
          ],
        },
      ],
      summary: { totalOrders: 3, totalRevenue: 345 },
    },
    "27 ตุลาคม 2568": {
      orders: [
        {
          id: 1,
          table: "โต๊ะ 1",
          status: "เสร็จสิ้น",
          time: "09:00",
          total: 225,
          items: [
            { name: "ข้าวมันไก่", price: 75, qty: 2 },
            { name: "ชาเย็น", price: 25, qty: 3 },
          ],
        },
      ],
      summary: { totalOrders: 1, totalRevenue: 225 },
    },
  };

  const allSummary = {
    totalDays: Object.keys(data).length,
    totalOrders: Object.values(data).reduce(
      (acc, day) => acc + day.summary.totalOrders,
      0
    ),
    totalRevenue: Object.values(data).reduce(
      (acc, day) => acc + day.summary.totalRevenue,
      0
    ),
  };

  return (
    <div className="history-container">
      <h1>ประวัติออเดอร์</h1>
      <p className="subtitle">ออเดอร์ที่เสร็จสิ้นแล้วทั้งหมดแยกตามวัน</p>

      <div className="summary-cards">
        <div className="card">
          <p>จำนวนวันที่บันทึก</p>
          <h2>{allSummary.totalDays}</h2>
        </div>
        <div className="card">
          <p>ออเดอร์ทั้งหมด</p>
          <h2>{allSummary.totalOrders}</h2>
        </div>
        <div className="card">
          <p>รายได้รวมทั้งหมด</p>
          <h2>฿{allSummary.totalRevenue}</h2>
        </div>
      </div>

      <div className="date-selector">
        <label>เลือกวันที่</label>
        <select
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        >
          {Object.keys(data).map((date) => (
            <option key={date} value={date}>
              {date}
            </option>
          ))}
        </select>
      </div>

      <div className="order-summary">
        <h3>{selectedDate}</h3>
        <p>
          {data[selectedDate].summary.totalOrders} ออเดอร์ • ฿
          {data[selectedDate].summary.totalRevenue}
        </p>
      </div>

      <div className="orders-list">
        {data[selectedDate].orders.map((order) => (
          <div key={order.id} className="order-card">
            <div className="order-header">
              <span>#{order.id}</span>
              <span>{order.table}</span>
              <span className="status">{order.status}</span>
              <span className="time">{order.time}</span>
            </div>
            <div className="order-total">฿{order.total}</div>
            <div className="order-items">
              {order.items.map((item, i) => (
                <div key={i} className="order-item">
                  <span>
                    {item.qty}x {item.name}
                  </span>
                  <span>฿{item.price}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
