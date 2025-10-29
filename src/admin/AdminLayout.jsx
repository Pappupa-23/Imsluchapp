import { Outlet } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import "./AdminLayout.css";

export default function AdminLayout() {
  return (
    <div className="admin-layout">
      <AdminNavbar />
      <div className="admin-content">
        <Outlet />
      </div>
    </div>
  );
}
