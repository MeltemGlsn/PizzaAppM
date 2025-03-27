import React, { useState } from "react"; 
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap'; 
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
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const pricePerPizza = 85;
  const maxToppings = 10;
  const minToppings = 4;

  const extraToppings = [
    "Pepperoni", "Sosis", "Kanada Jambonu", "Tavuk Izgara", "Soğan", "Domates", "Mısır",
    "Sucuk", "Jalepeno", "Sarımsak", "Biber", "Ananas", "Kabak"
  ];

  const handleToppingChange = (topping) => {
    setToppings((prev) => {
      if (prev.includes(topping)) {
        return prev.filter((t) => t !== topping);
      } else if (prev.length < maxToppings) {
        return [...prev, topping];
      }
      return prev;
    });
  };

  const toppingPrice = toppings.length * 5;
  const totalPrice = (pricePerPizza + toppingPrice) * quantity;

  const isFormValid = size && crust && name.length >= 3 && toppings.length >= minToppings;

  const validateForm = () => {
    let formErrors = {};
    if (name.length < 3) formErrors.name = "İsim en az 3 karakter olmalı!";
    if (!size) formErrors.size = "Boyut seçmek zorunludur!";
    if (!crust) formErrors.crust = "Hamur kalınlığı seçmek zorunludur!";
    if (toppings.length < minToppings) formErrors.toppings = `En az ${minToppings} malzeme seçmelisiniz!`;
    if (toppings.length > maxToppings) formErrors.toppings = `En fazla ${maxToppings} malzeme seçebilirsiniz!`;
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const orderData = { name, size, crust, toppings, notes, quantity, totalPrice };
    setLoading(true);

    try {
      const res = await axios.post("https://reqres.in/api/pizza", orderData);
      setResponse(res.data);
      navigate("/success");
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
      <Form onSubmit={handleSubmit}>
        <div className="pizza-header" padding="0"> 
          <h2>Position Absolute Acı Pizza</h2>
          <div className="pizza-info" >
            <span className="pizza-price">85₺</span>
            <span className="pizza-rating">⭐ 4.9 (200)</span>
          </div>
          <p>Frontend Dev olarak hala position:absolute kullanıyorsan bu çok acı pizza tam sana göre. Pizza, domates, peynir ve genellikle çeşitli diğer malzemelerle kaplanmış, daha sonra geleneksel olarak odun ateşinde bir fırında yüksek sıcaklıkta pişirilen, genellikle yuvarlak, düzleştirilmiş mayalı buğday bazlı hamurdan oluşan İtalyan kökenli lezzetli bir yemektir. Küçük bir pizzaya bazen pizzetta denir.</p>
        </div>

        <div style={{ display: "flex", alignItems: "center" }}>
  {/* Boyut Seç */}
  <FormGroup style={{ flex: 1 }}>
    <Label>Boyut Seç <span style={{ color: "red" }}>*</span></Label>
    <Row>
      {["Küçük", "Orta", "Büyük"].map((sizeOption) => (
        <Col key={sizeOption}>
          <Label check>
            <Input
              type="radio"
              name="size"
              value={sizeOption}
              onChange={(e) => setSize(e.target.value)}
              required
            />
            {sizeOption}
          </Label>
        </Col>
      ))}
    </Row>
    {errors.size && <span className="error">{errors.size}</span>}
  </FormGroup>

  {/* Hamur Seç */}
  <FormGroup style={{ flex: 1 }}>
    <Label>Hamur Seç <span style={{ color: "red" }}>*</span></Label>
    <Input
      type="select"
      value={crust}
      onChange={(e) => setCrust(e.target.value)}
      required
    >
      <option value="" disabled>Hamur Kalınlığı</option>
      <option value="İnce">İnce</option>
      <option value="Normal">Normal</option>
      <option value="Kalın">Kalın</option>
    </Input>
    {errors.crust && <span className="error">{errors.crust}</span>}
  </FormGroup>
</div>

        <FormGroup>
          <Label>Ek Malzemeler ({toppings.length}/{maxToppings}):</Label>
          <p className="topping-info">En az 4, en fazla 10 malzeme seçebilirsin. 5₺</p>
          <div className="ek-malzemeler">
            {extraToppings.map((topping, index) => (
              <div key={topping} className="topping-item">
                <Label check>
                  <Input 
                    type="checkbox" 
                    checked={toppings.includes(topping)} 
                    onChange={() => handleToppingChange(topping)} 
                  />
                  {topping}
                </Label>
              </div>
            ))}
          </div>
          {errors.toppings && <span className="error">{errors.toppings}</span>}
        </FormGroup>

        <FormGroup>
          <Label>İsim <span style={{ color: 'red' }}>*</span></Label>
          <Input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
            minLength="3"
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </FormGroup>

        <FormGroup style={{padding:"0",margin:"0",width:"100%"}} >
          <Label>Sipariş Notu:</Label>
          <Input 
            type="textarea" 
            value={notes} 
            onChange={(e) => setNotes(e.target.value)} 
            className="notes-textarea" 
          />
        </FormGroup>

        <div className="order-summary" style={{border: '1px solid #fff'}}>
          <div className="quantity-controls">
            <Button type="button" onClick={() => handleQuantityChange(-1)}>-</Button>
            <Input type="number" value={quantity} min="1" readOnly />
            <Button type="button" onClick={() => handleQuantityChange(1)}>+</Button>
          </div>

          <div className="total-price-container" style={{padding:"0",backgroundColor: 'white'}}>
            <h3>Sipariş Toplamı</h3>
            <p><span className="label"style={{padding:"1rem"}}>Seçimler</span><span className="price" style={{padding:"1rem"}}>{toppingPrice}₺</span></p>
            <p><span className="label"style={{padding:"1rem"}}>Toplam</span><span className="price"style={{padding:"1rem"}}>{totalPrice}₺</span></p>
            <Button type="submit" color="primary" disabled={!isFormValid} style={{width: '100%', borderRadius:0}}>{loading ? "Sipariş Gönderiliyor..." : "SİPARİŞ VER"}</Button>
          </div>
        </div>
      </Form>

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
