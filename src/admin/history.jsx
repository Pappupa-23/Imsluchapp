import React, { useState, useEffect } from "react";
import "./history.css";

export default function AdminHistory() {
  const data = {
    "27 ตุลาคม 2568": {
      orders: [
        {
          id: "OD-001",
          table: "โต๊ะ 1",
          status: "เสร็จสิ้น",
          time: "09:00",
          total: 165,
          items: [
        { name: "ข้าวไก่เทอริยากิ", price: 95, qty: 1 },
        { name: "ไก่สติ๊ก", price: 60, qty: 1 },
        { name: "น้ำเปล่า", price: 10, qty: 2 },
      ],
        },
      ],
      summary: { totalOrders: 1, totalRevenue: 165 },
    },
    "28 ตุลาคม 2568": {
      orders: [
        {
          id: "OD-001",
          table: "โต๊ะ 1",
          status: "เสร็จสิ้น",
          time: "08:35",
          total: 95,
          items: [
        { name: "ข้าวผัดกะเพราหมู", price: 45, qty: 1, note: "ไม่เผ็ด" },
        { name: "โคล่า", price: 25, qty: 2 },
      ],
        },
        {
          id: "OD-002",
          table: "โต๊ะ 2",
          status: "เสร็จสิ้น",
          time: "10:05",
          total: 175,
      items: [
        { name: "ฮอทด็อกเบคอน", price: 85, qty: 1 },
        { name: "นมฮอกไกโดสเลอปี้", price: 45, qty: 2 },
      ],
        },
        {
          id: "OD-003",
          table: "โต๊ะ 3",
          status: "เสร็จสิ้น",
          time: "11:05",
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
      ],
      summary: { totalOrders: 3, totalRevenue: 510 },
    },
    "29 ตุลาคม 2568": {
      orders: [
        {
          id: "OD-001",
          table: "โต๊ะ 1",
          status: "เสร็จสิ้น",
          time: "08:35",
          total: 50,
      items: [
        { name: "ข้าวผัดหมู", price: 50, qty: 1,  },
      ],
        },
        {
          id: "OD-002",
          table: "โต๊ะ 2",
          status: "เสร็จสิ้น",
          time: "10:05",
          total: 155,
      items: [
        { name: "พิซซ่าฮาวาเอี้ยน", price: 155, qty: 1, note: "ไม่เอาสัปปะรด" },
      ],
        },
        {
          id: "OD-003",
          table: "โต๊ะ 3",
          status: "เสร็จสิ้น",
          time: "11:05",
          total: 90,
      items: [
        { name: "ข้าวผัดกะเพราหมู", price: 45, qty: 1, },
        { name: "ชาเขียวสเลอปี้", price: 45, qty: 1 },
      ],
        },
      ],
      summary: { totalOrders: 3, totalRevenue: 295 },
    },
    "30 ตุลาคม 2568": {
      orders: [
        {
          id: "OD-001",
          table: "โต๊ะ 1",
          status: "เสร็จสิ้น",
          time: "08:35",
          total: 75,
      items: [
        { name: "เฟรนซ์ฟรายชีส", price: 45, qty: 1, },
      ],
        },
        {
          id: "OD-002",
          table: "โต๊ะ 2",
          status: "เสร็จสิ้น",
          time: "10:05",
          total: 175,
      items: [
        { name: "ฮอทด็อกเบคอน", price: 85, qty: 1 },
        { name: "นมฮอกไกโดสเลอปี้", price: 45, qty: 2 },
      ],
        },
        
      ],
      summary: { totalOrders: 2, totalRevenue: 250 },
    },
  };

  const dateList = Object.keys(data);

  // ✅ สร้างวันที่วันนี้ (ISO string)
  const getTodayISO = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today.toISOString().split("T")[0];
  };

  const [startDate, setStartDate] = useState("2025-10-27");
  const [endDate, setEndDate] = useState(getTodayISO());

  // ✅ ถ้าวันเปลี่ยน ให้ endDate เป็นวันใหม่โดยอัตโนมัติ
  useEffect(() => {
    const timer = setInterval(() => {
      setEndDate(getTodayISO());
    }, 60 * 60 * 1000); // เช็กทุก 1 ชั่วโมง
    return () => clearInterval(timer);
  }, []);

  const parseThaiDate = (dateStr) => {
    const [day, monthName, year] = dateStr.split(" ");
    const months = [
      "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน",
      "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม",
      "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
    ];
    const d = new Date(parseInt(year) - 543, months.indexOf(monthName), parseInt(day));
    d.setHours(0, 0, 0, 0);
    return d.getTime();
  };

  const handleStartChange = (e) => {
    const value = e.target.value;
    const d = new Date(value);
    d.setHours(0, 0, 0, 0);
    if (d > new Date(endDate)) setEndDate(value);
    setStartDate(value);
  };

  const handleEndChange = (e) => {
    const value = e.target.value;
    const d = new Date(value);
    d.setHours(0, 0, 0, 0);
    if (d < new Date(startDate)) setStartDate(value);
    setEndDate(value);
  };

  const filteredDates = dateList.filter((date) => {
    const dateTime = parseThaiDate(date);
    const startTime = new Date(startDate).setHours(0, 0, 0, 0);
    const endTime = new Date(endDate).setHours(0, 0, 0, 0);
    return dateTime >= startTime && dateTime <= endTime;
  });

  const calcTotalDays = (start, end) => {
    const startD = new Date(start);
    const endD = new Date(end);
    startD.setHours(0, 0, 0, 0);
    endD.setHours(0, 0, 0, 0);
    const diff = (endD - startD) / (1000 * 60 * 60 * 24);
    return diff >= 0 ? diff + 1 : 0;
  };

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

      <div className="date-range">
        <div>
          <label>วันที่เริ่มต้น</label>
          <input
            type="date"
            value={startDate}
            onChange={handleStartChange}
          />
        </div>
        <div>
          <label>วันที่สิ้นสุด</label>
          <input
            type="date"
            value={endDate}
            onChange={handleEndChange}
          />
        </div>
      </div>

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
                    <span>{order.id}</span>
                    <span>{order.table}</span>
                    <span className="status">{order.status}</span>
                    <span className="time">{order.time}</span>
                  </div>
                  <div className="order-total">฿{order.total}</div>
                  <div className="order-items">
                    {order.items.map((item, i) => (
                      <div key={i} className="order-item">
                        <span>{item.qty}x {item.name}</span>
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
