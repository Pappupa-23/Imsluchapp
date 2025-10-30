// src/staff/StaffLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import StaffNavbar from "./StaffNavbar";
import "./StaffLayout.css";

export default function StaffLayout() {
  return (
    <div className="staff-layout">
      <StaffNavbar />
      <main className="staff-content">
        <Outlet />
      </main>
    </div>
  );
}
