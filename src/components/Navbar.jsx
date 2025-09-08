import { Link } from "react-router-dom";

function Navbar({ cartCount = 0 }) {
  return (
    <header className="navbar">
      <Link to="/">I'M SLUSH</Link>
      <Link to="/menu/food">เมนูอาหาร</Link>
      <Link to="/menu/fastfood">ฟาสต์ฟู้ด</Link>
      <Link to="/menu/drink">เครื่องดื่ม</Link>
      <div className="cart">
        🛒 {cartCount > 0 ? <span className="badge">{cartCount}</span> : null}
      </div>
    </header>
  );
}

export default Navbar;
