// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === "admin" && password === "1234") {
      localStorage.setItem("role", "admin");
      navigate("/admin/orders");
    } else if (username === "staff01" && password === "12345") {
      localStorage.setItem("role", "staff");
      navigate("/staff/dashboard");
    } else {
      setError("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h2>
  ระบบหลังบ้านร้านอาหาร<br />
  <span>Kitchen Management System</span>
</h2>

        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="ชื่อผู้ใช้"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="รหัสผ่าน"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">เข้าสู่ระบบ</button>
          {error && <p className="error">{error}</p>}
        </form>
      </div>
    </div>
  );
}
