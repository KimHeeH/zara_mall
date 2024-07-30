import "./App.css";
import HomePage from "./page/HomePage";
import Navbar from "./component/Navbar";
import LoginPage from "./page/LoginPage";
import ProductDetailPage from "./page/ProductDetailPage";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;
