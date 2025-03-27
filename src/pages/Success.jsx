import React from "react";
import { useNavigate } from "react-router-dom";
import "../Success.css"; // CSS dosyasını dahil ediyoruz

function SuccessPage() {
  const navigate = useNavigate();

  return (
    <div className="success-page">
      <img 
        src="/images/iteration-1-images/logo.svg" 
        alt="Logo" 
        className="logo" 
        onClick={() => navigate("/")} 
        style={{ cursor: "pointer" }}
      />
      <div className="success-message">
        <p>Tebrikler! Siparişiniz alındı 🎉</p>
      </div>
    </div>
  );
}

export default SuccessPage;
