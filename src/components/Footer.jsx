import "./Footer.css";
import { useEffect, useRef } from "react";

export default function Footer() {
  const stripRef = useRef(null);

  useEffect(() => {
    const el = stripRef.current;
    if (!el) return;

    const setH = () => {
      const h = el.offsetHeight;
      document.documentElement.style.setProperty("--footer-h", `${h + 10}px`);
    };

    setH();
    const ro = new ResizeObserver(setH);
    ro.observe(el);
    window.addEventListener("resize", setH);
    window.addEventListener("orientationchange", setH);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", setH);
      window.removeEventListener("orientationchange", setH);
    };
  }, []);

  return (
    <footer className="footer-wrap">
      <div className="container">
        <div ref={stripRef} className="footer-strip">
          <div className="foot-item">
            <span className="fi">⏰</span>
            <span>
              เปิดบริการ <strong className="open-time">10:00–21:00</strong>
            </span>
          </div>
          <span className="foot-divider" />
          <a href="tel:0971595498" className="foot-item foot-tel">
            <span className="fi">📞</span>
            <strong>097-159-5498</strong>
          </a>
        </div>
      </div>
    </footer>
  );
}
