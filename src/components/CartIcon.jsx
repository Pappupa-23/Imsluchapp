function CartIcon({ count }) {
  return (
    <div className="cart">
      🛒
      {count > 0 && <span className="badge">{count}</span>}
    </div>
  );
}

export default CartIcon;
