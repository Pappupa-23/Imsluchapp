import { NavLink, Link } from "react-router-dom";
import CartIcon from "./CartIcon";
import SplitText from "./SplitText";
import "./Navbar.css";


export default function Navbar({ cartCount = 0 }) {
  return (
    <header className="nb">
      {/* ===== แถบบน: ไล่เฉดแดง ===== */}
      <div className="nb-topbar">
        <div className="container nb-top">
          {/* ซ้าย: โลโก้ในกรอบขาว */}
          <Link to="/" className="left-logo" aria-label="หน้าแรก">
            <img src="/Logo_1.png" alt="I'm Slush" className="brand-logo" />
          </Link>

          {/* กลาง: ชื่อร้าน */}
          <SplitText
            text="I'M SLUSH"
            className="brand-center"
            tag="h1"
            delay={70}
            duration={0.5}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 28 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0}
            rootMargin="0px"
            textAlign="center"
          />

          {/* ขวา: ตะกร้า */}
          <Link to="/cart" className="cart-btn" aria-label="ตะกร้า">
            <CartIcon count={cartCount} />
          </Link>
        </div>
      </div>

      {/* ===== เมนู 4 ปุ่ม ===== */}
      <nav className="nb-tabs">
        <div className="container tabs-grid">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `nb-tab${isActive ? " is-current" : ""}`
            }
          >
            หน้าแรก
          </NavLink>
          <NavLink
            to="/menu/food"
            className={({ isActive }) =>
              `nb-tab${isActive ? " is-current" : ""}`
            }
          >
            เมนูอาหาร
          </NavLink>
          <NavLink
            to="/menu/fastfood"
            className={({ isActive }) =>
              `nb-tab${isActive ? " is-current" : ""}`
            }
          >
            ฟาสต์ฟู้ด
          </NavLink>
          <NavLink
            to="/menu/drink"
            className={({ isActive }) =>
              `nb-tab${isActive ? " is-current" : ""}`
            }
          >
            เครื่องดื่ม
          </NavLink>
        </div>
      </nav>
    </header>
  );
}
