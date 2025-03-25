import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../Success.css";

function Success() {
  return (
    <div className="success-page">
      <Navbar />
      <div className="success-message">
        <h1>Tebrikler! Siparişiniz alındı 🎉</h1>
        <Link to="/" className="home-link">Ana Sayfaya Dön</Link>
      </div>
    </div>
  );
}

export default Success;
