// src/components/Navbar.jsx
import { Link, useLocation } from "react-router-dom";
import "../index.css";

function Navbar() {
  const location = useLocation(); // Şu anki sayfanın yolunu almak için

  return (
    <header className="navbar">
      <div ><img src="/images/iteration-1-images/logo.svg" alt="Teknolojik Yemekler Logo" className="logo" /></div>
      
      {location.pathname !== "/" && (
        <nav className="bottom-nav">
          <ul>
            <li>
              <Link to="/">Anasayfa</Link>
            </li>
            <li>
              <span className="disabled">Sipariş Oluştur</span>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}

export default Navbar;
