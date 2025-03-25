import React, { useState } from "react"; 
import axios from "axios";
import "../Order.css";
import Navbar from "../components/Navbar";

function Order() {
  const [name, setName] = useState("");
  const [size, setSize] = useState("");
  const [crust, setCrust] = useState("");
  const [toppings, setToppings] = useState([]);
  const [notes, setNotes] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const pricePerPizza = 85;
  const maxToppings = 10;
  const minToppings = 4;

  const extraToppings = [
    "Pepperoni", "Sosis", "Kanada Jambonu", "Tavuk Izgara", "Soğan", "Domates", "Mısır",
    "Sucuk", "Jalepeno", "Sarımsak", "Biber", "Ananas", "Kabak"
  ];

  const handleToppingChange = (topping) => {
    setToppings((prev) =>
      prev.includes(topping)
        ? prev.filter((t) => t !== topping)
        : prev.length < maxToppings ? [...prev, topping] : prev
    );
  };

  const totalPrice = (pricePerPizza + toppings.length * 5) * quantity;
  
  const isFormValid = name.length >= 3 && size && crust && (toppings.length >= minToppings);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    const orderData = { name, size, crust, toppings, notes, quantity, totalPrice };
    setLoading(true);

    try {
      const res = await axios.post("https://reqres.in/api/pizza", orderData);
      setResponse(res.data);
      console.log("Sipariş Onayı:", res.data);
    } catch (error) {
      console.error("Sipariş hatası:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleQuantityChange = (delta) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  return (
    <div className="order-page">
      <Navbar />      
      {/* Sipariş Formu */}
      <form onSubmit={handleSubmit}>
        <div>
          <h2>Position Absolute Acı Pizza</h2>
          <p>85₺                   ⭐ 4.9 (200)</p>
          <p>Frontent Dev olarak hala position:absolute kullanıyorsan bu çok acı pizza tam sana göre. Pizza, domates, peynir ve genellikle çeşitli diğer malzemelerle kaplanmış, daha sonra geleneksel olarak odun ateşinde bir fırında yüksek sıcaklıkta pişirilen, genellikle yuvarlak, düzleştirilmiş mayalı buğday bazlı hamurdan oluşan İtalyan kökenli lezzetli bir yemektir. Küçük bir pizzaya bazen pizzetta denir.</p>
        </div>

        <label>
          Boyut Seç <span style={{ color: 'red' }}>*</span>
        </label>
        <div className="radio-group">
          {["Küçük", "Orta", "Büyük"].map((sizeOption) => (
            <label key={sizeOption}>
              <input type="radio" name="size" value={sizeOption} onChange={(e) => setSize(e.target.value)} required />
              {sizeOption}
            </label>
          ))}
        </div>

        <label>
          Hamur Kalınlığı <span style={{ color: 'red' }}>*</span>
        </label>
        <select value={crust} onChange={(e) => setCrust(e.target.value)} required>
          <option value="">Seçiniz</option>
          <option value="İnce">İnce</option>
          <option value="Normal">Normal</option>
          <option value="Kalın">Kalın</option>
        </select>

        <label>Ek Malzemeler ({toppings.length}/{maxToppings}):</label>
        <p className="topping-info">En fazla 10 malzeme seçebilirsin. 5₺</p>
        <div className="ek-malzemeler">
          {extraToppings.map((topping, index) => (
            <div key={topping} className={`topping-item topping-${index % 3}`}>
              <label>
                <input type="checkbox" checked={toppings.includes(topping)} onChange={() => handleToppingChange(topping)} />
                {topping}
              </label>
            </div>
          ))}
        </div>

        <label>Sipariş Notu:</label>
        <textarea 
          value={notes} 
          onChange={(e) => setNotes(e.target.value)} 
          className="notes-textarea" 
        />

        <div className="order-summary">
          <label>Sipariş Adedi:</label>
          <div className="quantity-controls">
            <button type="button" onClick={() => handleQuantityChange(-1)}>-</button>
            <input type="number" value={quantity} min="1" readOnly />
            <button type="button" onClick={() => handleQuantityChange(1)}>+</button>
          </div>

          <div className="total-price-container">
            <h3>Sipariş Toplamı</h3>
            <p>Seçilen Boyut: {size || "Belirtilmemiş"}</p>
            <p>Hamur Kalınlığı: {crust || "Belirtilmemiş"}</p>
            <p>Ek Malzemeler: {toppings.length ? toppings.join(", ") : "Yok"}</p>
            <p>Toplam Tutar: {totalPrice}₺</p>
          </div>

          <button type="submit" className="submit-button">
            {loading ? "Sipariş Gönderiliyor..." : "Siparişi Onayla"}
          </button>
        </div>
      </form>

      {response && (
        <div className="order-response">
          <h2>Sipariş Alındı!</h2>
          <p>ID: {response.id}</p>
          <p>Tarih: {response.createdAt}</p>
        </div>
      )}
    </div>
  );
}

export default Order;
