import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import OrderPage from "./pages/OrderPage";
import Success from "./pages/Success"; // Success sayfasını ekledik

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/success" element={<Success />} /> {/* Yeni Route */}
      </Routes>
    </Router>
  );
}

export default App;
