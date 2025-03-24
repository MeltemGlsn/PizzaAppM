// src/pages/Order.jsx
import React, { useState } from "react";
import "../Order.css";

function Order() {
  const [name, setName] = useState("");
  const [size, setSize] = useState("");
  const [crust, setCrust] = useState("");
  const [toppings, setToppings] = useState([]);
  const [notes, setNotes] = useState("");
  const [quantity, setQuantity] = useState(1);
  const pricePerPizza = 85; // Örnek fiyat

  const extraToppings = [
    "Pepperoni",
    "Sosis",
    "Kanada Jambonu",
    "Tavuk Izgara",
    "Soğan",
    "Domates",
    "Mısır",
    "Sucuk",
    "Jalepeno",
    "Sarımsak",
    "Biber",
    "Ananas",
    "Kabak",
  ];

  const handleToppingChange = (topping) => {
    setToppings((prev) =>
      prev.includes(topping)
        ? prev.filter((t) => t !== topping)
        : [...prev, topping]
    );
  };

  const totalPrice = (pricePerPizza + toppings.length * 5) * quantity;

  const handleSubmit = (e) => {
    e.preventDefault();
    const orderData = { name, size, crust, toppings, notes, quantity, totalPrice };
    console.log(orderData);
  };

  return (
    <div className="order-page">
      <h1>Siparişinizi Oluşturun</h1>
      <form onSubmit={handleSubmit}>
        <label>İsim:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />

        <label>Boyut Seç:</label>
        <div className="radio-group">
          {["Küçük", "Orta", "Büyük"].map((sizeOption) => (
            <label key={sizeOption}>
              <input type="radio" name="size" value={sizeOption} onChange={(e) => setSize(e.target.value)} required />
              {sizeOption}
            </label>
          ))}
        </div>

        <label>Hamur Kalınlığı:</label>
        <select value={crust} onChange={(e) => setCrust(e.target.value)} required>
          <option value="">Seçiniz</option>
          <option value="İnce">İnce</option>
          <option value="Normal">Normal</option>
          <option value="Kalın">Kalın</option>
        </select>

        <label>Ek Malzemeler:</label>
        <div className="ek-malzemeler">
          {extraToppings.map((topping) => (
            <label key={topping}>
              <input type="checkbox" checked={toppings.includes(topping)} onChange={() => handleToppingChange(topping)} />
              {topping}
            </label>
          ))}
        </div>

        <label>Sipariş Notları:</label>
        <textarea value={notes} onChange={(e) => setNotes(e.target.value)} />

        <div className="order-summary">
          <label>Sipariş Adedi:</label>
          <input type="number" value={quantity} min="1" onChange={(e) => setQuantity(Number(e.target.value))} />

          <h3>Sipariş Toplamı</h3>
          <p>Seçilen Boyut: {size || "Belirtilmemiş"}</p>
          <p>Hamur Kalınlığı: {crust || "Belirtilmemiş"}</p>
          <p>Ek Malzemeler: {toppings.length ? toppings.join(", ") : "Yok"}</p>
          <p>Toplam Tutar: {totalPrice}₺</p>
        </div>

        <button type="submit" disabled={!name || !size || !crust}>Siparişi Onayla</button>
      </form>
    </div>
  );
}

export default Order;
