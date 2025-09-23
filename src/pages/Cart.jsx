function Cart({ cartItems, updateQty }) {
  const total = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <div className="cart-page">
      <h2>🛒 ตะกร้าสินค้า</h2>
      {cartItems.length === 0 ? (
        <p>ยังไม่มีสินค้าในตะกร้า</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.name} className="cart-item">
              <span>{item.name}</span>
              <div className="qty-control">
                <button onClick={() => updateQty(item.name, item.qty - 1)}>−</button>
                <span>{item.qty}</span>
                <button onClick={() => updateQty(item.name, item.qty + 1)}>＋</button>
              </div>
              <span>{item.price * item.qty} บาท</span>
              <button className="remove" onClick={() => updateQty(item.name, 0)}>ยกเลิก</button>
            </div>
          ))}

          <h3>ยอดชำระทั้งหมด: {total} บาท</h3>
          <button className="checkout" onClick={() => alert("ทำการสั่งซื้อเรียบร้อย!")}>
            สั่งซื้อ
          </button>
        </div>
      )}
    </div>
  );
}

export default Cart;
