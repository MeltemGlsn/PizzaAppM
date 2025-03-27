import { Link, useLocation } from "react-router-dom";
import "../index.css";

function Navbar() {
  const location = useLocation(); // Şu anki sayfanın yolunu almak için

  return (
    <header className="navbar">
      <div className="logo-ortala">
        <img
          src="/images/iteration-1-images/logo.svg"
          alt="Teknolojik Yemekler Logo"
          className="logo"
        />
      </div>

      {/* Sadece Order sayfasında linkleri göster */}
      {location.pathname === "/order" && (
        <nav className="bottom-nav">
          <ul>
            <li>
              <Link to="/">Anasayfa</Link>
            </li>
            <li>
              <Link to="/order">Sipariş Oluştur</Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}

export default Navbar;
