import React, { useState } from "react";
import "./history.css";

export default function AdminHistory() {
  const data = {
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
  };

  const dateList = Object.keys(data);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayISO = today.toISOString().split("T")[0];

  // ✅ Helper แปลงวันไทย → timestamp (พร้อม setHours 0)
  const parseThaiDate = (dateStr) => {
    const [day, monthName, year] = dateStr.split(" ");
    const months = [
      "มกราคม",
      "กุมภาพันธ์",
      "มีนาคม",
      "เมษายน",
      "พฤษภาคม",
      "มิถุนายน",
      "กรกฎาคม",
      "สิงหาคม",
      "กันยายน",
      "ตุลาคม",
      "พฤศจิกายน",
      "ธันวาคม",
    ];
    const d = new Date(
      parseInt(year) - 543,
      months.indexOf(monthName),
      parseInt(day)
    );
    d.setHours(0, 0, 0, 0);
    return d.getTime();
  };

  // ✅ ตั้งค่าเริ่มต้น
  const [startDate, setStartDate] = useState("2025-10-27");
  const [endDate, setEndDate] = useState(todayISO);

  // ✅ ตรวจสอบไม่ให้เลือกเกินวันนี้
  const handleStartChange = (e) => {
    const value = e.target.value;
    const d = new Date(value);
    d.setHours(0, 0, 0, 0);
    if (d > today) return;
    if (d > new Date(endDate)) setEndDate(value);
    setStartDate(value);
  };

  const handleEndChange = (e) => {
    const value = e.target.value;
    const d = new Date(value);
    d.setHours(0, 0, 0, 0);
    if (d > today) return;
    if (d < new Date(startDate)) setStartDate(value);
    setEndDate(value);
  };

  // ✅ กรองข้อมูล (แก้ timezone ให้ตรง)
  const filteredDates = dateList.filter((date) => {
    const dateTime = parseThaiDate(date);
    const startTime = new Date(startDate).setHours(0, 0, 0, 0);
    const endTime = new Date(endDate).setHours(0, 0, 0, 0);
    return dateTime >= startTime && dateTime <= endTime;
  });

  // ✅ คำนวณจำนวนวัน (รวมวันเริ่มและสิ้นสุด)
  const calcTotalDays = (start, end) => {
    const startD = new Date(start);
    const endD = new Date(end);
    startD.setHours(0, 0, 0, 0);
    endD.setHours(0, 0, 0, 0);
    const diff = (endD - startD) / (1000 * 60 * 60 * 24);
    return diff >= 0 ? diff + 1 : 0;
  };

  // ✅ สรุปผลรวม
  const rangeSummary = {
    totalDays: calcTotalDays(startDate, endDate),
    totalOrders: filteredDates.reduce(
      (acc, date) => acc + data[date].summary.totalOrders,
      0
    ),
    totalRevenue: filteredDates.reduce(
      (acc, date) => acc + data[date].summary.totalRevenue,
      0
    ),
  };

  return (
    <div className="history-container">
      <h1>ประวัติออเดอร์</h1>
      <p className="subtitle">ออเดอร์ที่เสร็จสิ้นแล้วทั้งหมดแยกตามวัน</p>

      {/* ตัวเลือกวันที่ */}
      <div className="date-range">
        <div>
          <label>วันที่เริ่มต้น</label>
          <input
            type="date"
            value={startDate}
            onChange={handleStartChange}
            max={todayISO}
          />
        </div>
        <div>
          <label>วันที่สิ้นสุด</label>
          <input
            type="date"
            value={endDate}
            onChange={handleEndChange}
            max={todayISO}
          />
        </div>
      </div>

      {/* การ์ดสรุป */}
      <div className="summary-cards">
        <div className="card">
          <p>จำนวนวันที่บันทึก</p>
          <h2>{rangeSummary.totalDays}</h2>
        </div>
        <div className="card">
          <p>ออเดอร์ทั้งหมด</p>
          <h2>{rangeSummary.totalOrders}</h2>
        </div>
        <div className="card">
          <p>รายได้รวมทั้งหมด</p>
          <h2>฿{rangeSummary.totalRevenue}</h2>
        </div>
      </div>

      {/* แสดงข้อมูลออเดอร์ */}
      {filteredDates.length === 0 ? (
        <p className="no-data">ไม่มีข้อมูลในช่วงวันที่ที่เลือก</p>
      ) : (
        filteredDates.map((date) => (
          <div key={date} className="order-summary">
            <h3>{date}</h3>
            <p>
              {data[date].summary.totalOrders} ออเดอร์ • ฿
              {data[date].summary.totalRevenue}
            </p>

            <div className="orders-list">
              {data[date].orders.map((order) => (
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
        ))
      )}
    </div>
  );
}
