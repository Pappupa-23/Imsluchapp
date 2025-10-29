// src/admin/AdminNavbar.jsx
import { Link } from "react-router-dom";
import "./AdminNavbar.css";

export default function AdminNavbar() {
  return (
    <nav className="admin-navbar">
      <h2>🍳 Kitchen Admin</h2>
      <ul>
        <li><Link to="/admin/dashboard">Dashboard</Link></li>
        <li><Link to="/admin/orders">Orders</Link></li>
        <li><Link to="/admin/tables">Tables</Link></li>
        <li><Link to="/admin/history">History</Link></li>
        <li><Link to="/admin/settings">Settings</Link></li>
      </ul>
    </nav>
  );
}
