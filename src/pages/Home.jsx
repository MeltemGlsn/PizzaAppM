// src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import "../Home.css";
import Navbar from "../components/Navbar";


function Home() {
  return (
    <div className="home-page">
      <Navbar />
      <div className="title-container">
        <h1 className="default-title">KOD ACIKTIRIR PİZZA, DOYURUR</h1>
      </div>
      <Link to="/order">
        <button>ACIKTIM</button>
      </Link>
    </div>
  );
}

export default Home;
